import { auth } from "@/auth";
import ItemList from "@/components/ItemList";
import ItemOverview from "@/components/ItemOverview";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db.select().from(items).limit(9).orderBy(desc(items.createdAt))) as Item[];

  return (
    <>
      <ItemOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <ItemList title='Latest Items' items={latestBooks.slice(1)} containerClassName='mt-15' />
    </>
  );
};

export default Home;
