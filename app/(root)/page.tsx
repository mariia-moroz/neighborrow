import ItemList from "@/components/ItemList";
import ItemOverview from "@/components/ItemOverview";
import { sampleItems } from "@/constants";

const Home = () => (
  <>
    <ItemOverview {...sampleItems[0]}/>
    <ItemList title='Latest Items' items={sampleItems} containerClassname='mt-28' />
  </>
);

export default Home;
