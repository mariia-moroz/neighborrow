import Image from "next/image";
import { Rating } from "@/components/reui/rating";
import { Button } from "./ui/button";

const ItemOverview = ({
  title,
  category,
  rating,
  total_items,
  available_items,
  summary,
  image = "/images/item-placeholder.png",
}: Item) => {
  return (
    <section className='item-overview'>
      <div className='flex flex-2 flex-col gap-5'>
        <h1>{title}</h1>
        <div className='item-details'>
          <p className='flex gap-2'>
            Category:<span className='tag'>{category}</span>
          </p>
          <div className='item-rating'>
            <p>Rating:</p>
            <Rating rating={rating} size='lg' />
          </div>
        </div>

        <div className='item-copies'>
          <p>
            Total items:<span>{total_items}</span>
          </p>
          <p>
            Available:<span>{available_items}</span>
          </p>
        </div>

        <p className='item-description'>{summary}</p>

        <Button className='item-overview_btn'>
          <Image src='/icons/claw.svg' alt='claw' width={24} height={24} />
          <p className='font-medium text-xl'>Borrow Item Request</p>
        </Button>
      </div>

      <div className='item-image'>
        <Image src={image} alt={title} width={400} height={400} loading='eager' className='w-full bg-cover' />
      </div>
    </section>
  );
};

export default ItemOverview;
