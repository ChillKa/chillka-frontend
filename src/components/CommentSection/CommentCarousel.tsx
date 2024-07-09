'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselProgress,
} from '@components/ui/carousel';
import { Separator } from '@components/ui/separator';
import Autoplay from 'embla-carousel-autoplay';
import { CommentType } from 'src/types/comments';
import CommentCard from './CommentCard';

type CommentCarouselProps = {
  comments: CommentType[];
};

const CommentCarousel = ({ comments }: CommentCarouselProps) => {
  return (
    <Carousel
      className="w-full xl:bg-primary"
      opts={{ loop: true, slidesToScroll: 1 }}
      plugins={[
        Autoplay({
          delay: 2400,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent className="xl:-ml-[1px]">
        {comments.map((item) => (
          <CarouselItem key={item._id} className="xl:basis-1/3 xl:pl-[1px]">
            <CommentCard
              className="bg-surface xl:px-6"
              activityName={item.activityName}
              participant={item.userName}
              profilePicture={item.profilePicture}
              date={item.date}
              content={item.content}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="h-8 w-full bg-surface" />
      <Separator className="h-[0.5px]" />
      <CarouselProgress className="h-0.5 rounded-none bg-surface" />
    </Carousel>
  );
};

export default CommentCarousel;
