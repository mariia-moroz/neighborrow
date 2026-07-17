import Image from "next/image";

const NoItems = ({
  title,
  text,
  children,
  className,
}: {
  title?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-18 ${className}`}>
      <Image src='/images/cutie-sad.svg' alt='No items' loading='eager' width={200} height={200} />
      <h3 className='font-bold text-2xl mt-8'>{title}</h3>
      <p className='whitespace-pre-line text-base text-center mt-3'>{text}</p>
      {children}
    </div>
  );
};

export default NoItems;
