import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaBed, FaBath, FaHome, FaClipboardCheck, FaDollarSign, FaGem } from "react-icons/fa";

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

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    

    return (
        <div className="property-details-div">
            <div className="property-details-header-gallery">
                <h2>{property.type} - £{property.price.toLocaleString()}</h2>
                <h3>{property.location}</h3>
                <div className="image-gallery">
                    <ReactImageGallery items={images}/>
                </div>
            </div>
            
            <div className="property-details-small-content">
                <p>{property.smallDescription}</p>
                <div className="property-details-summary">
                    <div className="summary-item">
                        <p className="heading"><FaHome /> Property Type</p>
                        <p className="value">{property.type}</p>
                    </div>

                    <div className="summary-item">
                        <p className="heading"><FaClipboardCheck /> Tenure</p>
                        <p className="value">{property.tenure}</p>
                    </div>

                    <div className="summary-item">
                        <p className="heading"><FaBed /> Bedrooms</p>
                        <p className="value">{property.bedrooms}</p>
                    </div>

                    <div className="summary-item">
                        <p className="heading"><FaBath /> Bathrooms</p>
                        <p className="value">{property.bathrooms}</p>
                    </div>
                </div>
            </div>

            <div className="property-details-tablist">
                <Tabs>
                    <TabList className="tab-list">
                        <Tab>Description</Tab>
                        <Tab>Floor Plan</Tab>
                        <Tab>Map</Tab>
                    </TabList>

                    <TabPanel>
                        <p className="price-label">
                            {property.price < 550000 ? (<><FaDollarSign/> Budget-friendly</>) : (<><FaGem/> Premium Listing</>)}
                        </p>
                        <p className="property-description">{property.description}</p>
                    </TabPanel>
                    <TabPanel><img className="property-floor-plan-img" src={`/${property.floorPlan}`}></img></TabPanel>
                    <TabPanel>
                        <iframe 
                            src={property.iframeURL}
                            className="map-iframe"
                            title="Property Location Map"                        
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </TabPanel>
                </Tabs>
            </div>
            
            
            
        </div>
    );
}

export default PropertyDetails;