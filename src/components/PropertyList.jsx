import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({results}) => {
    if (!results || results.length === 0) {
        return <p>No properties found.</p>
    };

    return (
        <div>
            {results.map((p) => (
            <PropertyCard
                key={p.id}
                p = {p}
            />
            ))}
        </div>
    );
}

export default PropertyList;