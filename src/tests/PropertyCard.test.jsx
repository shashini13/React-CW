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

  //Test2
  it ("remove property from favourites when remove button is clicked", () => {
    const testRemoveFavourite = vi.fn()
    const property = { id: 2, title: 'House', price: 399000 }

    render(
      <MemoryRouter>
        <PropertyCard p={property} onFavourite={testRemoveFavourite} isFavourite={true} />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(button)

    expect(testRemoveFavourite).toHaveBeenCalledTimes(1)
    expect(testRemoveFavourite).toHaveBeenCalledWith(property)
  });

  //Test3
  it('renders the View Details button with correct link', () => {
    const property = {
      id: 1,
      type: 'Flat',
      price: 250000,
      location: 'London',
      bedrooms: 2,
      smallDescription: 'Nice flat',
      url: '/property/1',
      picture: 'flat.jpg'
    };

    render(
      <MemoryRouter>
        <PropertyCard p={property} onFavourite={() => {}} />
      </MemoryRouter>
    );

    // Check that the button exists
    const button = screen.getByRole('button', { name: /view details/i });
    expect(button).toBeInTheDocument();

    // Check that it's wrapped in a Link with correct `to` prop
    const link = button.closest('a'); // find the parent anchor tag
    expect(link).toHaveAttribute('href', property.url);
  });
})
