import ItemCard from "./ItemCard";

interface Props {
  title: string;
  items: Item[];
  containerClassName?: string;
}

const ItemList = ({ title, items, containerClassName }: Props) => {
  return (
    <section className={containerClassName}>
      <h2 className='item-list-header'>{title}</h2>
      <ul className='item-list'>
        {items.map(item => (
          <ItemCard key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
