import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faFolderBlank, faFile } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./NavBar";
import TreeView from "./TreeView";
import { Container } from 'semantic-ui-react';

function Login() {
    let navigate = useNavigate();
    
    let username = useRef();
    let password = useRef();

    function onLogin() {
        // Go to delete page with state.nodeID
        const saveUsername = username.current.value;
        const savePass = password.current.value;
        console.log(saveUsername);
        console.log(savePass);
        navigate("/list");
    }

    return (
        <>
        <NavBar light={true} />
        <div id="hero" class="hero overlay subpage-hero login-hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Login</h1>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/">Home</a></li>
                  <li class="breadcrumb-item">Login</li>
                </ol>
                </div>
            </div>
        </div>
        <main id="main" class="site-main">

        <section class="site-section subpage-site-section section-blog">
            <div class="container" style= {{width: "500px"}}>
                <div class="form-group">
                    <label style={{fontSize: "20px", paddingBottom: "5px"}}for="username">Username:</label>
                        <textarea class="form-control form-control-title" id="username" ref={username}></textarea>
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label style={{fontSize: "20px", paddingBottom: "5px"}} for="password">Password:</label>
                        <textarea class="form-control form-control-title password" id="password" ref={password}></textarea>
                    </div>
                    <br></br>
                    <center><button class="btn btn-green" onClick={() => onLogin()}>Login</button>
                    <br></br>
                    <br></br>
                    <p>Don't have an account? Sign up <a href="/signup">here</a></p> 
                    </center>
            </div>
        </section>
        </main>
        </>
    );
}

export default Login;
