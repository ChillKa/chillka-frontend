'use client';

import { Skeleton } from '@components/ui/skeleton';
import { Loader } from '@googlemaps/js-api-loader';
import cn from '@lib/utils';
import { useEffect, useRef, useState } from 'react';

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

const SearchMapSection = ({ markers, centerId }: SearchMapSectionProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setLoadError(error);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initMap = async () => {
      try {
        const { Map } = (await google.maps.importLibrary(
          'maps'
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary;

        const centerMarker = centerId
          ? markers.find((el) => el.id === centerId)
          : markers[0];

        if (!centerMarker) {
          console.error('No valid center marker found');
          return;
        }

        const mapOptions: google.maps.MapOptions = {
          center: { lat: centerMarker.lat, lng: centerMarker.lng },
          zoom: 15,
          mapId: 'MY_NEXTJS_MAP',
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          fullscreenControl: false,
        };

        let newMap: google.maps.Map;
        if (map) {
          newMap = map;
          newMap.setOptions(mapOptions);
        } else {
          newMap = new Map(mapRef.current!, mapOptions);
          setMap(newMap);
        }

        markersRef.current.forEach((marker) => {
          // eslint-disable-next-line no-param-reassign
          marker.map = null;
        });
        markersRef.current = [];

        markers.forEach((marker) => {
          const markerElement = document.createElement('div');
          markerElement.className = cn(
            'flex h-10 w-20 items-center justify-center rounded-full border shadow-lg',
            marker.id === centerId ? 'bg-primary text-white' : 'bg-surface'
          );
          markerElement.innerHTML = `<p class="text-sm font-bold">${
            marker.pricing === 0 ? '免費' : `NT$${marker.pricing}`
          }</p>`;

          const advancedMarker = new AdvancedMarkerElement({
            map: newMap,
            position: { lat: marker.lat, lng: marker.lng },
            content: markerElement,
          });

          markersRef.current.push(advancedMarker);
        });

        // Center the map on the selected marker
        newMap.setCenter({ lat: centerMarker.lat, lng: centerMarker.lng });
      } catch (error) {
        setLoadError(error as Error);
      }
    };

    initMap();
  }, [isLoaded, markers, centerId, map]);

  if (loadError)
    return (
      <div className="h-[47.5rem] w-full">
        <Skeleton className="h-full w-full text-center">
          Encountered error while loading google maps
        </Skeleton>
      </div>
    );

  if (!isLoaded)
    return (
      <div className="h-[47.5rem] w-full">
        <Skeleton className="h-full w-full text-center">
          <p>Map is Loading ...</p>
        </Skeleton>
      </div>
    );

  return <div ref={mapRef} className="h-[47.5rem] w-full" />;
};

export default SearchMapSection;
