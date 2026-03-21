import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { SearchControls } from './ui/SearchControls';
import CustomBreadCrumb from '@/components/custom/CustomBreadcrumbs';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: heroes = []} = useQuery({
    queryKey: ['Search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, // 5 minutes.
  })


  return (
    <>
      <CustomJumbotron
        title="Superheroes Search"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadCrumb
        currentPage='Search superheroes'
        breadcrumbs={
          [
            { label: 'Home 1', to: '/' },
          ]
        }
      />

      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
