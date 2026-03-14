import { useQuery } from '@tanstack/react-query';
import { getHeroresByPageAction } from '../actions/get-heroes-by-page.action';

export const usePaginationHero = (limit: number, page: number, category: string = 'all') => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroresByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5,
  });
};
