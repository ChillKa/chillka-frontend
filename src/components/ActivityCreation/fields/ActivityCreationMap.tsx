'use client';

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import cn from '@lib/utils';
import { useGoogleMapsProvider } from '@store/GoogleMapsProvider';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

type ActivityCreationMapProps = {
  className: string;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  setAddress: (address: string) => void;
};

const ActivityCreationMap = memo(
  ({ className, setLat, setLng, setAddress }: ActivityCreationMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null
    );
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
      null
    );
    const mapInstanceRef = useRef<google.maps.Map | null>(null);

    const { isLoaded, loadError, initMap, initAutocomplete } =
      useGoogleMapsProvider();
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
      lat: 25.033,
      lng: 121.5654,
    });

    const [inputValue, setInputValue] = useState<string>('');

    const updateMarker = useCallback((position: google.maps.LatLngLiteral) => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }
      if (mapInstanceRef.current) {
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position,
        });
      }
    }, []);

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

          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter({ lat, lng });
            updateMarker({ lat, lng });
          }
        }
      }
    }, [setLat, setLng, setAddress, updateMarker]);

    useEffect(() => {
      if (!isLoaded || !mapRef.current) return;

      const initCreateLocationMap = async () => {
        const newMap = await initMap(mapRef.current!, {
          center: mapCenter,
          zoom: 15,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          fullscreenControl: false,
          mapId: 'MY_NEXTJS_MAP',
        });

        mapInstanceRef.current = newMap;

        const autocomplete = await initAutocomplete(
          document.getElementById('autocomplete') as HTMLInputElement,
          {
            componentRestrictions: { country: 'tw' },
          }
        );
        autocompleteRef.current = autocomplete;
        autocomplete.addListener('place_changed', onPlaceChanged);

        updateMarker(mapCenter);
      };

      initCreateLocationMap();
    }, [
      isLoaded,
      initMap,
      initAutocomplete,
      updateMarker,
      onPlaceChanged,
      mapCenter,
    ]);

    // Update marker when mapCenter changes
    useEffect(() => {
      if (mapInstanceRef.current && mapCenter) {
        updateMarker(mapCenter);
        mapInstanceRef.current.setCenter(mapCenter);
      }
    }, [mapCenter, updateMarker]);

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
  }
);
ActivityCreationMap.displayName = 'ActivityCreationMap';

export default ActivityCreationMap;
