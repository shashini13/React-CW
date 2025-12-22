import { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import Favourites from './components/Favourites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [allProperties, setAllProperties] = useState([]);
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/properties.json')
    .then((res) => {
        if (!res.ok) throw new Error("Failed to load properties")
        return res.json();
    })
    .then((data) => {
      setAllProperties(data.properties)
      setResults(data.properties)
      setLoading(false)
    })
      .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
  }, [])

  if(loading) return <p>Loading properties...</p>
  if(error) return <p>Error: {error}</p>

        
  const filtering = (selectedFilters) => {
    let filtered = allProperties;

    if (selectedFilters.type && selectedFilters.type != "Any") {
      filtered = filtered.filter(p => p.type === selectedFilters.type);
    }
    if (selectedFilters.minPrice) {
      filtered = filtered.filter(p => p.price >= selectedFilters.minPrice);
    }
    if (selectedFilters.maxPrice) {
      filtered = filtered.filter(p => p.price <= selectedFilters.maxPrice);
    }
    if (selectedFilters.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= selectedFilters.minBedrooms);
    }
    if (selectedFilters.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= selectedFilters.maxBedrooms);
    }
    if (selectedFilters.dateAdded) {
      filtered = filtered.filter(p => {
        const propertyDate = new Date(
          `${p.added.year}-${p.added.month}-${p.added.day}`
        );
        return propertyDate > selectedFilters.dateAdded
      });
    }
    if (selectedFilters.postcode) {
      filtered = filtered.filter(p => p.postcode.toUpperCase().startsWith(selectedFilters.postcode.toUpperCase()));
    }
            
    setResults(filtered);
  }; 
  
  const addFavourite = (property) => {
    if (!favourites.some(p => p.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(p => p.id !==id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <SearchForm onSearch={filtering}/>
              <Favourites 
              favouriteProperties={favourites} 
              removeFavourite={removeFavourite} 
              clearFavourites={clearFavourites}
              addFavourite={addFavourite}
              />
              <PropertyList results={results} onFavourite={addFavourite}/>
            </>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
