import LinkSection from '@components/AcitivyPage/LocationSection/LinkSection';
import MapSection from '@components/AcitivyPage/LocationSection/MapSection';
import { useActivityContext } from '@store/ActivityProvider/ActivityProvider';
import SkeletonLocationSection from './SkeletonLocationSection';

const LocationSection = () => {
  const { data } = useActivityContext();

  if (!data) return <SkeletonLocationSection />;
  if (data.activity.type === '線上') {
    return <LinkSection className="" />;
  }

  return <MapSection className="" />;
};

export default LocationSection;
