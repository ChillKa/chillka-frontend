'use client';

import { Button } from '@components/ui/button';
import cn from '@lib/utils';
import { Bookmark, Check } from 'lucide-react';

type FavoriteButtonProps = {
  className: string;
  isFavorited: boolean;
};

const FavoriteButton = ({ className, isFavorited }: FavoriteButtonProps) => {
  return (
    <Button
      className={cn(
        'ml-2 h-10 w-10 p-0 xl:h-14 xl:min-w-14',
        'border border-primary bg-surface text-primary hover:bg-primary/10',
        'flex items-center justify-center',
        className
      )}
    >
      {isFavorited ? <Check size={16} /> : <Bookmark size={16} />}
    </Button>
  );
};

export default FavoriteButton;
