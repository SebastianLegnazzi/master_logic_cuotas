import React from 'react'
import './css/Contexto.css'
import imgExplicacion from './img/imgExplicacion.png'

const Contexto = () => {
    return (
        <div className='row justify-content-center text-center m-0 mt-4'>
            <div className='col-md-7'>
                <h4 className='d-block d-md-inline-block p-2 rounded bg-info'>De que trata?</h4>
                <p className='text-white rounded txt-explicativo p-1 ps-2 text-start fs-5'>
                    Este proyecto consta de calcular si es posible pagar el precio de la cuota todos los meses depositando
                    el <i className='text-white-50'>"dinero a invertir"</i> en un plazo fijo sumandole dicho interes todos
                    los meses y restandole la cuota del producto.
                </p>
                <ul className='txt-explicativo text-white text-start fs-5'>
                    <strong>Procedimiento:</strong>
                    <li>Se ingresan los datos solicitados.</li>
                    <li>Se realizan los calculos y se muestra una tabla con;</li>
                    <ul>
                        <li>Precio bruto que nos queda todos los meses</li>
                        <li>Dinero obtenido del plazo fijo (calculado con el porcentaje)</li>
                        <li>Precio bruto del mes siguiente (precio obtenido, sumandole el interes del plazo fijo y restandole la cuota mensual)</li>
                    </ul>
                    <li>Pagina de referncia para obtener los datos <a href="https://compragamer.com/">Click Aqui</a></li>
                </ul>
            </div>
            <div className='col-md-5 justify-content-center row'>
                <div>
                    <h4 className='mt-3 d-block d-md-inline-block p-2 rounded bg-info'>Imagen de referencia</h4>
                </div>
                <hr className='text-white w-25 m-auto mb-4' />
                <div>
                    <img src={imgExplicacion} className='img-fluid img-explicativa col-10 col-md-12' alt="imagen explicativa de datos a insertar" />
                </div>
                <p className='col-11 text-center text-white txt-explicativo mt-1 text-start pt-1 align-self-center' id='txt-explicativo-imagen'>
                    Ejemplo: Invertimos <i className='text-white-50'>$19.104</i> en 12 cuotas,
                    depositando <i className='text-white-50'>$158.000</i> en un plazo fijo
                </p>
            </div>

        </div>

    )
}

export default Contexto