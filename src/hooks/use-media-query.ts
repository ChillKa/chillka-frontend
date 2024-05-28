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
 *   - value: A boolean indicating whether the media query currently matches.
 *   - loading: A boolean indicating whether the media query evaluation is still in progress.
 *
 * This hook leverages the `matchMedia` API to evaluate media queries in the browser. It sets up an event listener
 * to respond to changes in the media query's evaluation status and ensures the component re-renders with the updated
 * state whenever the media query matches or stops matching.
 *
 * Features:
 * - Default media query: If no query is provided, the hook defaults to the mobile breakpoint from Tailwind CSS config.
 * - Dynamic evaluation: Re-evaluates the media query whenever the input query string changes.
 * - Cleanup: Properly removes the event listener when the component is unmounted or the query changes.
 * - Initial state: Correctly initializes the state based on the current media query match status.
 *
 * Example usage:
 *
 * const { loading, value: isMobile} = useMediaQuery('(max-width: 600px)');
 *
 * return (
 *   <div>
 *     {loading ? <p>Loading...</p> : <p>{isMobile ? 'Mobile View' : 'Desktop View'}</p>}
 *   </div>
 * );
 *
 * Example with default query:
 *
 * const { loading, value: isDefault } = useMediaQuery();
 *
 * return (
 *   <div>
 *     {loading ? <p>Loading...</p> : <p>{isDefault ? 'Mobile View' : 'Desktop View'}</p>}
 *   </div>
 * );
 */

export default function useMediaQuery(query: string = mobileBreakpoint) {
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);
    setLoading(false);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return { loading, value };
}
