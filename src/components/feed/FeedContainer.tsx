import { PostCard } from './PostCard';
import './feed.css';
export const FeedContainer = () => {
  return (
    <main className="feed-container">
      <PostCard
        createdBy="Bojan"
        images={[
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZUhrVvRO5b9Y3KbnTS8Q9oLaernjYa7l0HM0EReOxfw&s',
        ]}
        likes={0}
        description="Buffalo New York"
        createdAt="18/09/2022"
      />
      <PostCard
        createdBy="irena"
        images={[
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZUhrVvRO5b9Y3KbnTS8Q9oLaernjYa7l0HM0EReOxfw&s',
        ]}
        likes={0}
        description="Buffalo New York"
        createdAt="18/09/2022"
      />
    </main>
  );
};
