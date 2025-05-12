import logo from './logo.svg';
import './App.css';
import InforAccount from './component/InforAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="infor" element={<InforAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;