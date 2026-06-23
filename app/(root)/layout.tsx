import { auth } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className='root-container'>
      <div className='content-container'>
        <Header />
        <main className='mt-10 xl:mt-20 pb-40'>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
