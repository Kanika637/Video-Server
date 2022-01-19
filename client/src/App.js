import React from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import SignIn from "./components/Form/SignIn/SignIn"
import SignUp from "./components/Form/SignUp/SignUp"
import Upload from "./components/Upload/Upload"
function App() {
  return (
    <div>
    
      
      <Routes>
      <Route path="/signIn" element={<SignIn/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/upload" element={<Upload/>} />
      </Routes>
      </div>
 
  );
}

export default App;
