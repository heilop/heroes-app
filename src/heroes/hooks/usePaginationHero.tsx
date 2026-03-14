import { useQuery } from '@tanstack/react-query';
import { getHeroresByPageAction } from '../actions/get-heroes-by-page.action';

export const usePaginationHero = (limit: number, page: number) => {
  return useQuery({
    queryKey: ['heroes', { limit, page }],
    queryFn: () => getHeroresByPageAction(page, limit),
    staleTime: 1000 * 60 * 5,
  });
};
