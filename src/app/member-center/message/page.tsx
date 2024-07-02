import { getMessageListByFilter } from '@action/message';
import { getJwtPayload } from '@action/utils';
import MessageList from '@components/MessagePage/MessageList';
import { H1, H3 } from '@components/ui/typography';

const MessagePage = async () => {
  const [data, user] = await Promise.all([
    getMessageListByFilter(),
    getJwtPayload(),
  ]);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-56 text-primary">
        <div className="flex flex-col gap-8">
          <H3>很抱歉，找不到使用者。</H3>
        </div>
      </div>
    );
  }

  if (data.status === 'failed') {
    return (
      <div className="flex items-center justify-center py-56 text-primary">
        <div className="flex flex-col gap-8">
          <H3>很抱歉，找不到訊息。</H3>
          <p>更多錯誤資訊：{data.result}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col text-primary">
      <H1 className="border-b pb-8">訊息</H1>
      <MessageList messages={data.result?.data} user={user} />
    </div>
  );
};

export default MessagePage;
