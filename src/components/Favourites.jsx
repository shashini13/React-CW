import PropertyList from "./PropertyList";

const Favourites = ({favouriteProperties, removeFavourite}) => {
    return (
        <>
        <h2>Favourite Properties</h2>
        {favouriteProperties.length === 0 ? (
            <p>You have no favourite properties yet</p>
        ) : (
            <ul>
                {favouriteProperties.map(p => (
                    <li key={p.id}>
                        {p.type} - £{p.price.toLocaleString()}
                        <button onClick={() => removeFavourite(p.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        )}
        </>
    )
}

export default Favourites;