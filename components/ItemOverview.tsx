import Image from "next/image";
import { Rating } from "@/components/reui/rating";
import { Button } from "./ui/button";

type ItemOverviewProps = Item & {
  userId: string;
};

const ItemOverview = ({
  title,
  category,
  rating,
  totalItems,
  availableItems,
  summary,
  image = "/images/item-placeholder.png",
}: ItemOverviewProps) => {
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

        <Button className='item-overview_btn'>
          <Image src='/icons/claw.svg' alt='claw' width={24} height={24} />
          <p className='font-medium text-lg'>Borrow Item Request</p>
        </Button>
      </div>

      <div className='item-image'>
        <Image
          src={image}
          alt={title}
          fill
          sizes='(min-width: 1280px) 480px, 400px'
          loading='lazy'
          placeholder='blur'
          blurDataURL='/images/item-placeholder.png'
          className='w-full bg-cover rounded-xl overflow-hidden'
        />
      </div>
    </section>
  );
};

export default ItemOverview;
