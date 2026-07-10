import { auth } from "@/auth";
import ItemCarousel from "@/components/ItemCarousel";
import ItemOverview from "@/components/ItemOverview";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { desc } from "drizzle-orm";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db.select().from(items).limit(9).orderBy(desc(items.createdAt))) as Item[];

  return (
    <div className='flex flex-col justify-center'>
      <ItemOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <ItemCarousel title='Latest Items' items={latestBooks.slice(1)} containerClassName='mt-15' />
      <Button asChild className='main-button mt-15 mx-auto'>
        <Link href='/collection' className='flex gap-1'>
          <p className='text-lg'>Explore all items</p>
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
};

export default Home;
