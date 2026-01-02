import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchForm Component', () => {
  let onSearchMock;

  beforeEach(() => {
    onSearchMock = vi.fn();
    render(<SearchForm onSearch={onSearchMock} />);
  });

  test('filters properties using normal search (type only)', async () => {
    const user = userEvent.setup();

    const typeSelect = screen.getAllByRole('combobox')[0];

    fireEvent.focus(typeSelect);
    fireEvent.change(typeSelect, { target: { value: 'Flat' } });
    fireEvent.keyDown(typeSelect, { key: 'Enter', code: 'Enter' });

    const submitButton = screen.getByRole('button', { name: /search/i });
    await user.click(submitButton);

    expect(onSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Flat'
      })
    );
  });

  test('filters properties using multiple filters (type + price range)', async () => {
    const user = userEvent.setup();

    const typeSelect = screen.getAllByRole('combobox')[0];
    const minPriceSelect = screen.getAllByRole('combobox')[1];
    const maxPriceSelect = screen.getAllByRole('combobox')[2];

    fireEvent.focus(typeSelect);
    fireEvent.change(typeSelect, { target: { value: 'House' } });
    fireEvent.keyDown(typeSelect, { key: 'Enter', code: 'Enter' });

    fireEvent.focus(minPriceSelect);
    fireEvent.change(minPriceSelect, { target: { value: 200000 } });
    fireEvent.keyDown(minPriceSelect, { key: 'Enter', code: 'Enter' });

    fireEvent.focus(maxPriceSelect);
    fireEvent.change(maxPriceSelect, { target: { value: 500000 } });
    fireEvent.keyDown(maxPriceSelect, { key: 'Enter', code: 'Enter' });

    const submitButton = screen.getByRole('button', { name: /search/i });
    await user.click(submitButton);

    expect(onSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'House',
        minPrice: 200000,
        maxPrice: 500000
      })
    );
  });
});
