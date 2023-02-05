import { useState } from 'react';
import fetcher from '../api/fetcher';

interface UseGetDataProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any | null>>;
}

export const useGetData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getData = async ({ url, setState }: UseGetDataProps) => {
    setIsLoading(true);
    const json = await fetcher(url);
    if (json) {
      setIsLoading(false);
    }
    setState(json);
  };

  return { getData, isLoading };
};
