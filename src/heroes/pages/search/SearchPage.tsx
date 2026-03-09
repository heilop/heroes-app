import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { SearchControls } from './ui/SearchControls';
import CustomBreadCrumb from '@/components/custom/CustomBreadcrumbs';

export const SearchPage = () => {
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
            { label: 'Home 2', to: '/' },
            { label: 'Home 3', to: '/' },
          ]
        }
      />

      <SearchControls />
    </>
  );
};

export default SearchPage;
