import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { H1, Small } from '@components/ui/typography';
import cn from '@lib/utils';
import Link from 'next/link';
import Video from './Video';

type CalltoActionSectionProps = {
  className: string;
};

const CallToActionSection = ({ className }: CalltoActionSectionProps) => {
  return (
    <section
      className={cn(
        'relative pb-[100px] pt-[72px] text-primary xl:max-w-[81rem] xl:pb-0 xl:pt-20',
        className
      )}
    >
      <div className="absolute left-0 top-0">
        <H1 className="w-fit bg-surface pl-[13px] pr-4 xl:pb-4">
          找不到
          <br className="hidden xl:block" />
          心目中的
          <br className="xl:hidden" />
          活動嗎？
        </H1>
        <h1 className="w-[360.98px] bg-surface  pb-4 pl-[13px] pr-4 text-5xl font-bold -tracking-[0.012em] xl:-mt-3 xl:w-fit">
          讓你來揪咖！
        </h1>
        <div className="w-fit bg-surface px-4 py-8">
          <Separator className="h-[2px] w-12 bg-primary" />
        </div>
        <Small className="w-fit bg-surface p-4 pb-0 leading-6">
          Your Crew, Your Call
        </Small>
        <Small className="-mt-2 w-fit bg-surface p-4 pt-2 leading-6">
          Bring Your Own Adventure!
        </Small>
      </div>
      <Video className="h-[750px] w-full xl:h-[420px] xl:px-[110px]" />
      <div className="absolute bottom-0 right-0 pb-[33px] pl-[31px] pr-[30px] pt-[34px]">
        <Button className="h-[134px] w-[140px] bg-transparent bg-[url('/callToActionButton-surface.svg')] text-base font-medium text-primary transition duration-300 ease-out hover:bg-transparent hover:bg-[url('/callToActionButton-primary.svg')] hover:text-surface">
          <Link href="/activity">開始揪咖</Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;
