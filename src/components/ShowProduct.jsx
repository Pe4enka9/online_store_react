import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Loader from "./Loader.jsx";

export default function ShowProduct({API_URL}) {
    useEffect(() => {
        document.title = 'Загрузка...';
    }, []);

    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`${API_URL}/products/${id}`)
            .then(res => res.json())
            .then(data => {
                document.title = data.name;
                setProduct(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [API_URL, id]);

    return (
        <section className="show-product">
            {loading ? (
                <Loader loading={loading}/>
            ) : (
                <>
                    <h1>{product.name}</h1>

                    <div className="img-container">
                        <img src={product.image_url} alt="Фото товара"/>
                    </div>

                    <div className="info">
                        <p>{product.description}</p>
                        <p className="price">{product.price} &#8381;</p>
                        <p className="category">Категория: {product.category}</p>
                    </div>
                </>
            )}
        </section>
    )
}