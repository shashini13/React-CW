import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const SearchForm = () => {
    const [type, setType] = useState("Any");

    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const [minBedrooms, setMinBedrooms] = useState(null);
    const [maxBedrooms, setMaxBedrooms] = useState(null);

    const [dateAdded, setDateAdded] = useState(null);
    const [postcode, setPostcode] = useState("");

    const [filters, setFilters] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateAdded, postcode});
    }

    return (
        <form>
            <label>Property Type</label>
            <Select 
                options={[ 
                    {value: "Any", label:"Any"}, 
                    {value: "House", label:"House"}, 
                    {value: "Flat", label:"Flat"}
                ]}
                onChange={(selected) => setType(selected.value)}
                placeholder="Select type..."
            />   

            <label>Minimum Price (£)</label> 
            <Select
                options={[
                    {value: 100000, label: "100 000"},
                    {value: 200000, label: "200 000"},
                    {value: 300000, label: "300 000"},
                    {value: 400000, label: "400 000"},
                ]}
                onChange={(selected) => setMinPrice(selected.value)}
                placeholder="Min price"
            /> 

            <label>Maximum Price (£)</label> 
            <Select
                options={[
                    {value: 400000, label: "400 000"},
                    {value: 500000, label: "500 000"},
                    {value: 1000000, label: "1 000 000"},
                    {value: 2000000, label: "2 000 000"},
                ]}
                onChange={(selected) => setMaxPrice(selected.value)}
                placeholder="Max price"
            /> 

            <label>Minimum Bedrooms</label> 
            <Select
                options={[
                    {value: 1, label: "1"},
                    {value: 2, label: "2"},
                    {value: 3, label: "3"},
                    
                ]}
                onChange={(selected) => setMinBedrooms(selected.value)}
                placeholder="Min Bedrooms"
            /> 

            <label>Maximum Bedrooms</label> 
            <Select
                options={[
                    {value: 3, label: "3"},
                    {value: 4, label: "4"},
                    {value: 5, label: "5"},
                    
                ]}
                onChange={(selected) => setMaxBedrooms(selected.value)}
                placeholder="Max Bedrooms"
            /> 

            <label>Date Added</label>    
            <DatePicker
                selected={dateAdded}   
                onChange={(date) => setDateAdded(date)}
                placeholder="Choose date added"
            />    

            <label>Postcode (eg: BR5)</label>
            <input
                type="text"
                value={postcode}
                onChange={(code) => setPostcode(code.target.value.toUpperCase())}
                placeholder="Enter postcode"
            />  

            <button type="submit">Search</button>      
        </form>
    );
}

export default SearchForm;