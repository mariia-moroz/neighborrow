import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
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
