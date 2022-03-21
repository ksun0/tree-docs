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

                        <li class="active"><a href="index.html" data-toggle="dropdown">Home</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="ui-elements.html">UI Elements</a></li>
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Pages<i class="fa fa-caret-down hidden-xs" aria-hidden="true"></i></a>

                            <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                              <li><a href="portfolio.html">Portfolio</a></li>
                              <li><a href="blog.html">Blog</a></li>
                            </ul>

                        </li>

                    </ul>

                </div>

            </div>   
        </nav>
    </header>

</>

    );
}

export default NavBar;