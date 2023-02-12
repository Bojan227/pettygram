import { useState } from 'react';
import fetcher from '../api/fetcher';

interface UseGetDataProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any | null>>;
  options?: RequestInit;
}

export const useGetData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getData = async ({ url, setState, options }: UseGetDataProps) => {
    setIsLoading(true);
    const json = await fetcher(url, options);
    if (json) {
      setIsLoading(false);
    }
    setState(json);
  };

  return { getData, isLoading };
};
