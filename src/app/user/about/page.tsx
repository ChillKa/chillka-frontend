import { fetchMe } from '@action/user';

const UserAboutPage = async () => {
  const result = await fetchMe();

  return (
    <section className="flex w-full justify-center">
      {result.status === 'success' ? (
        <div>{result.data.displayName}</div>
      ) : (
        <div>failed</div>
      )}
    </section>
  );
};

export default UserAboutPage;
