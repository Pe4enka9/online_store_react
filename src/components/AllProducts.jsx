import {useEffect, useState} from "react";
import Product from "./Product.jsx";
import Category from "./Category.jsx";

export default function AllProducts({API_URL, token}) {
    useEffect(() => {
        document.title = 'Товары';
    }, []);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCategories = () => {
        setLoading(true);

        fetch(`${API_URL}/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const fetchProducts = () => {
        setLoading(true);

        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchProductsByCategory = (id) => {
        setLoading(true);

        fetch(`${API_URL}/categories/${id}/products`)
            .then(res => res.json())
            .then(data => setProducts(data.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    const handleClick = (id) => {
        fetchProductsByCategory(id);
    };

    return (
        <>
            <section className="categories">
                <h2>Категории</h2>

                <div className="categories-container">
                    {categories.map(category => (
                        <Category key={category.id} name={category.name} onClick={() => handleClick(category.id)}/>
                    ))}
                </div>
            </section>

            <section className="products-container">
                {products.map(product => (
                    <Product key={product.id} API_URL={API_URL} token={token} id={product.id} name={product.name}
                             description={product.description} price={product.price} image_url={product.image_url}
                             category={product.category}/>
                ))}
            </section>
        </>
    )
}