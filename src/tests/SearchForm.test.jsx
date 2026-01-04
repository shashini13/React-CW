import { render, screen } from '@testing-library/react';
import SearchForm from '../components/SearchForm';
import { vi, expect, describe, test, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('SearchForm Component', () => {
  let onSearchMock;

  beforeEach(() => {
    onSearchMock = vi.fn();
  });

  //Test1: Normal Search 
  test('filters properties using normal search (type only)', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearchMock} />);

    const typeContainer = screen.getByTestId('type-select');
    const typeInput = typeContainer.querySelector('input');
    await user.type(typeInput, 'Flat{enter}');

    const submitButton = screen.getByRole('button', { name: /search/i });
    await user.click(submitButton);

    expect(onSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'Flat',
      })
    );
  });

  //Test2: Multiple Filters
  test('filters properties using multiple filters (type, price, and postcode)', async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={onSearchMock} />);

    const typeContainer = screen.getByTestId('type-select');
    const typeInput = typeContainer.querySelector('input');
    await user.type(typeInput, 'House{enter}');

    const minPriceContainer = screen.getByTestId('min-price-select');
    const minPriceInput = minPriceContainer.querySelector('input');
    await user.type(minPriceInput, '200 000{enter}');

    const maxPriceContainer = screen.getByTestId('max-price-select');
    const maxPriceInput = maxPriceContainer.querySelector('input');
    await user.type(maxPriceInput, '500 000{enter}');

    const postcodeInput = screen.getByTestId('postcode-input');
    await user.type(postcodeInput, 'br5');

    const submitButton = screen.getByRole('button', { name: /search/i });
    await user.click(submitButton);

    expect(onSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'House',
        minPrice: 200000,
        maxPrice: 500000,
        postcode: 'BR5'
      })
    );
  });
});