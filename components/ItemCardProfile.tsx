import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, CircleAlertIcon, CircleCheckIcon, CalendarClockIcon, ClockIcon } from "lucide-react";

const ItemCardProfile = ({
  item: { id, title, category, image },
  borrowDate,
  dueDate,
  returnDate,
  status,
  currentTimestamp,
}: BorrowedItem & { currentTimestamp: number }) => {
  const getStatus = () => {
    if (status === "PENDING") {
      return (
        <>
          <ClockIcon size={18} className='stroke-pending-icon' />
          <p>Pending approval</p>
        </>
      );
    }

    if (status === "RETURNED" && returnDate) {
      return (
        <>
          <CircleCheckIcon size={18} className='stroke-success-icon' />
          <p>Returned {returnDate && `on ${new Date(returnDate).toLocaleDateString("en-GB")}`}</p>
        </>
      );
    }

    if (!dueDate) {
      return (
        <>
          <CalendarIcon size={18} className='stroke-secondary' />
          <p>Not returned</p>
        </>
      );
    }

    const dueDateTime = new Date(dueDate).getTime();

    if (dueDateTime < currentTimestamp) {
      return (
        <>
          <CircleAlertIcon size={18} className='stroke-destructive' />
          <p className='text-destructive'>Overdue return</p>
        </>
      );
    }

    const differenceInDays = Math.ceil((dueDateTime - currentTimestamp) / (1000 * 60 * 60 * 24));

    return (
      <div className='flex gap-1 items-center'>
        <CalendarClockIcon size={18} className='stroke-pending-icon' />
        <p>{differenceInDays} days left to due</p>
      </div>
    );
  };
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
          className='h-full w-full object-cover'
        />
      </div>
      <div>
        <p className='item-card-title'>{title}</p>
        <div className='item-card-details'>
          <div className='flex gap-1 items-center'>
            <CalendarIcon size={18} className='stroke-secondary' />
            <p>
              {status === "PENDING" ? "Requested" : "Borrowed"}{" "}
              {borrowDate && `on ${new Date(borrowDate).toLocaleDateString("en-GB")}`}
            </p>
          </div>
          <div className='flex gap-1 items-center'>{getStatus()}</div>
        </div>
      </div>
      <div className='item-card-controls'>
        <span className='tag'>{category}</span>
        <Link href={`/items/${id}`} className='item-button'>
          View
        </Link>
      </div>
    </li>
  );
};

export default ItemCardProfile;
