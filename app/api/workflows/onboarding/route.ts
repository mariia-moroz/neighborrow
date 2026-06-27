import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
  userId: string;
};

type EmailTemplateParams = {
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
        <p class="email-text" style="margin:0 0 22px;color:#3c3b3e;font-size:17px;line-height:1.6;font-weight:400;">
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
            .email-card { border-radius: 12px !important; }
            .email-content { padding: 30px 24px 38px !important; }
            .email-brand-icon { width: 30px !important; height: 31px !important; }
            .email-brand-text { font-size: 28px !important; }
            .email-heading { font-size: 23px !important; line-height: 1.35 !important; }
            .email-text { font-size: 16px !important; line-height: 1.55 !important; }
            .email-button { display: block !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; }
          }
        </style>
      </head>
      <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;">
        <div class="email-shell" style="padding:38px 16px 52px;">
          <div style="max-width:920px;margin:0 auto;">
            <div class="email-card" style="background:#ffffff;border-radius:14px;">
              <div class="email-content" style="padding:44px 56px 54px;">
                <div style="text-align:start;">
                  <img
                    src="${APP_URL}/images/logo.svg"
                    width="31"
                    height="32"
                    alt="logo"
                    class="email-brand-icon"
                    style="display:inline-block;width:31px;height:32px;border:0;outline:none;text-decoration:none;margin:0 14px 0 0;vertical-align:middle;"
                  />
                  <p class="email-brand-text" style="display:inline-block;margin:0;color:#3c3b3e;font-size:32px;line-height:1;font-weight:800;vertical-align:middle;">
                    NeighBorrow
                  </p>
                </div>
                <div style="height:1px;line-height:1px;background:#3c3b3e;margin:40px 0 40px;">&nbsp;</div>
                <h1 class="email-heading" style="margin:0 0 30px;color:#3c3b3e;font-size:26px;line-height:1.35;font-weight:800;">
                  ${escapeHtml(heading)}
                </h1>
                <p class="email-text" style="margin:0 0 26px;color:#3c3b3e;font-size:17px;line-height:1.6;font-weight:400;">
                  Hi ${safeName},
                </p>
                <div>
                  ${paragraphHtml}
                </div>
                <a
                  href="${safeCtaUrl}"
                  class="email-button"
                  style="display:inline-block;background:#d9bbff;border:2px solid #3c3b3e;border-radius:5px;color:#3c3b3e;font-size:16px;line-height:1.2;font-weight:400;text-decoration:none;padding:14px 24px;min-width:190px;text-align:center;margin:2px 0 20px;"
                >
                  ${escapeHtml(ctaText)}
                </a>
                 <p class="email-text" style="margin:0 0 4px;color:#3c3b3e;font-size:17px;line-height:1.6;font-weight:400;">
                  ${escapeHtml(closing)},
                </p>
                <p class="email-text" style="margin:0;color:#3c3b3e;font-size:17px;line-height:1.6;font-weight:400;">
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

    if (timeDifference > THREE_DAYS && timeDifference <= THIRTY_DAYS) {
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
  const { email, fullName, userId } = context.requestPayload;

  // welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to NeighBorrow!",
      deduplicationId: `onboarding-welcome-${userId}`,
      message: createEmailTemplate({
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

  let reminderCount = 0;

  while (true) {
    reminderCount += 1;

    const state = await context.run(`check-user-state-${reminderCount}`, async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run(`send-email-non-active-${reminderCount}`, async () => {
        await sendEmail({
          email,
          subject: "We Miss You at NeighBorrow!",
          deduplicationId: `${context.workflowRunId}-inactive-${reminderCount}`,
          message: createEmailTemplate({
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
      await context.run(`send-email-active-${reminderCount}`, async () => {
        await sendEmail({
          email,
          subject: "Welcome back to NeighBorrow!",
          deduplicationId: `${context.workflowRunId}-active-${reminderCount}`,
          message: createEmailTemplate({
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

    await context.sleep(`wait-for-1-month-${reminderCount}`, 60 * 60 * 24 * 30);
  }
});
