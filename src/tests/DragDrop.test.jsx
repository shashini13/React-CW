import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, expect, describe, test, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from "../App";

const mockProperty = {
  id: 1,
  type: "House",
  price: 250000,
  location: "London",
  bedrooms: 3,
  picture: "test.jpg",
  smallDescription: "Nice house",
  url: "/properties/1.html",
  postcode: "SW1A",
  added: { year: 2023, month: 5, day: 1 }
};

describe("Drag and Drop Functionality", () => {
  
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ properties: [mockProperty] })
      })
    );
  });

  test("adds property to favourites when dragged and dropped", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const propertyCard = await screen.findByText(/House - £250,000/i);
    
    const dataTransfer = {
      data: { 'application/JSON': JSON.stringify(mockProperty) },
      setData(type, val) { this.data[type] = val; },
      getData(type) { return this.data[type]; }
    };

    fireEvent.dragStart(propertyCard.closest(".property-card"), { dataTransfer });

    const addZone = screen.getByTestId('add-zone-desktop');
    
    fireEvent.dragOver(addZone);
    fireEvent.drop(addZone, { dataTransfer });

    await waitFor(() => {
      const favList = screen.getByTestId('favourites-list-desktop');
      expect(within(favList).getByText(/£250,000/i)).toBeInTheDocument();
    });
  });

  test("removes property from favourites when dragged to the remove zone", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><App /></MemoryRouter>);

    const addBtn = await screen.findByRole('button', { name: /add to favourite/i });
    await user.click(addBtn);

    const favList = screen.getByTestId('favourites-list-desktop');
    const cardInFavs = within(favList).getByText(/House - £250,000/i);

    const dataTransfer = {
      data: { 'application/JSON': JSON.stringify(mockProperty) },
      setData(type, val) { this.data[type] = val; },
      getData(type) { return this.data[type]; }
    };

    const removeZone = screen.getByTestId('remove-zone');
    fireEvent.dragStart(cardInFavs.closest(".property-card"), { dataTransfer });
    fireEvent.dragOver(removeZone);
    fireEvent.drop(removeZone, { dataTransfer });

    await waitFor(() => {
      const addZone = screen.getByTestId('add-zone-desktop');
      expect(within(addZone).getByText(/Drag here to add to favourites/i)).toBeInTheDocument();
    });
  });
});