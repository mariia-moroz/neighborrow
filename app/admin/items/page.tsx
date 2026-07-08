import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section className='w-full rounded-2xl bg-card p-7 border border-border'>
      <div className='flex flex-wrap items-center justify-between gap-5 xs:gap-2'>
        <h2 className='text-xl font-semibold'>All Items</h2>
        <Button
          className='px-3 py-0.5 border border-foreground rounded-md font-medium text-base bg-primary text-nowrap'
          asChild
        >
          <Link href='/admin/items/new'>+ Create New Item</Link>
        </Button>
      </div>

      <div className='mt-7 w-full overflow-hidden'>
        <p>Table</p>
      </div>
    </section>
  );
};

export default Page;
