import { fetchMe } from '@action/user';
import DeviceAccessControls from '@components/DeviceAccessControls';
import UserProfileForm from '@components/user/UserProfileForm';

const Account = async () => {
  const result = await fetchMe();

  return (
    <section className="flex w-full justify-center text-primary">
      {result.status === 'success' ? (
        <div className="w-full">
          <UserProfileForm defaultData={result.data} />
          <DeviceAccessControls />
        </div>
      ) : (
        <div>{result.message}</div>
      )}
    </section>
  );
};

export default Account;
