import Header from "./components/Header";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Footer from "./components/Footer";
import {Container} from "react-bootstrap"
import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";
import CartViews from "./views/CartViews";

function App() {
  return (
   <Router>
    <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeView/>} />
            <Route path="/products/:id" element={<ProductView/>} />
            <Route path="/cart/:id?" element={<CartViews/>} />
          </Routes>  
        </Container>
      </main>
      <Footer />
   </Router>
  );
}

export default App;
