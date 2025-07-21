import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useGlobalContext } from '../../context/globalContext'
import { NavLink } from 'react-router-dom'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Navigation() {
    const { user, logout } = useGlobalContext()
    
    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{user?.name || 'User'}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li key={item.id}>
                        <NavLink to={item.link} className={({isActive}) => isActive ? 'active' : ''}>
                            {item.icon}
                            <span>{item.title}</span>
                        </NavLink>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <li onClick={logout}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    min-width: 220px;
    max-width: 100vw;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    box-sizing: border-box;
    overflow-x: hidden;

    @media (max-width: 900px) {
        width: 100vw;
        min-width: 0;
        border-radius: 0 0 32px 32px;
        height: auto;
        padding: 1rem 0.5rem;
        .user-con {
            justify-content: center;
        }
    }
    @media (max-width: 600px) {
        padding: 0.5rem 0.2rem;
        border-radius: 0 0 20px 20px;
        .user-con {
            img {
                width: 50px;
                height: 50px;
            }
            h2 {
                font-size: 1rem;
            }
        }
        .menu-items li {
            padding-left: 0.5rem;
            font-size: 0.95rem;
        }
    }
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            
            a {
                display: contents;
                text-decoration: none;
                color: inherit;
            }

            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }

    .bottom-nav li {
        cursor: pointer;
    }
`;

export default Navigation