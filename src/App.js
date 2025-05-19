import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../src/component/Login";
import Home from "../src/component/Home";
import About from "../src/component/About";
import Contact from "../src/component/Contacts";
import Infor from "../src/component/InforAccount";
import Root from "./routes/root";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route riêng cho Login, KHÔNG dùng Root layout */}
        <Route path="/login" element={<Login />} />

        {/* Các route khác dùng layout Root */}
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="infor" element={<Infor />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
