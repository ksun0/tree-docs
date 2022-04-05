import DocumentEditor from "./components/DocumentEditor";
import Home from "./components/Home";
import DocumentList from "./components/DocumentList";
import TreeView from "./components/TreeView";
import DiffView from "./components/DiffView";
import Login from "./components/Login";
import Signup from "./components/Signup";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route exact path="/" element={<Home/>} />

          <Route exact path="/list" element={<DocumentList/>} />

          <Route exact path="/diff" element={<DiffView/>} />
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Route path="/tree" element={<TreeView/>} />
            
          {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
          <Route path="/edit" element={<DocumentEditor/>} />

          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

          
          
        </Routes>
      </Router>



      
    </>
  );
}

export default App;
