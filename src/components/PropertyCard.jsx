const PropertyCard = ({p}) => {
    return (
        <div>
            <img src={p.image}></img>
            <h3>{p.type} - £{p.price.toLocaleString()}</h3>
            <p>{p.bedrooms} Bedrooms</p>
            <p>Location: {p.location}</p>
            <button>View Details</button>
        </div>
    )
};

export default PropertyCard;