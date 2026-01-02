import PropertyCard from "./PropertyCard";

const Favourites = ({favouriteProperties, removeFavourite, clearFavourites, addFavourite, handleDragOver, handleAddDrop}) => {

    const handleDropRemove = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/JSON');
        if (data) {
            const property = JSON.parse(data);
            removeFavourite(property.id);
        }
    }


    return (
        <div id="favourites" className="favourites">
            <h2>Favourite Properties</h2>

            <div className="add-remove-section">
                <div 
                    className="add-drag-drop"
                    onDrop={handleAddDrop}
                    onDragOver={handleDragOver}>

                    {favouriteProperties.length > 0 && (
                        <button onClick={clearFavourites}>Clear Favourites</button>
                    )}

                    {favouriteProperties.length === 0 ? (
                        <p>Drag here to add to favourites</p>
                    ) : (
                        <div>
                            {favouriteProperties.map(p => (
                                <PropertyCard
                                    key={p.id}
                                    p={p}
                                    onFavourite={(property) => removeFavourite(property.id)} 
                                    draggable={true}
                                    isFavourite={true}
                                />
                            ))}
                        </div>
                    )}
                </div>  
                <div className="mobile-favs">
                    {favouriteProperties.length === 0 ? (
                        <p>No favourites yet</p>
                    ) : (
                        <div>
                            {favouriteProperties.map((p) => (
                                <PropertyCard
                                key={p.id}
                                p={p}
                                onFavourite={() => removeFavourite(p.id)}
                                draggable
                                isFavourite={true}
                                />
                            ))}
                        </div> 
                    )}       
                </div>
  

                <div 
                    className="remove-drag-drop"
                    onDrop={handleDropRemove}
                    onDragOver={handleDragOver}
                >
                    <p>Drag here to remove a favourite</p>
                </div>
            </div>

        </div>

        
    )
}

export default Favourites;