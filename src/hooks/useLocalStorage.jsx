import { useEffect, useRef, useState } from 'react';

function useLocalStorage (key) {
  // eslint-disable-next-line no-undef
  const v = useRef(localStorage.getItem(key));
  // eslint-disable-next-line no-undef
  const [value, setValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    const handleStorageChange = () => {
      // eslint-disable-next-line no-undef
      setValue(localStorage.getItem(key));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return value;
}

export default useLocalStorage;
