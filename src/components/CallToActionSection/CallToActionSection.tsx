import { Button } from '@components/ui/button';
import { Separator } from '@components/ui/separator';
import { H1, Small } from '@components/ui/typography';
import cn from '@lib/utils';
import Link from 'next/link';
import CallToActionButtonBackground from './CallToActionButtonBackground';
import Video from './Video';

type CalltoActionSectionProps = {
  className: string;
};

const CallToActionSection = ({ className }: CalltoActionSectionProps) => {
  return (
    <section
      className={cn(
        'relative pb-[6.25rem] pt-[4.5rem] text-primary xl:max-w-[81rem] xl:pb-0 xl:pt-20',
        className
      )}
    >
      <div className="absolute left-0 top-0">
        <H1 className="w-fit bg-surface pl-[0.8125rem] pr-4 xl:pb-4">
          找不到
          <br className="hidden xl:block" />
          心目中的
          <br className="xl:hidden" />
          活動嗎？
        </H1>
        <h1 className="bg-surface pb-4 pl-[0.8125rem] pr-4 text-5xl font-bold -tracking-[0.012em] xl:-mt-3 xl:w-fit">
          讓你來揪咖！
        </h1>
        <div className="w-fit bg-surface px-4 py-8">
          <Separator className="h-0.5 w-12 bg-primary" />
        </div>
        <Small className="w-fit bg-surface p-4 pb-0 leading-6">
          Your Crew, Your Call
        </Small>
        <Small className="-mt-2 w-fit bg-surface p-4 pt-2 leading-6">
          Bring Your Own Adventure!
        </Small>
      </div>
      <Video className="h-[46.875rem] w-full xl:h-[26.25rem] xl:px-[6.875rem]" />
      <div className="absolute bottom-0 right-0 pb-[2.0625rem] pl-[1.9375rem] pr-[1.875rem] pt-[2.125rem]">
        <Button className="relative h-full bg-transparent p-0 text-base font-medium text-surface transition duration-300 ease-out hover:bg-transparent hover:text-primary">
          <div className="absolute left-0 top-0 ">
            <CallToActionButtonBackground />
          </div>
          <Link
            href="/activity/new"
            className="z-10 px-[2.375rem] py-[3.4375rem] text-primary hover:text-surface"
          >
            開始揪咖
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CallToActionSection;
