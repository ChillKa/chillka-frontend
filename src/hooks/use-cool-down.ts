import { useCallback, useEffect, useState } from 'react';

/**
 * A custom hook that manages a cooldown timer. The cooldown state is saved in localStorage,
 * allowing the timer to persist across page reloads.
 *
 * @param {number} initialCooldown - The initial cooldown period in seconds.
 * @param {string} storageKey - The key under which the cooldown timer is stored in localStorage.
 * @returns {Object} An object containing the current cooldown seconds and a function to start the cooldown.
 * @returns {number} cooldownSeconds - The current number of seconds remaining in the cooldown.
 * @returns {function} startCooldown - A function to start the cooldown with a specified number of seconds.
 *
 * @example
 * const { cooldownSeconds, startCooldown } = useCooldown(0, 'forgotPasswordCooldown');
 * startCooldown(300); // Start a cooldown of 300 seconds
 */

const useCooldown = (storageKey: string, initialCooldown: number = 0) => {
  const isBrowser = typeof window !== 'undefined';

  const getInitialCooldown = useCallback(() => {
    if (isBrowser) {
      const savedCooldown = localStorage.getItem(storageKey);
      return savedCooldown ? parseInt(savedCooldown, 10) : initialCooldown;
    }
    return initialCooldown;
  }, [isBrowser, storageKey, initialCooldown]);

  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (isBrowser) {
      const savedCooldown = getInitialCooldown();
      setCooldownSeconds(savedCooldown);
      setInitialized(true);
    }
  }, [isBrowser, getInitialCooldown]);

  useEffect(() => {
    if (!isBrowser || !initialized || cooldownSeconds <= 0) return;
    if (cooldownSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownSeconds((prevCooldownSeconds) => {
          const newCooldownSeconds = prevCooldownSeconds - 1;
          localStorage.setItem(storageKey, newCooldownSeconds.toString());
          return newCooldownSeconds;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    localStorage.removeItem(storageKey);
    return () => {};
  }, [cooldownSeconds, storageKey, isBrowser, initialized]);

  const startCooldown = (seconds: number) => {
    setCooldownSeconds(seconds);
    localStorage.setItem(storageKey, seconds.toString());
  };

  return { cooldownSeconds, startCooldown };
};

export default useCooldown;
