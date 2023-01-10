import { Post } from '../feed/types/feedTypes';
import './explore.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import ExploreCard from './ExploreCard';

export default function ExploreContainer({ posts }: { posts: Post[] }) {
  return (
    <div className="explore-container">
      {posts.map((post) => (
        <ExploreCard key={uuidv4()} {...{ ...post }} />
      ))}
    </div>
  );
}
