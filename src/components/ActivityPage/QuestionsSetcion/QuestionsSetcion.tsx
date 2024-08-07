'use client';

import { fetchActivity } from '@action/activity';
import Question from '@components/ActivityPage/QuestionsSetcion/Question';
import UserComment from '@components/ActivityPage/QuestionsSetcion/UserComment';
import { P } from '@components/ui/typography';
import cn from '@lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { IAcitivityResponse } from 'src/types/activity';

type QuestionsSetcionProps = {
  className: string;
  activityId?: string;
  previewMode: boolean;
};

const QuestionsSetcion = ({
  className,
  activityId,
  previewMode,
}: QuestionsSetcionProps) => {
  const [data, setData] = useState<IAcitivityResponse | null>(null);
  const [userId, setUserId] = useState<string | null>('');

  const getActivity = useCallback(async (id: string) => {
    const response = await fetchActivity(id);
    setData(response.result);
    setUserId(response.userId);
  }, []);

  useEffect(() => {
    getActivity(activityId!);
  }, [activityId, getActivity]);

  return (
    <section className={cn('border-b py-6 text-primary xl:py-12', className)}>
      <div className="mb-4 text-2xl font-bold -tracking-[0.006em] xl:mb-6 xl:text-3xl xl:-tracking-[0.0075em]">
        Q&A
      </div>
      {data?.questions.length === 0 && <P className="mb-12">目前尚未有提問</P>}
      {data?.questions &&
        data.questions.map((question, index) => {
          const isLast = index === data.questions.length - 1;
          return (
            <Question
              className={isLast ? '' : 'border-b'}
              data={data}
              userId={userId!}
              question={question}
              key={question._id}
              getActivity={getActivity}
            />
          );
        })}
      <UserComment
        data={data!}
        activityId={activityId!}
        getActivity={getActivity}
        previewMode={previewMode}
      />
    </section>
  );
};

export default QuestionsSetcion;
