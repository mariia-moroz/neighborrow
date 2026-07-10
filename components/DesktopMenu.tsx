import React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { signOutCurrentUser } from "@/lib/actions/auth";

const NavigationItem = ({
  title,
  href,
  pathName = "/",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; pathName: string }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className={cn(
          className ?? "cursor-pointer capitalize text-xl",
          pathName === href ? "text-tag-accent font-semibold" : "font-medium",
        )}
      >
        {title}
      </Link>
    </NavigationMenuLink>
  );
};

const DesktopMenu = ({
  pathName,
  isAdmin,
  className,
}: {
  pathName: string;
  isAdmin: boolean;
  className?: string;
}) => {
  return (
    <NavigationMenu viewport={false} className={className}>
      <NavigationMenuList className='gap-5!'>
        <NavigationMenuItem>
          <NavigationItem href='/' title='Home' pathName={pathName} />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationItem href='/collection' title='Collection' pathName={pathName} />
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "cursor-pointer capitalize text-xl flex align-center items-center gap-2",
              pathName === "/my-profile" ? "text-tag-accent font-semibold" : "font-medium",
            )}
          >
            <Image src='/icons/profile-icon.svg' alt='profile' loading='eager' width={32} height={32} />
            <p>Profile</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent className='z-50 left-auto! right-0!  w-70!'>
            <ul className='p-3 flex flex-col gap-3'>
              <li>
                <NavigationItem
                  href='/my-profile'
                  title='My profile'
                  pathName={pathName}
                  className='cursor-pointer capitalize text-lg!'
                />
              </li>
              <li>
                {isAdmin && (
                  <NavigationMenuItem>
                    <NavigationItem
                      href='/admin'
                      title='Admin'
                      pathName={pathName}
                      className='cursor-pointer capitalize text-lg!'
                    />
                  </NavigationMenuItem>
                )}
              </li>
              <li>
                <form action={signOutCurrentUser}>
                  <Button className='border border-foreground font-medium! min-h-10! text-lg! w-full'>
                    Logout
                  </Button>
                </form>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopMenu;
