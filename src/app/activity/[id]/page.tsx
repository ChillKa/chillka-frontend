import CoverSection from '@components/AcitivyPage/Banner';
import { CoverType } from 'src/types/activity';

const DUMMY_DATA: CoverType = [
  'https://picsum.photos/id/13/1920/267',
  'https://picsum.photos/id/19/1920/267',
  'https://picsum.photos/id/37/1920/267',
  'https://picsum.photos/id/40/1920/267',
];

function page() {
  return (
    <>
      <CoverSection className="" covers={DUMMY_DATA} />
      123
    </>
  );
}

export default page;
