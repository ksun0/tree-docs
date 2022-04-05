import { useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { getDocument } from '../api/Database';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import SideTree from "./SideTree";

function DocumentEditor() {

    const { state } = useLocation();
    let document;

    let navigate = useNavigate();

    const ref = useRef();
    const title = useRef();
    const body = useRef();

    function onDelete() {
        // Go to delete page with state.nodeID
        const id = state.nodeID;
        console.log("akjdlsfja");
    }

    function onSave() {
        // Go to delete page with state.nodeID
        const saveTitle = title.current.value;
        const bodyTitle = body.current.value;
    }

    useEffect(() => {
        console.log(state);
        console.log(state.nodeID);
        document = getDocument(state.nodeID);
     }, [])

    return (
        <>
        <NavBar light={true}/>
        <div id="hero" class="hero overlay subpage-hero edit-hero">
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
                            <div class="form-group">
                            <label style={{fontSize: "20px", paddingBottom: "5px"}}for="title">Title:</label>
                              <textarea class="form-control form-control-title" id="title" ref={title}>{getDocument(2).title}</textarea>
                            </div>
                            <br></br>
                            <div class="form-group">
                              <label style={{fontSize: "20px", paddingBottom: "5px"}} for="body">Body:</label>
                              <textarea class="form-control form-control-body" id="body" ref={body}>{getDocument(2).body}</textarea>
                            </div>
                            <br></br>
                            <button class="btn btn-red" onClick={() => onDelete()}>Delete</button>
                            <button class="btn btn-green btn-save" onClick={() => onSave()}>Save</button>
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
