import React from 'react'
import './css/Footer.css'
import logotipo from './img/Logotipo_Personal(Sebastian_Legnazzi).png';

const Footer = () => {
    return (
        <div className='mt-4'>
            <footer className="d-flex justify-content-between align-items-center py-3 px-3">
                <div className='col-5 col-md-6 text-center'>
                    <h5 className="text-white">⁓ Master Logic Cuotas ⁓</h5>
                    <ul className='list-group bg-dark'>
                        <li><a className='text-warning' href="https://github.com/SebastianLegnazzi/master_logic_cuotas">Documentacion</a></li>
                        <li><a className='text-warning' href="mailto:sebileg@hotmail.com">Contacto</a></li>
                    </ul>
                </div>
                <div className='col-5 col-md-6 text-center d-flex'>
                    <a href="https://github.com/SebastianLegnazzi" className="nav-link px-2 text-white">
                        <h5>Desarrollador:</h5>
                        <p> Legnazzi Sebastian Nicolas </p>
                        <img src={logotipo} alt="Logotipo personal" className='img-fluid col-5 col-sm-2 col-md-2 col-lg-1 ms-2' />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Footer