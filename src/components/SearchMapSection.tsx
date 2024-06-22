'use client';

import {
  GoogleMap,
  Libraries,
  OverlayView,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useMemo } from 'react';

export type MarkerPosition = {
  id: string;
  lat: number;
  lng: number;
  pricing: number;
};

export type SearchMapSectionProps = {
  markers: MarkerPosition[];
};
const libraries = ['places', 'drawing', 'geometry'];

const SearchMapSection = ({ markers }: SearchMapSectionProps) => {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  const center = useMemo(() => {
    if (markers.length === 0) return { lat: 0, lng: 0 };

    const totalLat = markers.reduce((sum, marker) => sum + marker.lat, 0);
    const totalLng = markers.reduce((sum, marker) => sum + marker.lng, 0);

    const avgLat = totalLat / markers.length;
    const avgLng = totalLng / markers.length;

    const closestMarker = markers.reduce((closest, marker) => {
      const distanceToTempCenter = Math.hypot(
        marker.lat - avgLat,
        marker.lng - avgLng
      );
      const distanceToClosest = Math.hypot(
        closest.lat - avgLat,
        closest.lng - avgLng
      );

      return distanceToTempCenter < distanceToClosest ? marker : closest;
    }, markers[0]);

    return closestMarker;
  }, [markers]);

  if (loadError)
    return (
      <div className="h-[47.5rem] w-full">
        Encountered error while loading google maps
      </div>
    );

  if (!scriptLoaded)
    return <div className="h-[47.5rem] w-full">Map Script is loading ...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '760px',
      }}
      center={center}
      zoom={15}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: false,
      }}
    >
      {markers.map((marker) => (
        <OverlayView
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="flex h-10 w-20 items-center justify-center rounded-full border bg-surface shadow-lg">
            <p className="text-sm font-bold">
              {marker.pricing === 0 ? '免費' : `NT$${marker.pricing}`}
            </p>
          </div>
        </OverlayView>
      ))}
    </GoogleMap>
  );
};

export default SearchMapSection;
