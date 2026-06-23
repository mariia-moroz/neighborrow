"use client";

import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { UserRoundIcon } from "lucide-react";

const Header = ({ session }: { session: Session | null }) => {
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
            prefetch={false}
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
            prefetch={false}
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
            prefetch={false}
            className={cn(
              "cursor-pointer capitalize text-xl flex align-center items-center gap-2",
              pathName === "/my-profile" ? "text-tag-accent font-semibold" : "font-medium",
            )}
          >
            Profile
            <Avatar className='border border-secondary bg-primary/30'>
              <AvatarFallback className='text-secondary font-bold'>
                {session?.user?.name ? getInitials(session?.user?.name || "") : <UserRoundIcon />}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
