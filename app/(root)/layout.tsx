import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userId = session.user.id;

  after(async () => {
    // get the user and see if the last activity date is today
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, userId));
  });

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .then(res => res[0]?.isAdmin === "ADMIN");

  return (
    <div className='root-container'>
      <div className='content-container'>
        <Header isAdmin={isAdmin} session={session} />
        <main className='mt-6 xl:mt-20 pb-30 lg:pb-40'>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
