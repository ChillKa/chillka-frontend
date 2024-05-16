import cn from '@lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  className: string;
  linkURL: string;
  categoryName: string;
  icon: LucideIcon;
};

const IconButton = ({
  className = '',
  linkURL,
  categoryName,
  icon,
}: Props): React.JSX.Element => {
  const Icon = icon;
  return (
    <Link
      className={cn(
        'flex flex-col items-center justify-center gap-2',
        className
      )}
      href={linkURL}
    >
      <Icon className="h-10 w-10" strokeWidth={1} />
      <span className="block text-xl font-bold ">{categoryName}</span>
    </Link>
  );
};

export default IconButton;
