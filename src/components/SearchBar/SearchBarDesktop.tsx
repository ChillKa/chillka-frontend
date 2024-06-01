import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { H3 } from '@components/ui/typography';
import cn from '@lib/utils';

type SearchBarDesktopProps = {
  className: string;
};

const SearchBarDesktop = ({ className = '' }: SearchBarDesktopProps) => {
  return (
    <section
      className={cn(
        'sticky top-60 z-20 mx-auto max-w-[81rem] space-y-6 border-y border-primary bg-surface py-6 text-primary',
        className
      )}
    >
      <H3>依照需求搜尋適合你的活動</H3>
      <div className="flex gap-2">
        <div className="flex grow gap-4 border-y border-primary py-4">
          <div className="grow space-y-2 border-x border-primary px-4">
            <p className="font-bold">活動</p>
            <Input
              type="text"
              className="h-fit w-full border-none p-0 text-base placeholder:text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="搜尋關鍵字"
            />
          </div>
          <div className="min-w-60 space-y-2 border-r border-primary px-4">
            <p className="font-bold">類型</p>
            <p className="text-base text-primary">選擇活動類型</p>
          </div>
          <div className="min-w-60 space-y-2 px-4">
            <p className="font-bold">地區</p>
            <p className="text-base text-primary">選擇活動地區</p>
          </div>
        </div>
        <Button className="flex h-auto self-auto px-20 text-xl font-bold">
          搜尋活動
        </Button>
      </div>
    </section>
  );
};

export default SearchBarDesktop;
