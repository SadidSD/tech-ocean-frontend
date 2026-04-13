'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook to persist builder selections to localStorage 
 * so state isn't lost during navigation to /select pages.
 */
export function useBuilderStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Initialize state with a function to ensure it read from ls correctly
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read from local storage only once on component mount (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading localStorage for key "${key}":`, error);
      }
    }
  }, [key]);

  // Provide a setter function that updates both state and localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
