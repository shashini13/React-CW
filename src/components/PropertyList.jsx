import PropertyCard from './PropertyCard';

const PropertyList = ({results, onFavourite}) => {
    if (!results || results.length === 0) {
        return <p class="property-list-div">No properties found.</p>
    };

    return (
        <div className="property-list-div">
            <h2>Property List</h2>
                <div className="property-list-content">
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