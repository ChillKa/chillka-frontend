import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

function decrypt(): string {
  const cookieStore = cookies();
  const session = cookieStore.get('session')?.value;
  const payload = decodeJwt(session ?? '');

  if ('username' in payload && typeof payload.username === 'string') {
    return payload.username ?? '';
  }
  return '';
}

const UserAboutPage = () => {
  const payload = decrypt();

  return (
    <section className="flex w-full justify-center">{payload ?? ''}</section>
  );
};

export default UserAboutPage;
