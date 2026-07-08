"use client";
import Image from "next/image";
import {
  HouseIcon,
  UsersRoundIcon,
  DrillIcon,
  ClipboardClockIcon,
  UserRoundIcon,
  CircleQuestionMarkIcon,
  LogOutIcon,
} from "lucide-react";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOutCurrentUser } from "@/lib/actions/auth";

const defineIcon = (iconName: string, className: string = "") => {
  switch (iconName) {
    case "house":
      return <HouseIcon height={20} width={20} strokeWidth={1.7} className={className} />;
    case "users-round":
      return <UsersRoundIcon height={20} width={20} strokeWidth={1.7} className={className} />;
    case "drill":
      return <DrillIcon height={20} width={20} strokeWidth={1.7} className={className} />;
    case "clipboard-clock":
      return <ClipboardClockIcon height={20} width={20} strokeWidth={1.7} className={className} />;
    case "user-round":
      return <UserRoundIcon height={20} width={20} strokeWidth={1.7} className={className} />;
    default:
      return <CircleQuestionMarkIcon />;
  }
};

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <div className='admin-sidebar'>
      <div>
        <Link href='/' prefetch={false} className='cursor-pointer logo'>
          <Image
            src='/images/logo.svg'
            alt='logo'
            loading='eager'
            width={31}
            height={32}
          />
          <h1>NeighBorrow</h1>
        </Link>

        <div className='mt-10 flex flex-col gap-5'>
          {adminSideBarLinks.map(link => {
            const isSelected =
              (link.route !== "/admin" && pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div className={cn("link", isSelected && "bg-primary border border-foreground")}>
                  {defineIcon(link.icon, isSelected ? "stroke-foreground" : "stroke-secondary")}
                  <p className='font-medium'>{link.text}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className='user'>
        <Image
          src='/icons/profile-icon.svg'
          alt='profile'
          loading='eager'
          width={46}
          height={46}
          className='shrink-0 max-lg:hidden'
        />
        <div className='flex min-w-0 flex-1 flex-col overflow-hidden max-lg:hidden'>
          <p className='truncate font-medium '>{session?.user?.name}</p>
          <p className='truncate text-muted-special-text text-xs'>{session?.user?.email}</p>
        </div>
        <form action={signOutCurrentUser} className='flex shrink-0'>
          <Button
            variant='ghost'
            className='bg-transparent border-0 p-0 w-5 h-5 hover:bg-transparent hover:text-current cursor-pointer'
          >
            <LogOutIcon className='size-full stroke-secondary' />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
