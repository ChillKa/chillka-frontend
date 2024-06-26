'use client';

import Comment from '@components/AcitivyPage/QuestionsSetcion/Comment';
import { P } from '@components/ui/typography';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import Image from 'next/image';

type UserCommentProps = {
  activityId: string;
  getActivity: (id: string) => Promise<void>;
};

const UserComment = ({ activityId, getActivity }: UserCommentProps) => {
  const { isLoggedin } = useAuthContext();

  return (
    <div className="mt-4 xl:mt-6">
      {isLoggedin ? (
        <div className="flex gap-4 xl:gap-6">
          <Image
            src="https://picsum.photos/id/64/1200/1200"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
            loading="eager"
            alt="user"
            style={{
              objectFit: 'cover',
            }}
          />
          <Comment
            className=""
            action="comment"
            questionId=""
            activityId={activityId}
            getActivity={getActivity}
          />
        </div>
      ) : (
        <P>需登入才能提問</P>
      )}
    </div>
  );
};

export default UserComment;
