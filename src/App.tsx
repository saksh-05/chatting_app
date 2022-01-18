import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "components/signUp";
import Login from "components/login";
import Main from "components/main";
import Account from "components/Account";
import EditUser from "components/EditUser";
import ChannelDetail from "components/ChannelDetail";
// import { Counter } from './features/counter/Counter';

function App() {
  return (
    <Router>
      <Routes>
        {/* <PrivateRoute exact path="/" component={WelcomeScreen} />
            <PrivateRoute path="/edit" component={EditProfile} />
            <PrivateRoute path="/channels/:id" component={ChatScreen} />
            <PrivateRoute path="/profile" component={Profile} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/allchannels" element={<Main />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/channelDetail" element={<ChannelDetail />} />
        {/* <Redirect from="*" to="/404" /> */}
      </Routes>
    </Router>
  );
}

export default App;
