import { useEffect, useRef } from 'react';
import './explore.css';
import { v4 as uuidv4 } from 'uuid';

import ExploreCard from './ExploreCard';
import { usePostsStore } from '../../store/postsStore';

export default function ExploreContainer() {
  const { posts } = usePostsStore();
  const refToTop = useRef<HTMLInputElement>(null);
  useEffect(() => {
    refToTop.current && refToTop.current.scrollIntoView({ behavior: 'smooth' });
  });
  return (
    <div ref={refToTop} className="explore-container">
      {posts.map((post) => (
        <ExploreCard key={uuidv4()} {...{ ...post }} />
      ))}
    </div>
  );
}
