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
        <NavBar/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2 align="center">Edit</h2>
        <main id="main" class="site-main">

        <section class="site-section subpage-site-section section-blog">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <form>
                            <div class="form-group">
                            <label for="title">Title:</label>
                              <textarea class="form-control form-control-title" id="title"></textarea>
                            </div>
                            <br></br>
                            <div class="form-group">
                              <label for="body">Body:</label>
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
