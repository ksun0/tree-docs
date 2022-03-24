import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { getDocument } from '../api/Database';
import NavBar from "./NavBar";
import SideTree from "./SideTree";

function DocumentEditor() {

    const { state } = useLocation();
    let document;

    const ref = useRef();
    useEffect(() => {
        console.log(state);
        console.log(state.nodeID);
        document = getDocument(state.nodeID);
     }, [])

    return (
        <>
        <NavBar light={true}/>
        <div id="hero" class="hero overlay subpage-hero blog-hero">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>Edit Document</h1>
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
                <div class="row">
                    <div class="col-md-8">
                        <form>
                            <div class="form-group">
                            <label style={{fontSize: "20px", paddingBottom: "5px"}}for="title">Title:</label>
                              <textarea class="form-control form-control-title" id="title"></textarea>
                            </div>
                            <br></br>
                            <div class="form-group">
                              <label style={{fontSize: "20px", paddingBottom: "5px"}} for="body">Body:</label>
                              <textarea class="form-control form-control-body" id="body"></textarea>
                            </div>
                        </form>
                    </div>
                <SideTree nodeID={state.nodeID}/>
                </div>
            </div>
            
        </section>

    </main>
    </>
    );
}

export default DocumentEditor;
