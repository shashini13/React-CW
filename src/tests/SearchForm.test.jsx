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
});
