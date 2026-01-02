import PropertyCard from './PropertyCard';

const PropertyList = ({
    results,
    onFavourite,
    favouriteProperties,
    handleAddDrop,
    handleDragOver
}) => {
    if (!results || results.length === 0) {
        return <p className="property-list-div">No properties found.</p>
    };

    return (
        
        <div className="property-list-div">
            <h2>Property List</h2>
            <div
                className="phone-view-add-to-fav"
                onDrop={handleAddDrop}
                onDragOver={handleDragOver}
            >
                <p>Drag here to add to favourites</p>
            </div>
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