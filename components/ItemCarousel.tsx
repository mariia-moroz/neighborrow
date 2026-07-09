"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ItemCard from "./ItemCard";

interface Props {
  title: string;
  items: Item[];
  containerClassName?: string;
}

const ItemCarousel = ({ title, items, containerClassName }: Props) => {
  if (items.length < 1) {
    return;
  }

  return (
    <section className={containerClassName}>
      <h2 className='item-list-header'>{title}</h2>

      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className='max-w-[75%] sm:max-w-[90%] lg:max-w-[95%] xl:max-w-full mt-10 mx-auto'
      >
        <CarouselContent>
          {items.map(item => (
            <CarouselItem key={item.id} className='basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4'>
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
