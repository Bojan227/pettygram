import { useEffect, useState } from 'react';
import fetcher from '../../api/fetcher';

export default function FactContainer() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const getFact = async () => {
      try {
        const fact = await fetcher('https://cat-fact.herokuapp.com/facts');
        const factLength = fact.length;
        const randomFactNum = Math.floor(
          Math.random() * (factLength - 0 + 1) + 0
        );
        setFact(fact[randomFactNum].text);
      } catch (error) {}
    };

    getFact();
  }, []);

  return (
    <div className="fact-container">
      <h1>Fact of the Day</h1>
      <p>"{fact}"</p>
    </div>
  );
}
