"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowItem } from "@/lib/actions/item";
import { Spinner } from "./ui/spinner";

interface Props {
  itemId: string;
  userId: string;
  borrowingEligibility: {
    isAvailable: boolean;
    isBorrowed: boolean;
  };
}

const BorrowItem = ({ itemId, userId, borrowingEligibility: { isAvailable, isBorrowed = false } }: Props) => {
  const router = useRouter();

  const [isBorrowing, setIsBorrowing] = useState(false);

  const handleBorrrowItem = async () => {
    setIsBorrowing(true);

    try {
      const result = await borrowItem({ itemId, userId });

      if (result.success) {
        toast.success("Success", {
          description: "Item borrowed successfully",
        });

        router.push("/my-profile?status=pending");
      } else {
        toast.error("Booking Error", {
          description: "An errror occcured while borrowing the item",
        });
      }
    } catch (error) {
      toast.error("Booking Error", {
        description: "An errror occcured while borrowing the item",
      });
    } finally {
      setIsBorrowing(false);
    }
  };

  const getStatus = () => {
    if (isBorrowed) {
      return "Borrowed";
    }

    if (isBorrowing) {
      return "Borrowing";
    }

    return "Borrow";
  };

  return (
    <Button
      className='item-overview_btn'
      onClick={handleBorrrowItem}
      disabled={isBorrowing || isBorrowed || !isAvailable}
    >
      <Image src='/icons/claw.svg' alt='claw' width={24} height={24} />
      <p className='font-medium text-lg'>{getStatus()} Item</p>
      {isBorrowing && <Spinner data-icon='inline-start' />}
    </Button>
  );
};

export default BorrowItem;
