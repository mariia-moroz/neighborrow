import Image from "next/image";

const Footer = () => {
  return (
    <footer className='w-full flex mt-auto'>
      <Image src='/images/footer.svg' alt='footer' height={375} width={2400} loading='eager'/>
    </footer>
  );
};

export default Footer;
