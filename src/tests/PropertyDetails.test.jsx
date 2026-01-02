import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyDetails from '../components/PropertyDetails';

const mockProperties = [
  {
    id: '1',
    type: 'Apartment',
    price: 500000,
    location: 'London',
    smallDescription: 'Small desc',
    description: 'Full description',
    tenure: 'Freehold',
    bedrooms: 2,
    bathrooms: 1,
    images: ['images/img1.jpg', 'images/img2.jpg'],
    floorPlan: 'images/floorplan.jpg',
  }
];

describe('PropertyDetails ReactImageGallery', () => {
  test('renders all gallery images', () => {
    render(
      <MemoryRouter initialEntries={['/property/1']}>
        <Routes>
          <Route path="/property/:id" element={<PropertyDetails allProperties={mockProperties} />} />
        </Routes>
      </MemoryRouter>
    );

    const galleryImgs = screen.getAllByRole('img').filter(img =>
      img.classList.contains('image-gallery-image')
    );

    expect(galleryImgs.length).toBe(mockProperties[0].images.length);

    mockProperties[0].images.forEach(imgPath => {
      expect(galleryImgs.some(img => img.src.includes(imgPath))).toBe(true);
    });
  });
});
