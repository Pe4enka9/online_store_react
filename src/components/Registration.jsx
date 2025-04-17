import Input from "./Input.jsx";
import {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function Registration({API_URL}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: ''});
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    setFormData({email: '', password: ''});
                    navigate('/login');
                } else return res.json();
            })
            .then(data => data?.errors && setErrors(data?.errors))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Регистрация</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                       placeholder="your_email@example.com" error={errors.email}/>
                <Input label="Пароль" type="password" name="password" id="password" value={formData.password}
                       onChange={handleChange} placeholder="Пароль" error={errors.password}/>

                <Button type="submit" loading={loading}>Зарегистрироваться</Button>

                <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
            </form>
        </>
    )
}