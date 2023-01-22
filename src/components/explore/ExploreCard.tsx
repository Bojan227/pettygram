const cardSize = ['card_small', 'card_medium', 'card_large'];
import { Link } from 'react-router-dom';

export default function ExploreCard({
  imageUrl,
  _id,
}: {
  imageUrl: string[];
  _id: string;
}) {
  return (
    <div
      className={`card-explore ${
        cardSize[Math.floor(Math.random() * (2 - 0 + 1) + 0)]
      }`}
    >
      <Link to={`/p/${_id}`}>
        <img src={imageUrl[0]} />
      </Link>
    </div>
  );
}
