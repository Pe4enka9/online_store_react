import {Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Registration from "./components/Registration.jsx";
import Authorization from "./components/Authorization.jsx";
import AllProducts from "./components/AllProducts.jsx";
import {useState} from "react";
import ShowProduct from "./components/ShowProduct.jsx";
import UserOrders from "./components/UserOrders.jsx";

export default function App() {
    const API_URL = 'http://127.0.0.1:8000/api';
    const [token, setToken] = useState(localStorage.token || '');

    return (
        <div className="container">
            <Header API_URL={API_URL} token={token} setToken={setToken}/>

            <main>
                <Routes>
                    <Route path="/registration" element={<Registration API_URL={API_URL}/>}/>
                    <Route path="/login" element={<Authorization API_URL={API_URL} setToken={setToken}/>}/>

                    <Route path="/" element={<AllProducts API_URL={API_URL} token={token}/>}/>
                    <Route path="/products/:id" element={<ShowProduct API_URL={API_URL}/>}/>

                    <Route path="/orders" element={<UserOrders API_URL={API_URL} token={token}/>}/>
                </Routes>
            </main>

            <Footer API_URL={API_URL} token={token} setToken={setToken}/>
        </div>
    )
}