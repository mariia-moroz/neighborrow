import Image from "next/image";
import { Rating } from "@/components/reui/rating";
import BorrowItem from "./BorrowItem";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";

interface ItemOverviewProps extends Item {
  userId: string;
}

const ItemOverview = async ({
  title,
  category,
  rating,
  totalItems,
  availableItems,
  summary,
  image = "/images/item-placeholder.png",
  id,
  userId,
}: ItemOverviewProps) => {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user) {
    return null;
  }

  const [borrowedRecord] = await db
    .select({ id: borrowRecords.id })
    .from(borrowRecords)
    .where(
      and(
        eq(borrowRecords.userId, userId),
        eq(borrowRecords.itemId, id),
        eq(borrowRecords.status, "BORROWED"),
      ),
    )
    .limit(1);

  const isBorrowed = Boolean(borrowedRecord);

  const borrowingEligibility = {
    isAvailable: availableItems > 0 && user.status === "APPROVED" && !isBorrowed,
    isBorrowed,
  };

  return (
    <section className='item-overview'>
      <div className='flex flex-2 flex-col gap-3 md:gap-5'>
        <h1>{title}</h1>
        <div className='item-details'>
          <p className='flex gap-2'>
            Category:<span className='tag'>{category}</span>
          </p>
          <div className='item-rating'>
            <p>Rating:</p>
            <Rating rating={rating} className='md:gap-3' starClassName='md:size-6' />
          </div>
        </div>

        <div className='item-copies'>
          <p>
            Total items:<span>{totalItems}</span>
          </p>
          <p>
            Available:<span>{availableItems}</span>
          </p>
        </div>

        <p className='item-description'>{summary}</p>

        <BorrowItem itemId={id} userId={userId} borrowingEligibility={borrowingEligibility} />
      </div>

      <div className='item-image'>
        <Image
          src={image}
          alt={title}
          width={480}
          height={480}
          sizes='(min-width: 1280px) 480px, 400px'
          loading='eager'
          placeholder='blur'
          blurDataURL='/images/item-placeholder.png'
          className='block h-full w-full object-cover'
        />
      </div>
    </section>
  );
};

export default ItemOverview;
