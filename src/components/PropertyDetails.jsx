import { useParams } from "react-router-dom";

const PropertyDetails = ({allProperties}) => {
    const {id} = useParams();
    const property = allProperties.find(p => p.id === id);
    return (
        <div>
            <h2>{property.type} - £{property.price.toLocaleString()}</h2>
            <p>{property.description}</p>
        </div>
    );
}

export default PropertyDetails;