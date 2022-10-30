import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PostsContainer = ({ tab }: { tab: string }) => {
  const [data, setData] = useState<any[] | null>([]);
  const { userId } = useParams();

  useEffect(() => {
    const getDataByUserId = async () => {
      try {
        const res = await fetch(`http://localhost:4000/${tab}/${userId}`);
        const data = await res.json();

        setData([...data]);
      } catch (error) {
        console.log(error);
      }
    };

    getDataByUserId();
  }, [tab, userId]);

  return (
    <div className="posts-container">
      {data?.length === 0 && tab !== 'saved' && <h1>Create your first post</h1>}
      {data?.length === 0 && tab === 'saved' && (
        <h1>You haven't saved any post</h1>
      )}

      {data &&
        data.map(({ imageUrl }, i) => {
          return <img key={i} src={imageUrl} />;
        })}
    </div>
  );
};
