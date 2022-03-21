import { useState } from 'react';
import { getDocuments } from "../api/Database";
import { ListItemButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faFolderBlank } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./NavBar";
import { Container } from 'semantic-ui-react';

function DocumentList() {

    const [documents] = useState(getDocuments());

    let alt = false;
    let navigate = useNavigate();

    function handleItemClick(id) {
        navigate("/tree", { state: { nodeID : id }});
    }

    return (
        <>
        <NavBar light={true} />
        <div id="hero" class="hero overlay subpage-hero blog-hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Documents</h1>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item">Documents</li>
                </ol>
                </div>
            </div>
        </div>
        <main id="main" class="site-main">

        <section class="site-section subpage-site-section section-blog">
            <div class="container">
            {documents.length ? documents.map((document, index) => {
                    alt = !alt;
                    return (
                        <span key={document.id}>
                        <ListItemButton selected={alt} component="a" onClick={ () => handleItemClick(document.id) }>
                        <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                            <article class="blog-post">
                            <h3 class="post-title"><FontAwesomeIcon icon={faFolderBlank} /> {document.name}</h3>
                            <div class="post-meta">
                                <span class="post-author">
                                <FontAwesomeIcon icon={faUser} />  {document.author}
                                </span>
                                <span class="post-date">
                                    <FontAwesomeIcon icon={faCalendar} /> {document.date}
                                    </span>
                            </div>
                            </article>
                        </Container>
                        </ListItemButton>
                        </span>
                    )
            }) : <h1>No sections yet!</h1>}
            
            
            </div>
        </section>
        </main>

        </>
    );
}

export default DocumentList;
