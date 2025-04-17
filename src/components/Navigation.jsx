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
                    <div>
                        <NavLink to="/">Главная</NavLink>
                    </div>

                    <div>
                        <NavLink to="/registration">Регистрация</NavLink>
                        <NavLink to="/login">Вход</NavLink>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/orders">Заказы</NavLink>
                    </div>

                    <div>
                        <Button loading={loading} danger={true} onClick={handleLogout}>Выход</Button>
                    </div>
                </>
            )}
        </nav>
    )
}