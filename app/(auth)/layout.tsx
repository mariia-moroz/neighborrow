import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className='auth-main flex h-screen flex-col'>
      <div className='auth-bar' />
      <div className='auth-container'>
        <section className='auth-illustration--mobile'>
          <Image
            src='/images/claw.svg'
            alt='claw'
            loading='eager'
            width={235}
            height={247}
            className='w-[15%] md:w-[20%] lg:w-[30%]'
          />
        </section>

        <section className='auth-form'>
          <div className='auth-box'>
            <Image src='/images/logo-full.svg' alt='logo' loading='eager' width={211} height={32} />
            <div>{children}</div>
          </div>
        </section>

        <section className='auth-illustration--mobile'>
          <Image
            src='/images/cutie-main.svg'
            alt='claw'
            loading='eager'
            width={705}
            height={664}
            className='w-full'
          />
        </section>

        <section className='auth-illustration'>
          <div className='flex flex-col items-center justify-between h-full gap-5'>
            <Image
              src='/images/claw.svg'
              alt='claw'
              loading='eager'
              width={235}
              height={247}
              className='w-[30%]'
            />
            <Image
              src='/images/cutie-main.svg'
              alt='claw'
              loading='eager'
              width={705}
              height={664}
              className='w-full'
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
