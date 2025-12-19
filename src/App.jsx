import { useState, useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'

function App() {

  const [allProperties, setAllProperties] = useState([]);
  const [results, setResults] = useState([]);

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
      filtered = filtered.filter(p => p.minPrice >= selectedFilters.minPrice);
    }
    if (selectedFilters.maxPrice) {
      filtered = filtered.filter(p => p.maxPrice <= selectedFilters.maxPrice);
    }
    if (selectedFilters.minBedrooms) {
      filtered = filtered.filter(p => p.minBedrooms >= selectedFilters.minBedrooms);
    }
    if (selectedFilters.maxBedrooms) {
      filtered = filtered.filter(p => p.maxBedrooms <= selectedFilters.maxBedrooms);
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

  return (
    <>
      <SearchForm/>
    </>
  )
}

export default App
