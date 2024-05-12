import { fetchMe } from '@action/user';
import UserProfileForm from '@components/user/UserProfileForm';

const UserAboutPage = async () => {
  const result = await fetchMe();

  return (
    <section className="flex w-full justify-center p-2">
      {result.status === 'success' ? (
        <UserProfileForm defaultData={result.data} />
      ) : (
        <div>failed</div>
      )}
    </section>
  );
};

export default UserAboutPage;
