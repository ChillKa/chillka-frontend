'use client';

import Comment from '@components/ActivityPage/QuestionsSetcion/Comment';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { P } from '@components/ui/typography';
import { useAuthContext } from '@store/AuthProvider/AuthProvider';

type UserCommentProps = {
  activityId: string;
  getActivity: (id: string) => Promise<void>;
  previewMode: boolean;
};

const UserComment = ({
  activityId,
  getActivity,
  previewMode,
}: UserCommentProps) => {
  const { isLoggedin, userName } = useAuthContext();
  const firstLetter = userName.charAt(0);

  return (
    <div className="mt-4 xl:mt-6">
      {isLoggedin && !previewMode ? (
        <div className="flex gap-4 xl:gap-6">
          <Avatar className="h-12 w-12 rounded-full">
            <AvatarImage src="" alt="Organizer" />
            <AvatarFallback className="rounded-2xl bg-primary text-white">
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
      ) : (
        <P>需登入才能提問</P>
      )}
    </div>
  );
};

export default UserComment;
