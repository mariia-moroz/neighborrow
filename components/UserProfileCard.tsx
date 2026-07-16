import { BadgeCheckIcon, CircleXIcon, ClockIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import { Rating } from "./reui/rating";
import Link from "next/link";

interface UserProfileCardProps extends AuthCredentials {
  status: "PENDING" | "APPROVED" | "REGECTED" | null;
}

const UserProfileCard = ({
  fullName,
  email,
  address,
  idConfirmation,
  rating,
  status,
}: UserProfileCardProps) => {
  const getStatus = () => {
    switch (status) {
      case "APPROVED":
        return (
          <>
            <BadgeCheckIcon className='stroke-secondary' size={16} />
            <p className='text-sm'>Verified</p>
          </>
        );
      case "REGECTED":
        <>
          <CircleXIcon className='stroke-[#C44DA2]' size={16} />
          <p className='text-sm'>Verification failed</p>
        </>;
      default:
        <>
          <ClockIcon className='stroke-[#D5DEE9]' size={16} />
          <p className='text-sm'>Avaiting aproval</p>
        </>;
    }
  };

  return (
    <div className='user-card-wrapper'>
      <Image src='/images/pin.svg' alt='pin' width={40} height={60} className='user-card-pin' />

      <div className='user-card'>
        <div className='user-info'>
          <Image
            src='/icons/profile-icon.svg'
            alt='user'
            loading='eager'
            width={100}
            height={100}
            className='w-12 h-12 lg:w-25 lg:h-25'
          />
          <div>
            <div className='flex gap-1 items-center'>{getStatus()}</div>
            <h2 className='text-lg md:text-2xl font-bold'>{fullName}</h2>
            <p className='font-bold text-base lg:text-md text-secondary'>{email}</p>
          </div>
        </div>

        <div className='user-details'>
          <div>
            <h3 className='font-medium'>Rating</h3>
            <Rating rating={rating} size='default' />
          </div>

          <div>
            <h3 className='font-medium'>Address</h3>
            <p className='text-lg lg:text-xl font-semibold'>{address}</p>
          </div>

          <div>
            <h3 className='font-medium'>Verification</h3>
            <Link href={idConfirmation} className='flex gap-1 font-bold text-md text-secondary items-center'>
              <EyeIcon size={24} className='stroke-secondary' />
              View ID
            </Link>
          </div>
        </div>

        <div>
          <Image
            src='/images/cutie-small.svg'
            alt='cutie'
            loading='eager'
            width={566}
            height={215}
            className='w-full h-auto'
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
