import { fetchActivity } from '@action/activity';
import LinkSection from '@components/ActivityPage/LocationSection/LinkSection';
import MapSection from '@components/ActivityPage/LocationSection/MapSection';
import { IAcitivityResponse } from 'src/types/activity';

type LocationSectionProps = {
  activityId?: string;
  existingData?: IAcitivityResponse;
};

const LocationSection = async ({
  activityId,
  existingData,
}: LocationSectionProps) => {
  const response = await fetchActivity(activityId as string);
  const data = response.result ?? existingData!;

  if (data.activity.type === '線上') {
    return <LinkSection className="" />;
  }

  return <MapSection className="" data={data} />;
};

export default LocationSection;
