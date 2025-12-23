import { useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PropertyDetails = ({allProperties}) => {
    const {id} = useParams();
    const property = allProperties.find(p => p.id === id);

    if (!property) {
        return <p>Loading property details...</p>
    }

    const images = property.images.map(image => ({
        original: `/${image}`,
        thumbnail: `/${image}`
    }));
    

    return (
        <div>
            <h2>{property.type} - £{property.price.toLocaleString()}</h2>
            <ReactImageGallery items={images}/>
            <p>{property.description}</p>
            
        </div>
    );
}

export default PropertyDetails;