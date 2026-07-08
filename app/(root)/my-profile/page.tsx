import ItemList from "@/components/ItemList";
import { Button } from "@/components/ui/button";
import { sampleItems } from "@/constants";
import { signOutCurrentUser } from "@/lib/actions/auth";

const Page = async () => {
  return (
    <>
      <form action={signOutCurrentUser} className='mb-10'>
        <Button>Logout</Button>
      </form>

      <ItemList title='Borrowed Items' items={sampleItems} />
    </>
  );
};

export default Page;
