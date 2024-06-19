import { P } from '@components/ui/typography';
import cn from '@lib/utils';

type MapSectionProps = {
  className: string;
  location: string;
  address: string;
};

const MapSection = ({ className, location, address }: MapSectionProps) => {
  return (
    <section
      className={cn(
        'border-y py-6 text-primary xl:py-12',
        'space-y-4 xl:space-y-6',
        className
      )}
    >
      <div className="text-2xl font-bold -tracking-[0.006em] xl:text-3xl xl:-tracking-[0.0075em]">
        活動地點
      </div>
      <P>{`${address}（${location}）`}</P>
      <div className="h-[23.3125rem] w-full bg-primary text-white">map</div>
    </section>
  );
};

export default MapSection;
