import React from 'react'
import { NavLink } from 'react-router-dom';
import './css/Header.css'

const Header = () => {
    return (
        <div>
            <div className='text-center mt-3'>
                <h2 className='d-inline-block p-2 rounded bg-warning'>Master Logic Cuotas</h2>
            </div>
            <hr className='text-white w-25 m-auto mt-3' />
            <div className='d-flex justify-content-center mt-3'>
                <NavLink to="/" className="px-2 mx-1 btn btn-lg btn-outline-light navLink">Calculator</NavLink>
                <NavLink to="/Contexto" className="px-2 mx-1 btn btn-lg btn-outline-light navLink">Info</NavLink>
            </div>
        </div>
    )
}

export default Header