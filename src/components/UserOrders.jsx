import {useEffect, useState} from "react";
import Order from "./Order.jsx";
import Loader from "./Loader.jsx";

export default function UserOrders({API_URL, token}) {
    useEffect(() => {
        document.title = 'Заказы';
    }, []);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = () => {
        setLoading(true);

        fetch(`${API_URL}/orders`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(data => setOrders(data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <h1 className="mb-3">Заказы</h1>

            <section className="orders-container">
                {loading ? (
                    <Loader loading={loading}/>
                ) : orders.map(order => (
                    <Order key={order.id} product={order.product} status={order.status}/>
                ))}
            </section>
        </>
    )
}