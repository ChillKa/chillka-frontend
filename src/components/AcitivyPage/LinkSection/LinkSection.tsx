import { P } from '@components/ui/typography';
import cn from '@lib/utils';

type LinkSectionProps = {
  className: string;
};

const LinkSection = ({ className }: LinkSectionProps) => {
  return (
    <section className={cn('border-y py-6 text-primary xl:py-12', className)}>
      <div className="mb-4 text-2xl font-bold -tracking-[0.006em] xl:mb-6 xl:text-3xl xl:-tracking-[0.0075em]">
        活動連結
      </div>
      <P>活動連結將在報名成功後，自動寄送至您填寫的電子郵箱</P>
    </section>
  );
};

export default LinkSection;
