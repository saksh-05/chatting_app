import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "components/signUp";
import Login from "components/login";
import Main from "components/main";
import Account from "components/Account";
import EditUser from "components/EditUser";
import ChannelDetail from "components/ChannelDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/allchannels" element={<Main />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/channelDetail" element={<ChannelDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
