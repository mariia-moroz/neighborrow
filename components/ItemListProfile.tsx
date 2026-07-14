import ItemCardProfile from "./ItemCardProfile";

interface Props {
  title: string;
  items: BorrowedItem[];
  currentTimestamp: number;
  containerClassName?: string;
}

const ItemListProfile = ({ title, items, currentTimestamp, containerClassName }: Props) => {
  if (items.length < 1) {
    return;
  }

  return (
    <section className={containerClassName}>
      <h2 className='item-list-header'>{title}</h2>

      <ul className='item-list'>
        {items.map(item => (
          <ItemCardProfile key={item.id} {...item} currentTimestamp={currentTimestamp} />
        ))}
      </ul>
    </section>
  );
};

export default ItemListProfile;
