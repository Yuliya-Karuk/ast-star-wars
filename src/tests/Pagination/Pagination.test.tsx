import { Pagination } from '@/components';
import { renderWithRouter } from '@/testSetup/render-router';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as ReactRouterDom from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async importOriginal => {
  const actual = (await importOriginal()) as typeof ReactRouterDom;
  return {
    ...actual,
    MemoryRouter: actual.MemoryRouter,
    useSearchParams: () => [new URLSearchParams('?page=1'), mockSetSearchParams],
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('disables previous and first buttons on the first page', () => {
    renderWithRouter(<Pagination currentPage={1} totalPages={10} />, {
      route: '/?page=1',
    });

    const firstPageButton = screen.getByRole('button', { name: /First/i });
    const previousPageButton = screen.getByRole('button', { name: /Previous/i });

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
  });

  it('disables next and last buttons on the last page', () => {
    renderWithRouter(<Pagination currentPage={10} totalPages={10} />, {
      route: '/?page=10',
    });

    const nextPageButton = screen.getByRole('button', { name: /Next/i });
    const lastPageButton = screen.getByRole('button', { name: /Last/i });

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('updates URL query parameter when next button is clicked', async () => {
    renderWithRouter(<Pagination currentPage={1} totalPages={10} />, {
      route: '/?page=1',
    });

    const nextPageButton = await screen.findByRole('button', { name: /Next/i });

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams({ page: '2' }));
  });

  it('updates URL query parameter when specific page button is clicked', async () => {
    renderWithRouter(<Pagination currentPage={1} totalPages={10} />, {
      route: '/?page=1',
    });

    const pageButton = screen.getByText('3');
    const user = userEvent.setup();
    await user.click(pageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams({ page: '3' }));
  });
});
