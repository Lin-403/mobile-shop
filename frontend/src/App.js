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
import ShippingViews from "./views/ShippingViews";
import OrderView from "./views/OrderView.js";
import UserListView from "./views/UserListView";
import UserEditView from "./views/UserEditView";
import ProductListView from "./views/ProductListView";
import ProductEditView from "./views/ProductEditView";
import OrderListView from "./views/OrderListView";

function App() {
  return (
   <Router>
    <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginView/>} />
            <Route path="/shipping" element={<ShippingViews/>} />
            <Route path="/order/:id" element={<OrderView/>} />
            <Route path="/register" element={<RegisterView/>} />
            <Route path="/" element={<HomeView/>} />
            <Route path="/products/:id" element={<ProductView/>} />
            <Route path="/admin/userlist" element={<UserListView/>} />
            <Route path="/admin/userlist/:id/edit" element={<UserEditView/>} />
            <Route path="/admin/productlist" element={<ProductListView/>} />
            <Route path="/admin/product/:id/edit" element={<ProductEditView/>} />
            <Route path="/admin/orderlist" element={<OrderListView/>} />

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
