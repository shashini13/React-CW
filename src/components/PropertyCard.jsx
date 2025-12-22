const PropertyCard = ({p}) => {
    return (
        <div className="property-card">
            <img src={p.picture}></img>
            <h3>{p.type} - £{p.price.toLocaleString()}</h3>
            <p>{p.bedrooms} Bedrooms</p>
            <p>Location: {p.location}</p>
            <button>View Details</button>
            <button onClick={() => onFavourite(p)}>Add to favourites</button>
        </div>
    )
};

export default PropertyCard;