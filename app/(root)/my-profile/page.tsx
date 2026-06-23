import ItemList from "@/components/ItemList";
import { Button } from "@/components/ui/button";
import { sampleItems } from "@/constants";
import { signOut } from "@/auth";

const Page = async () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className='mb-10'
      >
        <Button>Logout</Button>
      </form>

      <ItemList title='Borrowed Items' items={sampleItems} />
    </>
  );
};

export default Page;
