import { AdminPage } from '@/admin/pages/AdminPage';
import { HeroPage } from '@/heroes/pages/hero/pages/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
import { SearchPage } from '@/heroes/pages/search/SearchPage';
import { createBrowserRouter } from 'react-router';

export const appRouter = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'heroes/1',
    element: <HeroPage />
  },
  {
    path: '/search',
    element: <SearchPage />
  }
]);
