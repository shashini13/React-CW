import PropertyCard from './PropertyCard';

const PropertyList = ({results, onFavourite}) => {
    if (!results || results.length === 0) {
        return <p>No properties found.</p>
    };

    return (
        <div>
            <h2>Property List</h2>
                <div className="property-list">
                    {results.map((p) => (
                    <PropertyCard
                        key={p.id}
                        p = {p}
                        onFavourite={onFavourite}
                    />
                    ))}
                </div>
        </div>
    );
}

export default PropertyList;