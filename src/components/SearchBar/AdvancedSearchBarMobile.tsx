import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import cn from '@lib/utils';

const AdvancedSearchBarMobile = () => {
  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger
        className={cn(
          'flex grow flex-row items-center justify-center gap-4',
          'bg-primary font-medium text-white'
        )}
      >
        <p>篩選條件</p>
      </DialogTrigger>
      <DialogContent hideCloseButton className="block h-svh w-screen p-0">
        test
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearchBarMobile;
