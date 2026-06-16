"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className='my-10 flex justify-between gap-5'>
      <Link href='/' className="cursor-pointer">
        <Image src='/images/logo.svg' alt='logo' loading='eager' width={211} height={32}/>
      </Link>
      <ul className='flex flex-row items-center gap-8'>
        <li>
          <Link
            href='/collection'
            className={cn(
              "cursor-pointer capitalize text-xl",
              pathName === "/collection" ? "text-tag-accent font-bold" : "font-semibold",
            )}
          >
            Collection
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
