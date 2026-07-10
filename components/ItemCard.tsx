import Image from "next/image";
import Link from "next/link";
import { Rating } from "./reui/rating";

const ItemCard = ({ id, title, category, rating, image, available, borrowDuration }: Item) => {
  return (
    <li className='item-card'>
      <div className='item-card-image'>
        <Image
          src={image}
          alt={title}
          width={240}
          height={240}
          loading='lazy'
          placeholder='blur'
          blurDataURL='/images/item-placeholder.png'
          className='w-full bg-cover rounded-lg'
        />
      </div>
      <div>
        <p className='item-card-title'>{title}</p>
        <div className='item-card-details'>
          <p>
            Borrow duration: <span className='font-regular!'>{borrowDuration}</span> days
          </p>
          <div className='flex gap-1'>
            <p>Rating:</p>
            <Rating rating={rating} size='default' />
          </div>
        </div>
      </div>
      <div className='item-card-controls'>
        <span className='tag'>{category}</span>
        <Link href={`/items/${id}`} className='item-button'>
          {available ? "Borrow" : "All Borrowed"}
        </Link>
      </div>
    </li>
  );
};

export default ItemCard;
