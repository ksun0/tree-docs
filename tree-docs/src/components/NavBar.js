function NavBar(props) {

    return (
        <>

    <header id="masthead" class={props.light ? "site-header site-header-white" : "site-header"}>
        <nav id="primary-navigation" class="site-navigation">
            <div class="container">

                <div class="navbar-header">
                   
                    <a class="site-title"><span>Tree</span>Docs</a>

                </div>

                <div class="collapse navbar-collapse" id="agency-navbar-collapse">

                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/">Home</a></li>               
                        <li><a href="/list">Documents</a></li>
                    </ul>

                </div>

            </div>   
        </nav>
    </header>

</>

    );
}

export default NavBar;