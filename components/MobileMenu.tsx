"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { signOutCurrentUser } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  name: string;
  email: string;
  isAdmin: boolean;
  pathName: string;
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ name, email, isAdmin, className, pathName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={className}>
      {/* Hamburger Menu Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className='text-semibold focus:outline-none'
        aria-label='Toggle menu'
      >
        {isOpen ? <X className='size-6 sm:size-7' /> : <Menu className='size-6 sm:size-7' />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className='fixed inset-0 z-40 bg-black/70' onClick={closeMenu} aria-hidden='true' />}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-4/5 md:w-3/5 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className='flex h-full flex-col overflow-y-auto'>
          {/* Header */}
          <div className='flex items-center justify-between p-3 sm:p-4'>
            <Image src='/icons/profile-icon.svg' alt='profile' loading='eager' width={32} height={32} />
            <h2 className='font-semibold text-medium sm:text-lg'>Menu</h2>
            <div className='flex items-center gap-2 sm:gap-3'>
              <button
                onClick={e => {
                  e.stopPropagation();
                  closeMenu();
                }}
                className='text-medium focus:outline-none'
                aria-label='Close menu'
              >
                <X className='size-5 sm:size-6' />
              </button>
            </div>
          </div>

          {/* User Info Section */}
          <div className='border-b border-border mx-3 sm:mx-4 py-5 px-3 sm:p-4'>
            <p className='text-base font-semibold'>{name}</p>
            <p className='ios-no-link mt-1 text-xs text-muted-special-text no-underline sm:text-xs'>{email}</p>
          </div>

          {/* Navigation Links */}
          <div className='flex flex-col p-3 sm:p-4 gap-1'>
            <Link
              href='/'
              onClick={closeMenu}
              className={cn(
                "block rounded-md p-3 text-base transition-colors hover:bg-muted active:bg-muted",
                pathName === "/" ? "text-tag-accent font-semibold" : "font-medium",
              )}
            >
              Home
            </Link>

            <Link
              href='/collection'
              onClick={closeMenu}
              className={cn(
                "block rounded-md p-3 text-base transition-colors hover:bg-muted active:bg-muted",
                pathName === "/collection" ? "text-tag-accent font-semibold" : "font-medium",
              )}
            >
              Collection
            </Link>

            <Link
              href='/my-profile'
              onClick={closeMenu}
              className={cn(
                "block rounded-md p-3 text-base transition-colors hover:bg-muted active:bg-muted",
                pathName === "/my-profile" ? "text-tag-accent font-semibold" : "font-medium",
              )}
            >
              My profile
            </Link>

            {isAdmin && (
              <Link
                href='/admin'
                onClick={closeMenu}
                className={cn(
                  "block rounded-md p-3 text-base transition-colors hover:bg-muted active:bg-muted",
                  pathName === "/admin" ? "text-tag-accent font-semibold" : "font-medium",
                )}
              >
                Admin
              </Link>
            )}

            <form action={signOutCurrentUser} className='mt-4'>
              <Button className='border border-foreground font-medium! min-h-10! text-base! w-full'>
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
