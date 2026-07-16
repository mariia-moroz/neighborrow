import ItemCard from "./ItemCard";
import NoItems from "./NoItems";

interface Props {
  title: string;
  items: Item[];
  containerClassName?: string;
}

const ItemList = ({ title, items, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className='item-list-header'>{title}</h2>

      {items?.length <= 0 ? (
        <NoItems title='No Items Found' text={`We couldn't find any items.\nPlease come back later.`} />
      ) : (
        <ul className='item-list'>
          {items.map(item => (
            <ItemCard key={item.id} {...item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ItemList;
