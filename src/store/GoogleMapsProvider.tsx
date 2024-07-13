'use client';

import { Library, Loader } from '@googlemaps/js-api-loader';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | null;
  initMap: (
    mapRef: HTMLDivElement,
    options: google.maps.MapOptions
  ) => Promise<google.maps.Map>;
  createMarker: (
    map: google.maps.Map,
    position: google.maps.LatLngLiteral,
    options?: google.maps.marker.AdvancedMarkerElementOptions
  ) => Promise<google.maps.marker.AdvancedMarkerElement>;
  initAutocomplete: (
    inputElement: HTMLInputElement,
    options?: google.maps.places.AutocompleteOptions
  ) => Promise<google.maps.places.Autocomplete>;
}

const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

export const useGoogleMapsProvider = () => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error(
      'useGoogleMapsProvider must be used within a GoogleMapsProvider'
    );
  }
  return context;
};

export const GoogleMapsProvider = ({ children }: PropsWithChildren) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const loadedLibraries = useRef<Set<Library>>(new Set());

  const loader = useMemo(
    () =>
      new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: 'weekly',
        libraries: ['places', 'maps', 'marker'],
        language: 'zh-TW',
      }),
    []
  );

  const loadLibrary = useCallback(
    async (lib: Library) => {
      if (!loadedLibraries.current.has(lib)) {
        await loader.importLibrary(lib);
        loadedLibraries.current.add(lib);
      }
    },
    [loader]
  );

  const loadLibraries = useCallback(async () => {
    try {
      const libraries: Library[] = ['maps', 'places', 'marker'];
      await Promise.all(libraries.map(loadLibrary));
      setIsLoaded(true);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error
          : new Error('Failed to load Google Maps libraries')
      );
    }
  }, [loadLibrary]);

  useEffect(() => {
    loadLibraries();
  }, [loadLibraries]);

  const initMap = useCallback<GoogleMapsContextType['initMap']>(
    async (mapRef, options) => {
      const { Map: InitMap } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      return new InitMap(mapRef, options);
    },
    []
  );

  const createMarker = useCallback<GoogleMapsContextType['createMarker']>(
    async (map, position, options) => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

      return new AdvancedMarkerElement({
        map,
        position,
        ...options,
      });
    },
    []
  );

  const initAutocomplete = useCallback<
    GoogleMapsContextType['initAutocomplete']
  >(async (inputElement, options) => {
    const { Autocomplete } = (await google.maps.importLibrary(
      'places'
    )) as google.maps.PlacesLibrary;
    return new Autocomplete(inputElement, options);
  }, []);

  const contextValue = useMemo(
    () => ({ isLoaded, loadError, initMap, createMarker, initAutocomplete }),
    [isLoaded, loadError, initMap, createMarker, initAutocomplete]
  );

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
