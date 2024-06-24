'use client';

import { toggleFavoriteActivity } from '@action/activity';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { Bookmark, Check } from 'lucide-react';
import { useTransition } from 'react';

type FavoriteButtonProps = {
  className: string;
};

const FavoriteButton = ({ className }: FavoriteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const { data, loadActivity } = useActivityContext();

  if (!data) {
    return null;
  }

  const handleToggleFavoriteActivity = () => {
    startTransition(async () => {
      const result = await toggleFavoriteActivity(data.activity._id);
      if (result?.message !== '') {
        toast({
          title: result?.message ?? 'Unknown error',
          variant: result?.status === 'success' ? 'default' : 'destructive',
        });
      }
      if (result?.status === 'success') loadActivity(data.activity._id);
    });
  };

  return (
    <Button
      className={cn(
        'ml-2 h-10 w-10 p-0 xl:h-14 xl:min-w-14',
        'border border-primary bg-surface text-primary hover:bg-primary/10',
        'flex items-center justify-center',
        className
      )}
      onClick={handleToggleFavoriteActivity}
      disabled={isPending}
    >
      {data.activity.saved ? <Check size={16} /> : <Bookmark size={16} />}
    </Button>
  );
};

export default FavoriteButton;
