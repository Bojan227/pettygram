import { useEffect, useState } from 'react';
import useUserContenxt from '../../hooks/useUserContext';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<any[] | null>([]);
  const userContext = useUserContenxt();

  useEffect(() => {
    const getDatasByUserId = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/${tab}/${userContext?.user._id}`
        );

        const data = await res.json();

        console.log(data);
        setData([...data]);
      } catch (error) {
        console.log(error);
      }
    };

    getDatasByUserId();
  }, [tab]);

  return (
    <div className="posts-container">
      {data &&
        data.map(({ imageUrl }) => {
          return <img src={imageUrl} />;
        })}
    </div>
  );
};
