import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TablaMes from './TablaMes';
import './css/HacksCuotas.css';
import AutoNumeric from 'autonumeric';


const HacksCuotas = () => {

    //State que valida el estado del formulario
    const [validated, setValidated] = useState(false);
    //Obj que obtiene por mes el dinero invertido y el ganado con el plazo fijo
    const [arrayDatosXMes, setArrayDatosXMes] = useState([]);

    //config de la libreria "AutoNumeric.js"
    const options = {
        currencySymbol: AutoNumeric.options.currencySymbol.dollar,
        decimalCharacter: AutoNumeric.options.decimalCharacter.arabicDecimalSeparator,
        decimalCharacterAlternative: AutoNumeric.options.decimalCharacterAlternative.dot,
        decimalPlaces: 0,
        digitGroupSeparator: AutoNumeric.options.digitGroupSeparator.dot
    }

    //config de la libreria "AutoNumeric.js"
    const optionsPorcentaje = {
        currencySymbol: '%',
        decimalCharacter: AutoNumeric.options.decimalCharacter.arabicDecimalSeparator,
        decimalCharacterAlternative: AutoNumeric.options.decimalCharacterAlternative.dot,
        decimalPlaces: 0,
        digitGroupSeparator: AutoNumeric.options.digitGroupSeparator.dot
    }

    //Incorporamos la libreria para que aplique el estilo a los inputs
    useEffect(() => {
        const arrayOfId = ['#precioCuota', '#dineroInv'];
        arrayOfId.forEach(id => {
            new AutoNumeric(id, options);
        });
        new AutoNumeric('#porcentajePrazo', optionsPorcentaje);
    }, [])

    //Evento que se ejecuta al hacer "submit" en el formulario
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() !== false) {
            //Obtengo los valores de los inputs en un objeto 
            let inputs = {
                CantCuotas: parseInt(event.target[0].value),
                PrecioCuota: AutoNumeric.getNumber('#precioCuota'),
                DineroInv: AutoNumeric.getNumber('#dineroInv'),
                PorcentajePlazo: AutoNumeric.getNumber('#porcentajePrazo'),
            }
            //Calculo el precio total del producto
            let precioTotal = inputs.CantCuotas * inputs.PrecioCuota;
            //Seteo el precio en el input "disabled" para que el usuario lo vea
            event.target[2].value = precioTotal;
            //Seteo estilo en el input "disabled"
            new AutoNumeric('#precioTot', options);
            //Calculo por cada mes
            let arrayDatos = []     //Array que almacena los datos de todos los meses
            let dineroSuficiente = true;        //Bandera del dinero suficiente
            for (let i = 0; i < inputs.CantCuotas && dineroSuficiente; i++) {
                let dineroBruto = 0; //Variable que obtiene el dinero bruto x mes descontando el pago de la cuota
                if (i === 0) {      //Pregunto la primera vez, ya que no tengo ningun dato guardado en el array del ultimo mes
                    dineroBruto = inputs.DineroInv;
                } else {
                    dineroBruto = arrayDatos[i - 1].dineroBruto;
                }
                if (dineroBruto > 0) {            //Evaluo que el dinero sea suficiente
                    //Calculo lo que me daria el plazo fijo x mes
                    let dineroGanado = (Math.floor((dineroBruto * (inputs.PorcentajePlazo / 100) / 365 * 30)));
                    //Calculo el bruto que me queda descontando la cuota
                    let calculo = dineroBruto + dineroGanado - inputs.PrecioCuota;
                    //Guardo datos en el array
                    arrayDatos.push({
                        mes: i + 1,
                        dineroGanado: dineroGanado,
                        dineroInv: dineroBruto,
                        dineroBruto: calculo,
                    })
                } else {
                    dineroSuficiente = false;
                    arrayDatos.push({
                        dineroGanado: 0,
                        dineroInv: dineroBruto,
                        dineroBruto: "El Dinero no es Suficiente!",
                    })
                }
            }
            setArrayDatosXMes(arrayDatos);
        } else {
            setValidated(true);
        }
    };


    return (
        <div className='container-fluid mt-3' id='container-HacksCuotas'>
            <div className='row mt-4'>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='row justify-content-center'>
                    {/* Input cantCuota */}
                    <div className='col-12 mb-3 row justify-content-center'>
                        <div className='text-center text-white'>
                            <h5 className='ps-2 pe-2 p-1 rounded bg-dark d-inline-block'>Producto a Adquirir</h5>
                        </div>
                        <Form.Group controlId="cantCuota" className='col-7 col-sm-7 col-md-4 col-lg-3 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="number"
                                    min="1"
                                    max="12"
                                    placeholder=" "
                                />
                                <Form.Control.Feedback type="invalid">Ingrese un numero de 1 a 12!</Form.Control.Feedback>
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-piggy-bank-fill"> </i>
                                    Cantidad de cuotas

                                </label>
                            </div>
                        </Form.Group>
                        <div className='col-sm-12 col-md-1 d-flex align-items-center justify-content-center'>
                            <i className="bi bi-x-lg text-white fs-3"></i>
                        </div>
                        {/* Input precioCuota */}
                        <Form.Group controlId="precioCuota" className='col-7 col-sm-7 col-md-4 col-lg-3 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=" "
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-coin"> </i>
                                    Precio de la cuota
                                </label>
                            </div>
                        </Form.Group>
                        <div className='col-sm-12 col-md-1 d-flex align-items-center justify-content-center'>
                            <i className="bi bi-chevron-right text-white fs-3"></i>
                        </div>
                        {/* Input precioTot */}
                        <Form.Group controlId="precioTot" className='col-7 col-sm-7 col-md-5 col-lg-4 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=" "
                                    disabled
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-cash-coin"> </i>
                                    Precio total del producto
                                </label>
                            </div>
                        </Form.Group>
                    </div>
                    <div className='text-center text-white'>
                        <h5 className='ps-2 pe-2 p-1 rounded bg-dark d-inline-block'>Dinero y Plazo</h5>
                    </div>
                    {/* Input dineroInv */}
                    <Form.Group controlId="dineroInv" className='col-5 col-md-3 col-sm-5 mt-2'>
                        <div className="form-floating">
                            <Form.Control
                                required
                                type="text"
                                placeholder=" "
                            />
                            <label htmlFor="floatingInput">
                                <i className="bi bi-coin"> </i>
                                Dinero a invertir
                            </label>
                        </div>
                    </Form.Group>
                    {/* Input porcentajePrazo */}
                    <Form.Group controlId="porcentajePrazo" className=' col-4 col-md-2 col-sm-5 mt-2'>
                        <div className="form-floating">
                            <Form.Control
                                required
                                type="text"
                                placeholder=" "
                            />
                            <label htmlFor="floatingInput">
                                % TNA
                            </label>
                        </div>
                    </Form.Group>
                    <div className='col-md-10 d-flex justify-content-end'>
                        <Button type="submit" className='btn btn-lg btn-success col-md-2 mt-2'>Calcular</Button>
                    </div>
                </Form >
            </div >
            <hr className='text-white w-50 m-auto mt-5 mb-3' />

            {/* Verifica que la variable tenga datos para mostrar */}
            {
                arrayDatosXMes.length > 0 ?
                    <div className='row justify-content-center'>
                        <div className='text-white text-center ps-2 pt-2 mt-5 border border-1 rounded border-warning col-5 col-md-3' id='txt-ganaste'>
                            {typeof arrayDatosXMes[arrayDatosXMes.length - 1].dineroBruto === 'number' ? (
                                <h5><i className="bi bi-cash-coin fs-6"> </i>Ganaste: <span className='text-success'>${arrayDatosXMes[arrayDatosXMes.length - 1].dineroBruto}</span></h5>
                            ) : (
                                <h5><i className="bi bi-x-octagon fs-6"> </i>Perdiste: <span className='text-danger'>El dinero no fue suficiente para abonar las cuotas!</span></h5>
                            )
                            }
                        </div>
                        <TablaMes data={arrayDatosXMes} />
                    </div>
                    :
                    <div className='text-center text-white mt-4'>
                        <p>Esperando datos... <span className="spinner-border spinner-border-sm ms-2 text-info"></span></p>
                    </div>
            }
        </div >
    )
}

export default HacksCuotas