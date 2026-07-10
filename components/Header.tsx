"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { Session } from "next-auth";

const Header = ({ isAdmin, session }: { isAdmin: boolean; session: Session }) => {
  const pathName = usePathname();

  return (
    <header className='relative z-50 my-10 flex justify-between gap-5'>
      <Link href='/' prefetch={false} className='cursor-pointer flex items-center'>
        <Image
          src='/images/logo-full.svg'
          alt='logo'
          loading='eager'
          width={211}
          height={32}
          className='w-46 lg:w-50'
        />
      </Link>

      <DesktopMenu isAdmin={isAdmin} pathName={pathName} className='hidden lg:block' />

      <MobileMenu
        isAdmin={isAdmin}
        name={session?.user?.name || ""}
        email={session?.user?.email || ""}
        pathName={pathName}
        className='flex items-center justify-center lg:hidden'
      />
    </header>
  );
};

export default Header;
