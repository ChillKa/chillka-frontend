'use client';

import cn from '@lib/utils';
import {
  GoogleMap,
  Libraries,
  OverlayView,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

export type MarkerPosition = {
  id: string;
  lat: number;
  lng: number;
  pricing: number;
};

export type SearchMapSectionProps = {
  markers: MarkerPosition[];
  centerId?: string;
};
const libraries = ['places', 'drawing', 'geometry'];

const SearchMapSection = ({ markers, centerId }: SearchMapSectionProps) => {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (markers.length === 0) return;

    const marker = centerId
      ? markers.find((el) => el.id === centerId)
      : markers[0];

    if (marker && (marker.lat !== center.lat || marker.lng !== center.lng)) {
      setCenter({ lat: marker.lat, lng: marker.lng });
    }
  }, [center.lat, center.lng, centerId, markers]);

  const renderMarkers = useMemo(
    () =>
      markers.map((marker) => (
        <OverlayView
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div
            className={cn(
              'flex h-10 w-20 items-center justify-center rounded-full border shadow-lg',
              marker.id === centerId ? 'bg-primary text-white' : 'bg-surface'
            )}
          >
            <p className="text-sm font-bold">
              {marker.pricing === 0 ? '免費' : `NT$${marker.pricing}`}
            </p>
          </div>
        </OverlayView>
      )),
    [markers, centerId]
  );

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
        height: '47.5rem',
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
      {renderMarkers}
    </GoogleMap>
  );
};

export default SearchMapSection;
