import PropertyCard from "./PropertyCard";

const Favourites = ({favouriteProperties, removeFavourite, clearFavourites, addFavourite}) => {

    const handleDrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/JSON');
        if (data) {
            const property = JSON.parse(data)
            addFavourite(property);
        }
    }

    const handleDragOver = (e) => e.preventDefault();

    const handleDropRemove = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('application/JSON');
        if (data) {
            const property = JSON.parse(data);
            removeFavourite(property.id);
        }
    }


    return (
        <div>
            <h2>Favourite Properties</h2>

            <div 
                className="add-drag-drop"
                onDrop={handleDrop}
                onDragOver={handleDragOver}>

                {favouriteProperties.length > 0 && (
                    <button onClick={clearFavourites}>Clear Favourites</button>
                )}

                {favouriteProperties.length === 0 ? (
                    <p>You have no favourite properties yet</p>
                ) : (
                    <div>
                        {favouriteProperties.map(p => (
                            <PropertyCard
                                key={p.id}
                                p={p}
                                onFavourite={() => removeFavourite(p.id)} 
                                draggable={true}
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
            Drag here to remove a favourite
            </div>

        </div>

        
    )
}

export default Favourites;