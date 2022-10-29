import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<any[] | null>([]);
  const { userId } = useParams();

  useEffect(() => {
    const getDatasByUserId = async () => {
      try {
        const res = await fetch(`http://localhost:4000/${tab}/${userId}`);
        const data = await res.json();

        console.log(data);
        setData([data]);
      } catch (error) {
        console.log(error);
      }
    };

    getDatasByUserId();
  }, [tab, userId]);

  return (
    <div className="posts-container">
      {JSON.stringify(data)}
      {/* {data &&
        data.map(({ imageUrl }) => {
          return <img src={imageUrl} />;
        })} */}
    </div>
  );
};
