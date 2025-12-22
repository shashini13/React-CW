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


    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}   
        >
        <h2>Favourite Properties</h2>

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
    )
}

export default Favourites;