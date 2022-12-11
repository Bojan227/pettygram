import fetcher from '../api/fetcher';

interface UseGetDataProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any | null>>;
}

export const useGetData = () => {
  const getData = async ({ url, setState }: UseGetDataProps) => {
    const json = await fetcher(url);
    setState(json);
  };

  return { getData };
};
