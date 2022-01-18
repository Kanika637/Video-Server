import React from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignIn from "./components/Form/SignIn/SignIn"
function App() {
  return (
    <div>
    
      
      <Routes>
      <Route path="/signIn" element={<SignIn/>} />
      </Routes>
      </div>
 
  );
}

export default App;
