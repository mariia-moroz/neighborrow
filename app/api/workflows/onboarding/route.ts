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

const ONE_DAY = 24 * 60 * 60 * 1000;
const THREE_DAYS = 3 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

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
      message: `Hi ${fullName},\n\n
      
      Welcome to NeighBorrow! We're excited to have you join our community. Explore a wide range of items and borrow with ease, we've got you and everything you need!\n\n
      
      Good luck,\n
      The NeighBorrow Team`,
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
          message: `Hi ${fullName},\n\n
          
          It's been a while since we last saw you - over three days, to be exact! New items are waiting for you, and your next great borrow might just be a click away.\n\n
          
          Come back and explore now!\n\n
          
          See you soon,\n
          The NeighBorrow Team`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome to back NeighBorrow, the place where you can borrow anything you want!",
          message: `Hi ${fullName},\n\n
          
          Welcome to NeighBorrow! We're excited to have you back. Explore a wide range of items and borrow with ease, we've got you and everything you need!\n\n
          
          Good luck,\n
          The NeighBorrow Team`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
