'use client';

import { Loader } from '@googlemaps/js-api-loader';
import cn from '@lib/utils';
import { useEffect, useRef } from 'react';

type ActivityLocationMarkerProps = {
  className: string;
  lat: number;
  lng: number;
};

const ActivityLocationMarker = ({
  className,
  lat,
  lng,
}: ActivityLocationMarkerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const locationIcon = `<svg width="80" height="88" viewBox="0 0 80 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="80" height="80" rx="40" fill="#403E3D"/>
<path d="M48 38C48 44 40 50 40 50C40 50 32 44 32 38C32 35.8783 32.8429 33.8434 34.3431 32.3431C35.8434 30.8429 37.8783 30 40 30C42.1217 30 44.1566 30.8429 45.6569 32.3431C47.1571 33.8434 48 35.8783 48 38Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40 41C41.6569 41 43 39.6569 43 38C43 36.3431 41.6569 35 40 35C38.3431 35 37 36.3431 37 38C37 39.6569 38.3431 41 40 41Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="38" y="78" width="4" height="10" rx="2" fill="#403E3D"/>
</svg>
`;

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = (await loader.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await loader.importLibrary('marker');
      const locationInMap = {
        lat,
        lng,
      };
      const mapOptions: google.maps.MapOptions = {
        center: locationInMap,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAP',
      };
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const tag = document.createElement('div');
      tag.innerHTML = locationIcon;
      const marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: locationInMap.lat,
          lng: locationInMap.lng,
        },
        content: tag,
      });

      return marker;
    };

    initMap();
  }, [lat, lng, locationIcon]);

  return <div className={cn('', className)} ref={mapRef} />;
};

export default ActivityLocationMarker;
