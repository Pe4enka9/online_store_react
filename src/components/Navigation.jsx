import {NavLink, useNavigate} from "react-router-dom";
import Button from "./Button.jsx";
import {useState} from "react";

export default function Navigation({API_URL, token, setToken}) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);

        fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
        })
            .then(res => {
                if (res.ok) {
                    setToken('');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <nav>
            {!token ? (
                <>
                    <NavLink to="/registration">Регистрация</NavLink>
                    <NavLink to="/login">Вход</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/orders">Заказы</NavLink>
                    <Button loading={loading} onClick={handleLogout}>Выход</Button>
                </>
            )}
        </nav>
    )
}