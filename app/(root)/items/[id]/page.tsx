import { auth } from "@/auth";
import ItemOverview from "@/components/ItemOverview";
import { db } from "@/database/drizzle";
import { items } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const [itemDetails] = await db.select().from(items).where(eq(items.id, id)).limit(1);

  if (!itemDetails) {
    redirect("/404");
  }

  return (
    <>
      <ItemOverview {...itemDetails} userId={session?.user?.id as string} />
      <div className='item-text'>
        <div className='flex-[1.5] mt-10'>
          <section className='flex flex-col gap-7'>
            <h3>Description</h3>
            <div className='space-y-5 text-xl'>
              {itemDetails.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <h3>Condition</h3>
            <div className='space-y-5 text-xl'>
              <p>{itemDetails.condition}</p>
            </div>

            <h3>Included</h3>
            <div className='space-y-5 text-xl'>
              <ul className='list-disc mx-5'>
                {itemDetails.included.split(",").map((line, i) => (
                  <li key={i} className='text-lg md:text-xl'>
                    {line.trim()}
                  </li>
                ))}
              </ul>
            </div>

            <h3>Brand and Model</h3>
            <div className='space-y-5 text-xl'>
              <p>{itemDetails.brand}</p>
            </div>

            <h3>Borrow duration</h3>
            <div className='space-y-5 text-xl'>
              <p>Up to {itemDetails.borrowDuration} days</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
