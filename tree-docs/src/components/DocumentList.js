import { useState } from 'react';
import { getDocuments } from "../api/Database";
import { ListItemButton } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faFolderBlank, faFile } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./NavBar";
import TreeView from "./TreeView";
import { Container } from 'semantic-ui-react';

function DocumentList() {

    const [documents] = useState(getDocuments());
    const [is_list_view, setIsListView] = useState(true);

    let alt = false;
    let navigate = useNavigate();

    function handleItemClick(id) {
        console.log(id);
        navigate("/edit", { state: { nodeID : id }});
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
                <ul class="portfolio-sorting list-inline text-center">
                    <li><button onClick={() => setIsListView(true)} class={is_list_view ? "btn btn-green" : "btn btn-gray"} data-group="list">List</button></li>
                    <li><button onClick={() => setIsListView(false)} class={is_list_view ? "btn btn-gray" : "btn btn-green"} data-group="tree">Tree</button></li>
                </ul>
                <br></br>
                <br></br>
                <div id="list" style={is_list_view ? {display: "block"} : {display: "none"}}>
                {documents.length ? documents.map((document, index) => {
                        alt = !alt;
                        return (
                            <span key={document.id}>
                            <ListItemButton selected={alt} component="a" onClick={ () => handleItemClick(document.id) }>
                            <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                                <article class="blog-post">
                                <h3 class="post-title"><FontAwesomeIcon icon={faFile} /> {document.name}</h3>
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
                }) : <h1>No documents yet!</h1>}
            </div>
            {documents.length ? 
                <div id="tree" style={is_list_view ? {display: "none"} : {display: "block"}}>
                    <TreeView nodeID={documents[0].id} />
                </div> : <h1>No documents yet!</h1>
            }
            </div>
        </section>
        </main>
        </>
    );
}

export default DocumentList;
