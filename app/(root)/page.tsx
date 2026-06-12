import ItemList from "@/components/ItemList";
import ItemOverview from "@/components/ItemOverview";
import { sampleItems } from "@/constants";

const Home = () => (
  <>
    <ItemOverview {...sampleItems[0]} />
    <ItemList title='Latest Items' items={sampleItems} containerClassName='mt-15' />
  </>
);

export default Home;
