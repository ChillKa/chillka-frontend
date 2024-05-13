import { fetchMe } from '@action/user';
import { Card } from '@components/ui/card';
import UserProfileForm from '@components/user/UserProfileForm';

const UserAboutPage = async () => {
  const result = await fetchMe();

  return (
    <section className="flex w-full justify-center p-2">
      <Card className="mt-2 w-[50%] p-5">
        {result.status === 'success' ? (
          <UserProfileForm defaultData={result.data} />
        ) : (
          <div>Failed</div>
        )}
      </Card>
    </section>
  );
};

export default UserAboutPage;
