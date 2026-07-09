import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "./ItemCard";

interface Props {
  title: string;
  items: Item[];
  containerClassName?: string;
}

const ItemCarousel = ({ title, items, containerClassName }: Props) => {
  if (items.length < 2) {
    return;
  }

  return (
    <section className={containerClassName}>
      <h2 className='item-list-header'>{title}</h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className='w-full max-w-[12rem] sm:max-w-xs md:max-w-sm'
      >
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={item.id} className='basis-1/2 lg:basis-1/3'>
              <ItemCard key={item.id} {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default ItemCarousel;
