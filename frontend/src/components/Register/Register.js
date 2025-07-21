import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const { register, error, setError } = useGlobalContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register({ name, email, password });
        if (success) {
            navigate('/');
        }
    };

    useEffect(() => {
        return () => {
          setError(null)
        }
      }, [setError])

    return (
        <RegisterStyled>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <div className="input-control">
                    <input
                        type="text"
                        value={name}
                        name={'name'}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-control">
                    <input
                        type="email"
                        value={email}
                        name={'email'}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-control password-control">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        name={'password'}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye-btn" onClick={() => setShowPassword(s => !s)}>
                        {showPassword ? '🙈' : '👁️'}
                    </span>
                </div>
                <div className="submit-btn">
                    <button>Register</button>
                </div>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${props => props.bg || '../../img/bg.jpg'});
    background-size: cover;

    form {
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        padding: 2rem;
        width: 400px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: var(--primary-color);

        h2 {
            text-align: center;
            margin-bottom: 2rem;
        }

        .input-control {
            margin-bottom: 1.5rem;
            position: relative;
            input {
                width: 100%;
                padding: 1rem;
                border-radius: 5px;
                border: 1px solid var(--color-grey);
                background: #FFF;
                font-family: inherit;
                font-size: inherit;
                color: var(--primary-color);
                &::placeholder {
                    color: var(--color-grey);
                }
            }
        }
        .password-control {
            input {
                padding-right: 2.5rem;
            }
            .eye-btn {
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
                cursor: pointer;
                font-size: 1.2rem;
                user-select: none;
            }
        }

        .submit-btn {
            button {
                width: 100%;
                padding: 1rem;
                border-radius: 5px;
                border: none;
                background: var(--color-accent);
                color: #fff;
                font-family: inherit;
                font-size: inherit;
                cursor: pointer;
                transition: all .4s ease-in-out;
                &:hover {
                    background: var(--color-green);
                }
            }
        }

        p {
            text-align: center;
            margin-top: 1rem;
            a {
                color: var(--color-accent);
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

export default Register; 