import "../App.css";


function onClickHandler() {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
    });
}

function Header() {
    const path = window.location.pathname.split("/")[1]

    return (
        <nav className="navbar test-app-header is-white" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a href="/" className="navbar-item">
                        <h1 className="logo">ABC Industrial Management</h1>
                    </a>
                    <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={onClickHandler}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <a className={path === '' ? 'navbar-item page-active' : 'navbar-item'} href="/">Home</a>
                        <a className={path === 'clients' ? 'navbar-item page-active' : 'navbar-item'} href="/clients">Clients</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;