import Header from "./components/Header";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Footer from "./components/Footer";
import {Container} from "react-bootstrap"
import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";
import CartViews from "./views/CartViews";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ProfileView from "./views/ProfileView";

function App() {
  return (
   <Router>
    <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path="/register" element={<RegisterView/>} />
            <Route path="/" element={<HomeView/>} />
            <Route path="/products/:id" element={<ProductView/>} />
            <Route path="/cart/:id?" element={<CartViews/>} />
            <Route path="/profile" element={<ProfileView />} />
          </Routes>  
        </Container>
      </main>
      <Footer />
   </Router>
  );
}

export default App;
