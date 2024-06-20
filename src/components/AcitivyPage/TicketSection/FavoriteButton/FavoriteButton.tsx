'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import { Bookmark, Check } from 'lucide-react';

type FavoriteButtonProps = {
  className: string;
};

const FavoriteButton = ({ className }: FavoriteButtonProps) => {
  const { data } = useActivityContext();

  if (!data) {
    return null;
  }

  return (
    <Button
      className={cn(
        'ml-2 h-10 w-10 p-0 xl:h-14 xl:min-w-14',
        'border border-primary bg-surface text-primary hover:bg-primary/10',
        'flex items-center justify-center',
        className
      )}
    >
      {data.activity.saved ? <Check size={16} /> : <Bookmark size={16} />}
    </Button>
  );
};

export default FavoriteButton;
