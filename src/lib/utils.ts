import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Callback<T extends any[], R> = (...args: T) => Promise<R>;
/**
 * Creates a debounced version of the provided async callback function.
 *
 * @template T - The type of the callback arguments.
 * @template R - The type of the callback return value.
 * @param {Callback<T, R>} callback - The async function to be debounced.
 * @param {number} delay - The delay in milliseconds for debouncing.
 * @returns {Callback<T, R>} - The debounced version of the async callback function.
 */
export const createDebounce = <T extends any[], R>(
  callback: Callback<T, R>,
  delay: number
): Callback<T, R> => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debouncedCallback: Callback<T, R> = (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    return new Promise<R>((resolve, reject) => {
      timeout = setTimeout(() => {
        timeout = null;
        callback(...args)
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };

  return debouncedCallback;
};

export const formatBytes = (
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) => {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
};

export default cn;
