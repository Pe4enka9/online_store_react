import {Link} from "react-router-dom";
import {useState} from "react";
import Button from "./Button.jsx";
import Loader from "./Loader.jsx";

export default function Product({API_URL, token, id, name, description, price, image_url, category}) {
    const [loading, setLoading] = useState(false);

    const handleBuy = () => {
        setLoading(true);

        fetch(`${API_URL}/products/${id}/buy`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => res.json())
            .then(data => window.location.href = data.pay_url)
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div className="product">
            {loading ? (
                <Loader loading={loading}/>
            ) : (
                <>
                    <div className="img-container">
                        <img src={image_url} alt="Фото товара"/>
                    </div>

                    <h3>{name}</h3>
                    {description && <p>{description}</p>}
                    <p className="price">{price} &#8381;</p>
                    <p className="category">{category}</p>

                    <div className="buttons">
                        <Link to={`/products/${id}`} className="btn">Подробнее</Link>
                        <Button onClick={handleBuy}>Купить</Button>
                    </div>
                </>
            )}
        </div>
    )
}