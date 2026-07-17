"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/my-profile") {
    return null;
  }

  return (
    <footer className='w-full flex mt-auto'>
      <Image
        src='/images/footer.svg'
        alt='footer'
        height={375}
        width={2400}
        loading='eager'
        className='max-sm:hidden'
      />
      <Image
        src='/images/cutie-small.svg'
        alt='footer'
        height={375}
        width={2400}
        loading='eager'
        className='sm:hidden'
      />
    </footer>
  );
};

export default Footer;
