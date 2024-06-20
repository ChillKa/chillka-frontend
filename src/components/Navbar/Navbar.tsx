import { aboutAccount, aboutEventist } from '@components/Navbar/fixedData';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>活動相關</li>
        {aboutEventist.map((item) => (
          <li key={item.title}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
        <li>帳號相關</li>
        {aboutAccount.map((item) => (
          <li key={item.title}>
            <Link href={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
