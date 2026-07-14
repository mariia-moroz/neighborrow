import Image from "next/image";

const Footer = () => {
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
