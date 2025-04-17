export default function Order({product, status}) {
    return (
        <div className="order">
            <div className="img-container">
                <img src={product.image_url} alt="Фото товара"/>
            </div>

            <h2>Название товара: {product.name}</h2>
            {product.description && <p>Описание: {product.description}</p>}
            <p className="price">Цена: {product.price} &#8381;</p>
            <p className="category">Категория: {product.category}</p>
            <p className={`status ${status}`}>Статус: {status === 'pending' ? 'В ожидании' : status === 'success' ? 'Оплачен' : 'Не оплачен'}</p>
        </div>
    )
}