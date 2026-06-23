const Page = () => {
  return (
    <main className='root-container'>
      <div className='content-container flex min-h-screen flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-secondary'>Whoa, slow down there, Speedy!</h1>
        <p className='mt-3 text-center wax-w-xl'>
          Looks like you&apos;ve been a little too fast. Don&apos;t push the horses, chill for a bit and try
          again shortly
        </p>
      </div>
    </main>
  );
};

export default Page;
