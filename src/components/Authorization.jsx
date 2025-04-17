import Input from "./Input.jsx";
import {useEffect, useState} from "react";
import Button from "./Button.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function Authorization({API_URL, setToken}) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Авторизация';
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
    const [failAuth, setFailAuth] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setFailAuth(false);

        fetch(`${API_URL}/auth`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.status === 401) {
                    setFailAuth(true);
                    setFormData({...formData, password: ''});
                } else return res.json();
            })
            .then(data => {
                if (data?.token) {
                    setFormData({email: '', password: ''});
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    navigate('/');
                } else {
                    data?.errors && setErrors(data?.errors);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <h1>Авторизация</h1>

            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                       placeholder="your_email@example.com" error={errors.email}/>
                <Input label="Пароль" type="password" name="password" id="password" value={formData.password}
                       onChange={handleChange} placeholder="Пароль" error={errors.password}/>

                {failAuth && <p className="error">Неверный логин или пароль</p>}

                <Button type="submit" loading={loading}>Войти</Button>

                <p>Ещё нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
            </form>
        </>
    )
}