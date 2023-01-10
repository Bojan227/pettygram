import { Post } from '../feed/types/feedTypes';
import { v4 as uuidv4 } from 'uuid';
import './explore.css';
import { postsData } from './postsData';

const cardSize = ['card_small', 'card_medium', 'card_large'];

export default function ExploreContainer({ posts }: { posts: Post[] }) {
  console.log(posts);
  return (
    <div className="explore-container">
      {posts.map((post, i) => {
        return (
          <div
            key={uuidv4()}
            className={`card-explore ${
              cardSize[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
            }`}
          >
            <img src={post.imageUrl} />
          </div>
        );
      })}
    </div>
  );
}
