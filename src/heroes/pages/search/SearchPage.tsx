import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { SearchControls } from './ui/SearchControls';

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Superheroes Search"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <SearchControls />
    </>
  );
};

export default SearchPage;
