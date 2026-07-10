import ItemList from "@/components/ItemList";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const latestBooks = (await db.select().from(items).orderBy(desc(items.createdAt))) as Item[];

  return (
    <>
      <ItemList title='Borrowed Items' items={latestBooks} />
    </>
  );
};

export default Page;
