import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./header/NavBar";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import ClientHome from "./ClientHome";

interface ClientAreaProps {}

const ClientArea: React.FC<ClientAreaProps> = () => {
  return (
    <>
      <Router>
        <header className="">
          <NavBar />
        </header>

        <Routes>
          <Route path="/reduce-issues" element={<ClientHome />} />
          <Route path="/reduce-issues/signup" element={<SignUp />} />
          <Route path="/reduce-issues/login" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
};

export default ClientArea;
