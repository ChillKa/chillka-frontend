'use client';

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import cn from '@lib/utils';
import { useGoogleMapsProvider } from '@store/GoogleMapsProvider';
import { useCallback, useEffect, useRef, useState } from 'react';

type ActivityCreationMapProps = {
  className: string;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setAddress: (address: string) => void;
};

const ActivityCreationMap = ({
  className,
  setLat,
  setLng,
  setAddress,
}: ActivityCreationMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );

  const { isLoaded, loadError } = useGoogleMapsProvider();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 25.033,
    lng: 121.5654,
  });

  const [inputValue, setInputValue] = useState<string>('');

  const updateMarker = useCallback(
    (currentMap: google.maps.Map, position: google.maps.LatLngLiteral) => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: currentMap,
        position,
      });
    },
    []
  );

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const newPlace = autocompleteRef.current.getPlace();
      if (newPlace.geometry?.location) {
        const lat = newPlace.geometry.location.lat();
        const lng = newPlace.geometry.location.lng();
        const address = newPlace.formatted_address || newPlace.name || '';
        setMapCenter({ lat, lng });
        setInputValue(address);

        setLat(lat);
        setLng(lng);
        setAddress(address);

        if (map) {
          map.setCenter({ lat, lng });
          updateMarker(map, { lat, lng });
        }
      }
    }
  }, [setLat, setLng, setAddress, map, updateMarker]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const initMap = async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const { Autocomplete } = (await google.maps.importLibrary(
        'places'
      )) as google.maps.PlacesLibrary;

      const newMap = new Map(mapRef.current!, {
        center: mapCenter,
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false,
        zoomControl: true,
        fullscreenControl: false,
        mapId: 'MY_NEXTJS_MAP',
      });

      setMap(newMap);

      const autocomplete = new Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement,
        {
          componentRestrictions: { country: 'tw' },
        }
      );

      autocompleteRef.current = autocomplete;

      autocomplete.addListener('place_changed', onPlaceChanged);

      updateMarker(newMap, mapCenter);
    };

    initMap();
  }, [isLoaded, mapCenter]);

  // Update marker when mapCenter changes
  useEffect(() => {
    if (map && mapCenter) {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: mapCenter,
      });
      map.setCenter(mapCenter);
    }
  }, [map, mapCenter]);

  if (loadError) return <div>讀取地圖時發生錯誤</div>;

  if (!isLoaded) return <div>地圖資料圖取中</div>;

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label>活動地址</Label>
      <Input
        id="autocomplete"
        variant="form"
        type="text"
        placeholder="請輸入地址..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
      <div ref={mapRef} style={{ width: '100%', height: '47.5rem' }} />
    </div>
  );
};

export default ActivityCreationMap;
