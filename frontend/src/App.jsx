import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing_page/LandingPage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Feed from "./components/feed/feed";
import Invite from "./components/invite/Invite";
import NotificationsList from "./components/notifications_list/NotificationsList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/invite-a-contributor/:id" element={<Invite />} />
          <Route path="notifications-list" element={<NotificationsList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
