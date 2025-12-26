import { Link } from "react-router-dom";

const PropertyCard = ({p, onFavourite, isFavourite=false, draggable=true}) => {

    const handleDragStart = (e) => {
        if (draggable) {
            e.dataTransfer.setData('application/JSON', JSON.stringify(p));
        }
    }   

    return (
        <div 
            className="property-card"
            draggable={draggable}
            onDragStart={handleDragStart}
        >
            <img src={p.picture}></img>
            <h2 className="property-card-h2">{p.type} - £{p.price.toLocaleString()}</h2>
            <p className="property-card-location-p">{p.location}</p>
            <p>{p.bedrooms} Bedrooms</p>
            
            <p>{p.smallDescription}</p>

            <Link to={`/property/${p.id}`}>
                <button className="property-card-btn">View Details</button>
            </Link>

            <button onClick={() => onFavourite(p)} className="property-card-btn">
                {isFavourite ? "Remove" : "Add to favourites"}</button>
        </div>
    )
};

export default PropertyCard;