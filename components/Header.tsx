"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/' prefetch={false} className='cursor-pointer'>
        <Image src='/images/logo-full.svg' alt='logo' loading='eager' width={211} height={32} />
      </Link>
      <ul className='flex flex-row items-center gap-8'>
        <li>
          <Link
            href='/'
            className={cn(
              "cursor-pointer capitalize text-xl",
              pathName === "/" ? "text-tag-accent font-semibold" : "font-medium",
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href='/collection'
            className={cn(
              "cursor-pointer capitalize text-xl",
              pathName === "/collection" ? "text-tag-accent font-semibold" : "font-medium",
            )}
          >
            Collection
          </Link>
        </li>
        <li>
          <Link
            href='/my-profile'
            className={cn(
              "cursor-pointer capitalize text-xl flex align-center items-center gap-2",
              pathName === "/my-profile" ? "text-tag-accent font-semibold" : "font-medium",
            )}
          >
            <Image src='/icons/profile-icon.svg' alt='profile' loading='eager' width={32} height={32} />
            <p>
              Profile
            </p>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
