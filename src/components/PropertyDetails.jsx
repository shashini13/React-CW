import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaBed, FaBath, FaHome, FaClipboardCheck, FaDollarSign, FaGem } from "react-icons/fa";

const PropertyDetails = ({allProperties}) => {
    const {id} = useParams();
    const property = allProperties.find(p => p.id === id);
    const base = import.meta.env.BASE_URL;

    if (!property) {
        return <p>Loading property details...</p>
    }

    const images = property.images.map(img => ({
        original: `${base}${img}`,
        thumbnail: `${base}${img}`
    }));

    //Scrolls to top of page when property details page renders
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    

    return (
        <div className="property-details-div">

            <Link to="/">
                <button className="back-to-home-btn">Back to Home</button>
            </Link>
            
            <div className="property-details-header-gallery">
                <div className="property-details-header">
                    <img
                        src={`${base}images/logo.png`}
                        alt="property details page logo"
                        className="property-details-logo"
                    />
                    <h1 id="property-details-h1">Property Details</h1>
                </div>
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
                        <p className="heading"><FaHome /> Type</p>
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
                    <TabPanel>
                        <img src={`${base}${property.floorPlan}`} alt="Floor plan" className="property-floor-plan-img" />
                    </TabPanel>
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