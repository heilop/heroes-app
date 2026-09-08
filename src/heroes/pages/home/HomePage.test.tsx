import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoriteHeroProvider } from '@/heroes/context/FavoriteHeroContext';

vi.mock('@/heroes/hooks/usePaginationHero');

const mockUsePaginatedHero = vi.mocked(usePaginationHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,

} as unknown as ReturnType<typeof usePaginationHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>
  );
};

describe('HomePage', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render HomePage with default values', () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test('should call usePaginationHero with default values', () => {
    renderHomePage();
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, 'all');
  });

  test('should call usePaginationHero with custom query params', () => {
    renderHomePage(['/?page=2&limit=10&category=heroes']);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, 'heroes');
  });

  test('should called use usePaginationHero with default page same limit on tab', () => {
    renderHomePage(['/?tab=favorites&page=2&limit=10']);

    const [ , , , villainsTab ] = screen.getAllByRole('tab');

    fireEvent.click(villainsTab)
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, 'villain');
  });
});
