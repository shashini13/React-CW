import PropertyCard from "./PropertyCard";
import PropertyList from "./PropertyList";

const Favourites = ({favouriteProperties, removeFavourite}) => {
    return (
        <>
        <h2>Favourite Properties</h2>
        {favouriteProperties.length === 0 ? (
            <p>You have no favourite properties yet</p>
        ) : (
            <div>
                {favouriteProperties.map(p => (
                    <PropertyCard
                        key={p.id}
                        p={p}
                        onFavourite={() => removeFavourite(p.id)} 
                        isFavourite={true}
                    />
                ))}
            </div>
        )}
        </>
    )
}

export default Favourites;