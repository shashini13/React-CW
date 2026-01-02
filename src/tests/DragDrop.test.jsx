import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          properties: [mockProperty]
        })
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
    data: {},
    setData(type, val) {
      this.data[type] = val;
    },
    getData(type) {
      return this.data[type];
    }
  };

  fireEvent.dragStart(propertyCard.closest(".property-card"), {
    dataTransfer
  });

  const favouritesSection = document.getElementById("favourites");

  fireEvent.dragOver(favouritesSection);
  fireEvent.drop(favouritesSection, {
    dataTransfer
  });

  await waitFor(() => {
    expect(screen.getByText(/House - £250,000/i)).toBeInTheDocument();
  });
});
