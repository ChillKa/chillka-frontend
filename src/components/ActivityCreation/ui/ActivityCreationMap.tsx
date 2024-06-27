'use client';

import { Input } from '@components/ui/input';
import {
  Autocomplete,
  GoogleMap,
  Libraries,
  MarkerF as Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';

// type ActivityCreationMapProps = {
//   fieldName: string;
// };

const libraries = ['places'];

const ActivityCreationMap = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
    language: 'zh-TW',
  });
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 25.033,
    lng: 121.5654,
  });
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    },
    [autoCompleteRef.current]
  );

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current) {
      const newPlace = autocompleteRef.current.getPlace();
      if (newPlace.geometry) {
        setPlace(place);
        setMapCenter({
          lat: newPlace.geometry.location!.lat(),
          lng: newPlace.geometry.location!.lng(),
        });
        setInputValue(newPlace.name || '');
      }
    }
  }, []);

  if (loadError) return <div>讀取地圖時發生錯誤</div>;

  if (!isLoaded) return <div>地圖資料圖取中</div>;
  return (
    <>
      <Autocomplete
        options={{ componentRestrictions: { country: 'tw' } }}
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <Input
          variant="form"
          type="text"
          placeholder="請輸入地址..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '47.5rem',
        }}
        center={mapCenter}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: true,
          fullscreenControl: false,
        }}
      >
        {place && <Marker position={mapCenter} />}
      </GoogleMap>
    </>
  );
};

export default ActivityCreationMap;
