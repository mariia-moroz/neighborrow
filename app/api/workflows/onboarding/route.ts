import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

type EmailTemplateParams = {
  preview: string;
  heading: string;
  fullName: string;
  paragraphs: string[];
  ctaText: string;
  ctaUrl: string;
  closing?: string;
  signoff?: string;
};

const APP_URL = "https://myneighborrow.vercel.app";
const ONE_DAY = 24 * 60 * 60 * 1000;
const THREE_DAYS = 3 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const createEmailTemplate = ({
  preview,
  heading,
  fullName,
  paragraphs,
  ctaText,
  ctaUrl,
  closing = "Good luck",
  signoff = "The NeighBorrow Team",
}: EmailTemplateParams) => {
  const safeName = escapeHtml(fullName);
  const safeCtaUrl = escapeHtml(ctaUrl);
  const paragraphHtml = paragraphs
    .map(
      paragraph => `
        <p class="email-text" style="margin:0 0 28px;color:#3c3b3e;font-size:24px;line-height:1.45;font-weight:400;">
          ${escapeHtml(paragraph)}
        </p>`,
    )
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(heading)}</title>
        <style>
          @media only screen and (max-width: 620px) {
            .email-shell { padding: 24px 14px !important; }
            .email-label { padding-left: 12px !important; font-size: 16px !important; }
            .email-card { border-radius: 12px !important; }
            .email-content { padding: 34px 26px 42px !important; }
            .email-logo { width: 176px !important; height: auto !important; }
            .email-heading { font-size: 28px !important; line-height: 1.28 !important; }
            .email-text { font-size: 19px !important; line-height: 1.5 !important; }
            .email-button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${escapeHtml(preview)}
        </div>
        <div class="email-shell" style="padding:38px 16px 52px;">
          <div style="max-width:920px;margin:0 auto;">
            <div class="email-label" style="padding:0 0 14px;color:#a7aaa7;font-size:20px;font-weight:700;">
              ${escapeHtml(preview)}
            </div>
            <div class="email-card" style="background:#ffffff;border-radius:14px;">
              <div class="email-content" style="padding:54px 66px 70px;">
                <img
                  src="${APP_URL}/images/logo-full.svg"
                  width="211"
                  height="32"
                  alt="NeighBorrow"
                  class="email-logo"
                  style="display:block;width:211px;height:auto;border:0;outline:none;text-decoration:none;"
                />
                <div style="height:1px;line-height:1px;background:#3c3b3e;margin:50px 0 58px;">&nbsp;</div>
                <h1 class="email-heading" style="margin:0 0 42px;color:#3c3b3e;font-size:34px;line-height:1.45;font-weight:800;">
                  ${escapeHtml(heading)}
                </h1>
                <p class="email-text" style="margin:0 0 42px;color:#3c3b3e;font-size:24px;line-height:1.45;font-weight:400;">
                  Hi ${safeName},
                </p>
                <div>
                  ${paragraphHtml}
                </div>
                <a
                  href="${safeCtaUrl}"
                  class="email-button"
                  style="display:inline-block;background:#d9bbff;border:2px solid #3c3b3e;border-radius:5px;color:#3c3b3e;font-size:20px;line-height:1.2;font-weight:400;text-decoration:none;padding:18px 28px;min-width:214px;text-align:center;margin:4px 0 42px;"
                >
                  ${escapeHtml(ctaText)}
                </a>
                <p class="email-text" style="margin:0;color:#3c3b3e;font-size:24px;line-height:1.45;font-weight:400;">
                  ${escapeHtml(closing)},<br />
                  ${escapeHtml(signoff)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

const getUserState = async (email: string): Promise<UserState> => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0) {
      return "non-active";
    }

    if (!user[0].lastActivityDate) {
      return "non-active";
    }

    const lastActivityDate = new Date(user[0].lastActivityDate!);
    const now = new Date();
    const timeDifference = now.getTime() - lastActivityDate.getTime();

    if (timeDifference > THREE_DAYS && timeDifference < THIRTY_DAYS) {
      return "non-active";
    }

    return "active";
  } catch (error) {
    // If there's an error checking user state, default to non-active
    console.error("Error getting user state:", error);
    return "non-active";
  }
};

export const { POST } = serve<InitialData>(async context => {
  const { email, fullName } = context.requestPayload;

  // welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to NeighBorrow, the place where you can borrow anything you want!",
      message: createEmailTemplate({
        preview: "Welcome to NeighBorrow Email",
        heading: "Welcome to NeighBorrow, the place where you can borrow anything you want!",
        fullName,
        paragraphs: [
          "Welcome to NeighBorrow! We're excited to have you join our community. Explore a wide range of items and borrow with ease, we've got you and everything you need!",
          "Get started by logging in to your account:",
        ],
        ctaText: "Login to NeighBorrow",
        ctaUrl: `${APP_URL}/sign-in`,
      }),
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We Miss You at NeighBorrow!",
          message: createEmailTemplate({
            preview: "Inactivity Reminder (3+ Days)",
            heading: "We Miss You at NeighBorrow!",
            fullName,
            paragraphs: [
              "It's been a while since we last saw you - over three days, to be exact! New items are waiting for you, and your next great borrow might just be a click away.",
              "Come back and explore now:",
            ],
            ctaText: "Explore Items",
            ctaUrl: `${APP_URL}/`,
            closing: "See you soon",
            signoff: "The NeighBorrow Team",
          }),
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back to NeighBorrow!",
          message: createEmailTemplate({
            preview: "Welcome Back Email",
            heading: "Welcome back to NeighBorrow!",
            fullName,
            paragraphs: [
              "We're excited to see you back in the community. Keep exploring local items, borrowing with ease, and making the most of what your neighborhood has to offer.",
              "Explore the latest items now:",
            ],
            ctaText: "Explore Items",
            ctaUrl: `${APP_URL}/`,
          }),
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
