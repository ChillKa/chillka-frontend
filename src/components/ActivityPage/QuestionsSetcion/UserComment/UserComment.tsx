'use client';

import Comment from '@components/ActivityPage/QuestionsSetcion/Comment';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { P } from '@components/ui/typography';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';
import { IAcitivityResponse } from 'src/types/activity';

type UserCommentProps = {
  activityId: string;
  data: IAcitivityResponse;
  getActivity: (id: string) => Promise<void>;
  previewMode: boolean;
};

const UserComment = ({
  data,
  activityId,
  getActivity,
  previewMode,
}: UserCommentProps) => {
  const { isLoggedin, userName, userAvatar, auth } = useAuthContext();
  const firstLetter = userName.charAt(0);
  const isActvityCreator = data?.activity.creatorId === auth?._id;
  return (
    <div className="mt-4 xl:mt-6">
      {isLoggedin && !previewMode && !isActvityCreator && (
        <div className="flex gap-4 xl:gap-6">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage
              className="object-cover"
              src={userAvatar}
              alt={userName}
            />
            <AvatarFallback className="rounded-2xl bg-primary-light text-white">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <Comment
            className=""
            action="comment"
            questionId=""
            activityId={activityId}
            getActivity={getActivity}
          />
        </div>
      )}
      {!isLoggedin && <P>需登入才能提問</P>}
    </div>
  );
};

export default UserComment;
