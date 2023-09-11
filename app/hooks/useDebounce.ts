import { useEffect, useState } from "react";

function useDebounce<T>(keyword: T, delay?: number): T {
  const [debouncedKeyword, setDebouncedKeyword] = useState<T>(keyword);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), delay || 800);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword, delay]);

  return debouncedKeyword;
}

export default useDebounce;
