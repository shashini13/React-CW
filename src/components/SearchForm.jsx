import React, {useState} from 'react';
import { DatePicker } from 'react-widgets/cjs';
import 'react-widgets/styles.css';

const SearchForm = () => {
    const [type, setType] = useState("Any");

    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const [minBedrooms, setMinBedrooms] = useState(null);
    const [maxBedrooms, setMaxBedrooms] = useState(null);

    const [dateAdded, setDateAdded] = useState(null);
    const [postcode, setPostcode] = useState("");

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
        </form>
    );
}

export default SearchForm;