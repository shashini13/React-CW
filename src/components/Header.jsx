const Header = () => {
    const base = import.meta.env.BASE_URL;
    return (
        <div className="header-div">
            <img src={`${base}images/logo.png`} alt="website-logo" className="logo-img" />
            <h2>Find a place you'll love to call home !</h2>
        </div>
    );
}

export default Header;