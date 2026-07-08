import ItemForm from "@/components/admin/forms/ItemForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Button asChild className='back-button'>
        <Link href='/admin/items'>
          <ArrowLeftIcon /> Go Back
        </Link>
      </Button>

      <section className='form-box w-full max-w-4xl'>
        <ItemForm type='create' />
      </section>
    </>
  );
};

export default Page;
