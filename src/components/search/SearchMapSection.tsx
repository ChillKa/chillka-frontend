'use client';

import { Skeleton } from '@components/ui/skeleton';
import cn from '@lib/utils';
import { useGoogleMapsProvider } from '@store/GoogleMapsProvider';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const { isLoaded, loadError, initMap, createMarker } =
    useGoogleMapsProvider();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const createMarkerElement = useCallback(
    (marker: MarkerPosition, isCentered: boolean) => {
      const element = document.createElement('div');
      element.className = cn(
        'flex h-10 w-20 items-center justify-center rounded-full border shadow-lg',
        isCentered ? 'bg-primary text-white' : 'bg-surface'
      );
      element.innerHTML = `<p class="text-sm font-bold">${
        marker.pricing === 0 ? '免費' : `NT$${marker.pricing}`
      }</p>`;
      return element;
    },
    []
  );

  const initSearchMap = useCallback(async () => {
    if (!isLoaded || !mapRef.current) return;

    try {
      const validMarkers = markers.filter(
        (marker) =>
          typeof marker.lat === 'number' &&
          !Number.isNaN(marker.lat) &&
          typeof marker.lng === 'number' &&
          !Number.isNaN(marker.lng)
      );

      if (validMarkers.length === 0) {
        console.warn('No valid markers found');
        return;
      }

      let centerMarker = validMarkers.find((el) => el.id === centerId);
      if (!centerMarker) {
        console.warn('No valid center marker found, using first valid marker');
        [centerMarker] = validMarkers;
      }

      const mapOptions: google.maps.MapOptions = {
        center: { lat: centerMarker.lat, lng: centerMarker.lng },
        zoom: 16,
        mapId: 'MY_NEXTJS_MAP',
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: false,
      };

      const newMap = map ?? (await initMap(mapRef.current, mapOptions));
      newMap.setOptions(mapOptions);
      if (!map) setMap(newMap);

      // Clear existing markers
      markersRef.current.forEach((marker) => {
        // eslint-disable-next-line no-param-reassign
        marker.map = null;
      });
      markersRef.current = [];

      // Create new markers
      const markerPromises = validMarkers.map((marker) => {
        return createMarker(
          newMap,
          { lat: marker.lat, lng: marker.lng },
          {
            content: createMarkerElement(marker, marker.id === centerId),
          }
        );
      });
      markersRef.current = await Promise.all(markerPromises);

      newMap.setCenter({ lat: centerMarker.lat, lng: centerMarker.lng });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [
    isLoaded,
    markers,
    map,
    initMap,
    centerId,
    createMarker,
    createMarkerElement,
  ]);

  useEffect(() => {
    initSearchMap();

    return () => {
      markersRef.current.forEach((marker) => {
        // eslint-disable-next-line no-param-reassign
        marker.map = null;
      });
      markersRef.current = [];
    };
  }, [initSearchMap]);

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
