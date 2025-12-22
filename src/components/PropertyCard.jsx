import { Link } from "react-router-dom";

const PropertyCard = ({p, onFavourite, isFavourite=false, draggable=true}) => {

    const handleDragStart = (e) => {
        if (draggable) {
            e.dataTransfer.setData('application/JSON', JSON.stringify(p));
        }
    }   

    return (
        <div className="property-card"
            draggable={draggable}
            onDragStart={handleDragStart}
        >
            <img src={p.picture}></img>
            <h3>{p.type} - £{p.price.toLocaleString()}</h3>
            <p>{p.bedrooms} Bedrooms</p>
            <p>Location: {p.location}</p>

            <Link to={`/property/${p.id}`}>
                <button>View Details</button>
            </Link>
            
            <button onClick={() => onFavourite(p)}>
                {isFavourite ? "Remove" : "Add to favourites"}</button>
        </div>
    )
};

export default PropertyCard;