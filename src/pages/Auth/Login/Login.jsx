import React, { useState } from "react";
import "./Login.css";
import { Route, useNavigate } from "react-router"; // Route здесь не используется, можете удалить
import { Link } from "react-router-dom";
import Spinner from '../../../components/Spinner/Spinnner'; // <-- 1. Импортируем Spinner

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- 2. Новое состояние для загрузки
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    setLoading(true); // <-- 3. Устанавливаем loading в true перед запросом
    setError(""); // Сбрасываем предыдущие ошибки при новой попытке

    try {
      const res = await fetch(
        "https://vetclinic-back-end.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        // Улучшенная обработка ошибок для более информативного сообщения
        if (res.status === 401) {
          throw new Error("Invalid credentials. Please try again.");
        }
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error); // Логируем полную ошибку для отладки
      setError(error.message);
    } finally {
      setLoading(false); // <-- 4. Устанавливаем loading в false после завершения (успеха или ошибки)
    }
  };

  return (
    <div>
      <div className="login-page">
        <div className="left_container_login">
          <form className="form" onSubmit={handleLogin}>
            <h1>Welcome back!</h1>
            <span>Enter your Credentials to access your account</span>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // Отключаем поля во время загрузки
            />
            <div className="login_forgot_password">
              <label htmlFor="password">Password</label>
              <Link className="forgot_pass" to="/forgot-password">
                forgot password
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading} // Отключаем поля во время загрузки
            />
            <div className="checkbox-login">
              <input type="checkbox" name="" id="" disabled={loading} /> {/* Отключаем чекбокс */}
              <p>I agree to the terms & policy</p>
            </div>
            <button type="submit" className="btn" disabled={loading}> {/* <-- 5. Отключаем кнопку во время загрузки */}
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Logging in... <Spinner size="20px" color="#FFF" /> {/* Спиннер в кнопке */}
                </div>
              ) : (
                'Login'
              )}
            </button>

            <div className="login__block">
              <p>Don't have an account?</p>
              <Link className="sign-in-link" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
        <div className="right_container_login"> </div>
      </div>
      {/* <-- 6. Условный рендеринг полноэкранного спиннера-оверлея --> */}
      {loading && <Spinner asOverlay color="#FFD700" />} {/* Желтый спиннер на оверлее */}
    </div>
  );
}

export default Login;