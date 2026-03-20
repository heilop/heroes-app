import { heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Option {
  category?: string;
  name?: string;
  team?: string;
  status?: string;
  strength?: string;
  universe?: string;
}

export const searchHeroesAction = async (options: Option = {}) => {
  const { category, name, team, status, strength, universe } = options;

  if (!category && !name && !team && !status && !strength && !universe) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: {
      category,
      name,
      team,
      status,
      strength,
      universe,
    }
  });


  return data.map(hero => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
}
