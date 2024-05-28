import { useEffect, useState } from 'react';
import tailwindConfig from 'tailwind.config';

const mobileBreakpoint = `(max-width: ${tailwindConfig.theme.screens.xl || '768px'})`;

/**
 * useMediaQuery
 *
 * A custom React hook that monitors the status of a given CSS media query and updates the component state accordingly.
 *
 * @param query - A string representing the media query to evaluate. Defaults to the mobile breakpoint defined in Tailwind CSS config, or '(max-width: 768px)' if not provided.
 * @returns An object containing:
 *   - matches: A boolean indicating whether the media query currently matches.
 *
 * This hook leverages the `matchMedia` API to evaluate media queries in the browser. It sets up an event listener
 * to respond to changes in the media query's evaluation status and ensures the component re-renders with the updated
 * state whenever the media query matches or stops matching.
 *
 * Features:
 * - Default media query: If no query is provided, the hook defaults to the mobile breakpoint from Tailwind CSS config.
 * - Dynamic evaluation: Re-evaluates the media query whenever the input query string changes.
 * - Cleanup: Properly removes the event listener when the component is unmounted or the query changes.
 *
 * Example usage:
 *
 * const { matches: isMobile } = useMediaQuery('(max-width: 600px)');
 *
 * return (
 *   <div>
 *     <p>{isMobile ? 'Mobile View' : 'Desktop View'}</p>
 *   </div>
 * );
 *
 * Example with default query:
 *
 * const { matches: isDefault } = useMediaQuery();
 *
 * return (
 *   <div>
 *     <p>{isDefault ? 'Desktop View' : 'Mobile View'}</p>
 *   </div>
 * );
 */
export default function useMediaQuery(query: string = mobileBreakpoint) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = matchMedia(query);

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mediaQueryList.addEventListener('change', onChange);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener('change', onChange);
  }, [query]);

  return { matches };
}
