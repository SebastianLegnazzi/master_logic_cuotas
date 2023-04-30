import React from 'react'
import './css/Footer.css'

const Footer = () => {
    return (
        <div className='mt-4'>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5">
                <p className="col-md-4 mb-0 text-white" id="universidad">Master Logic Cuotas</p>
                <ul className="nav justify-content-end flex-column col-3,5">
                    <li className="nav-item"><a href="https://github.com/SebastianLegnazzi/master_logic_cuotas" className="nav-link px-2 text-white"><span> Legnazzi Sebastian Nicolas</span></a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer