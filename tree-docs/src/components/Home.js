
import NavBar from "./NavBar";
import { Container } from 'semantic-ui-react'

function Home() {

    return (
    <>
        <NavBar/>
        <div id="hero" class="hero overlay">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Rethink Document Collaboration</h1>
                <br></br>
                <a href="/list" class="btn btn-border">Start Here</a>
            </div>
        </div>
        </div>
    </>
    );
}

export default Home;