import PropertyCard from "./PropertyCard";

const Favourites = ({favouriteProperties, removeFavourite, clearFavourites, handleDragOver, handleAddDrop}) => {

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
                {/*Desktop layout*/}
                <div 
                    className="add-drag-drop"
                    data-testid="add-zone-desktop"
                    onDrop={handleAddDrop}
                    onDragOver={handleDragOver}>

                    {favouriteProperties.length > 0 && (
                        <button onClick={clearFavourites}>Clear Favourites</button>
                    )}

                    {favouriteProperties.length === 0 ? (
                        <p>Drag here to add to favourites</p>
                    ) : (
                        <div data-testid="favourites-list-desktop">
                            {favouriteProperties.map(p => (
                                <PropertyCard
                                    key={p.id}
                                    p={p}
                                    onFavourite={(property) => removeFavourite(property.id)} 
                                    draggable={true}
                                    isFavourite={true}
                                    isInFavourites={true} 
                                />
                            ))}
                        </div>
                    )}
                </div> 

                {/*Mobile layout*/}
                <div className="mobile-favs" data-testid="mobile-favs-section">
                    {favouriteProperties.length > 0 && (
                        <button onClick={clearFavourites}>Clear Favourites</button>
                    )}
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
                                isInFavourites={true} 
                                />
                            ))}
                        </div> 
                    )}       
                </div>

                {/*Remove drag-drop*/}
                <div 
                    className="remove-drag-drop"
                    data-testid="remove-zone"
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