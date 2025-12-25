import { useParams } from "react-router-dom";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
            
            <Tabs>
                <TabList>
                    <Tab>Images</Tab>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                <TabPanel><ReactImageGallery items={images}/></TabPanel>
                <TabPanel><p>{property.description}</p></TabPanel>
                <TabPanel><img src={`/${property.floorPlan}`}></img></TabPanel>
                <TabPanel><p>google map iframe</p></TabPanel>
            </Tabs>

            
            
            
        </div>
    );
}

export default PropertyDetails;