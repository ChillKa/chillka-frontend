import { fetchMe } from '@action/user';
import UserProfileForm from '@components/user/UserProfileForm';

const Account = async () => {
  const result = await fetchMe();

  return (
    <section className="flex w-full justify-center text-primary">
      {result.status === 'success' ? (
        <UserProfileForm defaultData={result.data} />
      ) : (
        <div>{result.message}</div>
      )}
    </section>
  );
};

export default Account;
