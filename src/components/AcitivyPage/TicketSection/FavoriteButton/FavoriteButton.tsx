'use client';

import { fetchActivity, toggleFavoriteActivity } from '@action/activity';
import { Button } from '@components/ui/button';
import { toast } from '@components/ui/use-toast';
import cn from '@lib/utils';
import { Bookmark, Check } from 'lucide-react';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { IAcitivityResponse } from 'src/types/activity';

type FavoriteButtonProps = {
  className: string;
  activityId?: string;
};

const FavoriteButton = ({ className, activityId }: FavoriteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<IAcitivityResponse | null>(null);

  const getActivity = useCallback(async (id: string) => {
    const response = await fetchActivity(id);
    setResult(response.result);
  }, []);

  useEffect(() => {
    getActivity(activityId!);
  }, [activityId, getActivity]);

  const handleToggleFavoriteActivity = () => {
    startTransition(async () => {
      const reponse = await toggleFavoriteActivity(activityId!);
      if (reponse?.message !== '') {
        toast({
          title: reponse?.message ?? 'Unknown error',
          variant: reponse?.status === 'success' ? 'default' : 'destructive',
        });
      }
      if (reponse?.status === 'success') getActivity(activityId!);
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
      {result?.activity.saved ? <Check size={16} /> : <Bookmark size={16} />}
    </Button>
  );
};

export default FavoriteButton;
