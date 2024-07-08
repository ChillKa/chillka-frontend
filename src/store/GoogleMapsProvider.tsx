'use client';

import { Loader } from '@googlemaps/js-api-loader';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | null;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: null,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

export const GoogleMapsProvider = ({ children }: PropsWithChildren) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
      version: 'weekly',
      libraries: ['places'],
      language: 'zh-TW',
    });

    const loadLibraries = async () => {
      try {
        await loader.importLibrary('maps');
        await loader.importLibrary('places');

        setIsLoaded(true);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error
            : new Error('Failed to load Google Maps libraries')
        );
      }
    };

    loadLibraries();
  }, []);

  const contextValue = useMemo(
    () => ({ isLoaded, loadError }),
    [isLoaded, loadError]
  );

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
