import { useEffect, useState } from 'react';
import fetcher from '../../api/fetcher';
import { url } from '../../constants/api';
import parse from 'html-react-parser';

export default function RecipeModal({
  isRecipeModalOpen,
}: {
  isRecipeModalOpen: boolean;
}) {
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      const recipe = await fetcher(`${url}/recipe`);
      setRecipe(recipe);
    };

    getRecipe();
  }, []);

  return (
    <div className={`recipe-modal ${isRecipeModalOpen ? 'active' : ''}`}>
      {parse(recipe)}
    </div>
  );
}
