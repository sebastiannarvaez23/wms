import React from "react";
import './SlideLinks.css';
import imgProfile from "../image/profile.jpg";
import { alertWithConfirm } from "../../../Alerts/SweetAlerts";
import { useAuth } from "../../../Context/auth-context";

const logout = () => {
    alertWithConfirm('¿Desea cerrar la sesión?', 'Sí, ¡deseo salir!', ()=>{
        // Logica para salir de la sesion
        alert("Saliendo de la sesión")
    }, ()=>{})
}

export const SlideLinks = () => {

    const {
        user
    } =useAuth()

    return (
        <ul className="nav-links">
            <li>
                <a href="/">
                    <i className='bx bx-grid-alt'></i>
                    <span className="link_name">Inicio</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Inicio</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                <i className='bx bx-door-open'></i>
                    <span className="link_name">Recepción</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Recepción</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                <i className='bx bx-coin-stack'></i>
                    <span className="link_name">Inventarios</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Inventarios</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                <i className='bx bx-home-alt'></i>
                    <span className="link_name">Almacenamiento</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Almacenamiento</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                    <i className='bx bxs-truck'></i>
                    <span className="link_name">Picking</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Picking</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                <i className='bx bxs-plane-alt'></i>
                    <span className="link_name">Envío</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Envío</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                <i className='bx bx-undo'></i>
                    <span className="link_name">Devoluciones</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Devoluciones</a></li>
                </ul>
            </li>
            <li>
                <a href="/">
                    <i className='bx bx-pie-chart-alt-2'></i>
                    <span className="link_name">Analiticas</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="/">Analiticas</a></li>
                </ul>
            </li>
            <li>
                <a href="http://localhost:8000/admin/">
                    <i className='bx bx-cog'></i>
                    <span className="link_name">Configuraciones</span>
                </a>
                <ul className="sub-menu blank">
                    <li><a className="link_name" href="http://localhost:8000/admin/">Configuraciones</a></li>
                </ul>
            </li>
            <li>
                <div className="profile-details">
                    <div className="profile-content">
                        <img src={imgProfile} alt="profileImg" />
                    </div>
                    <div className="name-job">
                        <div className="profile_name">{user.username}</div>
                        <div className="job">Web Desginer</div>
                    </div>
                    <i onClick={() => { logout() }} className='bx bx-log-out'></i>
                </div>
            </li>
        </ul>
    );
}