import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../components/PropertyCard';
import { MemoryRouter } from 'react-router-dom';

const mockProperty = {
  id: '1',
  type: 'Apartment',
  price: 500000,
  location: 'London',
  images: ['images/img1.jpg']
};

describe('PropertyCard Favourites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('adds and removes property from favourites in localStorage', () => {
    const onFavourite = (property) => {
      const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
      const exists = favourites.some(p => p.id === property.id);
      if (!exists) {
        favourites.push(property);
      } else {
        const index = favourites.findIndex(p => p.id === property.id);
        favourites.splice(index, 1);
      }
      localStorage.setItem('favourites', JSON.stringify(favourites));
    };

    render(
      <MemoryRouter>
        <PropertyCard p={mockProperty} onFavourite={onFavourite} />
      </MemoryRouter>
    );

    const favButton = screen.getByRole('button', { name: /add to favourite/i });

    expect(localStorage.getItem('favourites')).toBeNull();

    fireEvent.click(favButton);
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    expect(favourites.length).toBe(1);
    expect(favourites[0].id).toBe(mockProperty.id);

    fireEvent.click(favButton);
    favourites = JSON.parse(localStorage.getItem('favourites'));
    expect(favourites.length).toBe(0);
  });
});
