import CoverSection from '@components/AcitivyPage/Banner';

const DUMMY_DATA = [
  'https://picsum.photos/id/13/1920/1920',
  'https://picsum.photos/id/19/1920/1920',
  'https://picsum.photos/id/37/1920/1920',
  'https://picsum.photos/id/40/1920/1920',
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
