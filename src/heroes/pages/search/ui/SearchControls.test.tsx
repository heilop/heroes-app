import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchControls } from './SearchControls';
import { MemoryRouter } from 'react-router';

if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    disconnect() {}
    observe() {}
    unobserve() {}
  }

  window.ResizeObserver = ResizeObserver;
}

const renderControlsWithRouter = (initialEntries: string[] = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchControls />
    </MemoryRouter>,
  );
};

describe('SearchControls', () => {
  test('should render SearchControls with default values', () => {
    const { container } = renderControlsWithRouter();

    expect(container).toMatchSnapshot();
  });

  test('should set the input value when search param is set', () => {
    renderControlsWithRouter(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...',
    );

    expect(input.getAttribute('value')).toBe('Batman');
  });

  test('should change params when the input is changed and enter is pressed', () => {
    renderControlsWithRouter(['/?name=Batman']);

    const input = screen.getByPlaceholderText(
      'Search heroes, villains, powers, teams...',
    );
    expect(input.getAttribute('value')).toBe('Batman');

    fireEvent.change(input, { target: { value: 'Superman' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.getAttribute('value')).toBe('Superman');
  });

  test('should change params strength when slider is changed', () => {
    renderControlsWithRouter([
      '/?name=Batman&active-accordion=advanced-filters',
    ]);

    const slider = screen.getByRole('slider');
    expect(slider.getAttribute('aria-valuenow')).toBe('0');

    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(slider.getAttribute('aria-valuenow')).toBe('1');
  });

  test('should accordion be open when active-accordion param is set', () => {
    renderControlsWithRouter([
      '/?name=Batman&active-accordion=advanced-filters',
    ]);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('open');
  });

  test('should accordion be closed when active-accordion param is not set', () => {
    renderControlsWithRouter(['/?name=Batman']);

    const accordion = screen.getByTestId('accordion');
    const accordionItem = accordion.querySelector('div');

    expect(accordionItem?.getAttribute('data-state')).toBe('closed');
  });
});
