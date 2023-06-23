import {Route, Routes}    from "react-router-dom"

import './App.css';
import ChatPageContainer  from "./components/ChatPage/ChatPageContainer";
import LoginPageContainer from "./components/LoginPage/LoginPageContainer";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<LoginPageContainer/>}/>
          <Route path="/login" element={<LoginPageContainer/>}/>
          <Route path="/chat" element={<ChatPageContainer/>}/>
      </Routes>
  );
}

export default App;
