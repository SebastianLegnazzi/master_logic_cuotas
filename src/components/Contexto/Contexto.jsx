import React from 'react'
import './css/Contexto.css'
import imgExplicacion from './img/imgExplicacion.png'

const Contexto = () => {
    return (
        <div className='row justify-content-center text-center m-0 mt-4'>
            <div className='col-md-7'>
                <h5 className='d-inline-block p-2 rounded bg-warning'>De que trata?</h5>
                <p className='text-white rounded txt-explicativo p-1 ps-2 text-start'>
                    Este proyecto consta de evaluar la diferencia de pagar el precio "Especial" de algun producto por transferencia/deposito y
                    pagar el precio de "Lista" en cuotas, depositando el precio "Especial" en un plazo fijo. De esta forma, abonar el precio de "Lista"
                    con el mismo precio "Especial" ademas de botener ganancias al finalizar el pago del producto.
                </p>
                <ul className='txt-explicativo text-white text-start'>
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
            <div className='col-md-5'>
                <h5 className='text-white'>Imagen de referencia</h5>
                <hr className='text-white w-25 m-auto mb-3' />
                <img src={imgExplicacion} className='img-fluid' alt="imagen explicativa de datos a insertar" />
            </div>

        </div>

    )
}

export default Contexto