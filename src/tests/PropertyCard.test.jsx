import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { vi, describe, it, expect } from 'vitest';

describe('PropertyCard', () => {
  //Test1
  it("calls onFavourite function when Add to Favourite button is clicked", () => {
    const testOnFavourite = vi.fn()
    const property = { id: 1, title: 'Flat', price: 250000 }

    render(
      <MemoryRouter>
        <PropertyCard p={property} onFavourite={testOnFavourite} />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /add to favourites/i })
    fireEvent.click(button)

    expect(testOnFavourite).toHaveBeenCalledTimes(1)
    expect(testOnFavourite).toHaveBeenCalledWith(property)
  });
})
