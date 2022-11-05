interface UseGetDataProps {
  url: string;
  setState: React.Dispatch<React.SetStateAction<any | null>>;
}

//not implemented
export const useGetData = () => {
  const getData = async ({ url, setState }: UseGetDataProps) => {
    const res = await fetch(url);
    const json = await res.json();

    setState(json);
  };

  return { getData };
};
