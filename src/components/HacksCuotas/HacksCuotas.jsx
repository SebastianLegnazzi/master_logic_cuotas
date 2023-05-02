import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TablaMes from './TablaMes';
import './css/HacksCuotas.css';
import AutoNumeric from 'autonumeric';


const HacksCuotas = () => {


    const [validated, setValidated] = useState(false);  //State que valida el estado del formulario
    const [arrayDatosXMes, setArrayDatosXMes] = useState([]);   //State que obtiene por mes el dinero invertido y el ganado con el plazo fijo
    const [precioMinInv, setPrecioMinInv] = useState(0);   //State que 

    //Referencia al "input Cuota" y "Precio Total Producto"
    const refICantCuota = useRef(null);
    const refIPreTotProd = useRef(null);
    const refIPreCuota = useRef(null);
    const refIDineroInv = useRef(null);
    const refITNA = useRef(null);

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
        //Pregunto si tiene datos en el localstorage para cargar
        if (localStorage.getItem('datos')) {
            //Cargo datos en la tabla e inputs
            setArrayDatosXMes(JSON.parse(localStorage.getItem('datos')));
            let inputs = JSON.parse(localStorage.getItem('inputs'));
            refICantCuota.current.value = inputs.CantCuotas;
            refIPreTotProd.current.value = inputs.DineroInv * inputs.CantCuotas;
            refIPreCuota.current.value = inputs.PrecioCuota;
            refIDineroInv.current.value = inputs.DineroInv;
            refITNA.current.value = inputs.PorcentajePlazo;
        }
        const arrayOfId = ['#precioCuota', '#dineroInv', '#precioTot'];
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
                PorcentajePlazo: ((AutoNumeric.getNumber('#porcentajePrazo') / 100) / 365 * 30),
            }
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
                    let dineroGanado = (dineroBruto * inputs.PorcentajePlazo);
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
                        dineroInv: 0,
                        dineroBruto: dineroBruto,
                    })
                }
            }
            inputs.PorcentajePlazo = AutoNumeric.getNumber('#porcentajePrazo'); //Devuelvo el numero del TNA para guardarlo sin estar calculado
            //Guardo en el local storage los datos para reutilizarlos y que no se pierdan
            localStorage.setItem('inputs', JSON.stringify(inputs))
            localStorage.setItem('datos', JSON.stringify(arrayDatos))
            setArrayDatosXMes(arrayDatos);
        } else {
            setValidated(true);
        }
    };

    //Limpia el Local Storage
    const limpiar = () => {
        localStorage.clear()
        window.location.reload();
    }

    //Ejecutador de funciones cuandose modifican los inputs "canCuotas", "PrecioCuota", "TNA"
    const ejecutador = () => {
        calcPrecioTotProd();
        minPrecioCuota();
    }


    //Funcion que calcula el precio total del producto cada vez que se modifica el precio de la cuota
    const calcPrecioTotProd = () => {
        let precioTotal = AutoNumeric.getNumber('#precioCuota') * refICantCuota.current.value;  //Calculo el precio total del producto
        refIPreTotProd.current.value = precioTotal  //Seteo el precio en el input "disabled" para que el usuario lo vea
        new AutoNumeric('#precioTot', options); //Seteo formato del input
    }

    //Formula que calcula el precio minimo que se necesita para abonar la totalidad de las cuotas
    const minPrecioCuota = () => {
        let inputs = {
            CantCuotas: refICantCuota.current.value,
            PrecioCuota: AutoNumeric.getNumber('#precioCuota'),
            PorcentajePlazo: ((AutoNumeric.getNumber('#porcentajePrazo') / 100) / 365 * 30),
        }
        let cuota = inputs.PrecioCuota;
        let arrayCalc = [];
        for (let index = 0; index < inputs.CantCuotas; index++) {
            let ia = null;
            if (index === 0) {
                ia = cuota;
            } else {
                ia = arrayCalc[index - 1] + cuota;
            }
            let calc = (ia / (inputs.PorcentajePlazo + 1));
            if (index === (inputs.CantCuotas - 1)) {
                calc = Math.ceil(calc);
                setPrecioMinInv(calc)
            }
            arrayCalc.push(calc);
        }
    }

    return (
        <div className='mt-3' id='container-HacksCuotas'>
            <div className=''>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className='row m-0 justify-content-center'>
                    {/* DIV Producto a adquirir */}
                    <div className='mb-3 row justify-content-center'>
                        {/* Input cantCuota */}
                        <div className='text-center text-white'>
                            <h5 className='p-1 rounded bg-dark d-inline-block'>Producto a Adquirir</h5>
                        </div>
                        <Form.Group controlId="cantCuota" className='col-sm-7 col-md-4 col-lg-3 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="number"
                                    min="1"
                                    max="12"
                                    placeholder=" "
                                    autoComplete='off'
                                    ref={refICantCuota}
                                    onChange={ejecutador}
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
                        <Form.Group controlId="precioCuota" className='col-sm-7 col-md-4 col-lg-3 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=" "
                                    autoComplete='off'
                                    inputMode="numeric"
                                    ref={refIPreCuota}
                                    onChange={ejecutador}
                                />
                                <Form.Control.Feedback type="invalid">Ingrese un numero!</Form.Control.Feedback>
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
                        <Form.Group controlId="precioTot" className='col-sm-7 col-md-5 col-lg-4 mt-2'>
                            <div className="form-floating">
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=" "
                                    disabled
                                    ref={refIPreTotProd}
                                />
                                <label htmlFor="floatingInput">
                                    <i className="bi bi-cash-coin"> </i>
                                    Precio total del producto
                                </label>
                            </div>
                        </Form.Group>
                    </div>
                    {/* Plazo Fijo */}
                    <div className='text-center text-white'>
                        <h5 className='ps-2 p-1 rounded bg-dark d-inline-block'>Plazo Fijo</h5>
                    </div>
                    {/* Input dineroInv */}
                    <Form.Group controlId="dineroInv" className='col-7  col-sm-5 col-md-5 col-lg-4 col-xl-3 mt-2'>
                        <div className="form-floating">
                            <Form.Control
                                required
                                type="text"
                                placeholder=" "
                                autoComplete='off'
                                inputMode="numeric"
                                ref={refIDineroInv}
                            />
                            <Form.Control.Feedback type="invalid">Ingrese un numero!</Form.Control.Feedback>
                            <label htmlFor="floatingInput">
                                <i className="bi bi-coin"> </i>
                                Dinero a invertir
                            </label>
                            {precioMinInv > 0 &&
                                <div className='row m-0 justify-content-center'>
                                    <div className='ps-2 pt-2 border-1 rounded border-info' id='txt-precioMin'>
                                        <span><i className="bi bi-exclamation-circle"> </i>
                                            Dinero minimo a invertir : <span className='text-success'>${precioMinInv}</span></span>
                                    </div>
                                </div>
                            }
                        </div>
                    </Form.Group>
                    {/* Input porcentajePrazo */}
                    <Form.Group controlId="porcentajePrazo" className=' col-4 col-md-2 col-sm-5 mt-2'>
                        <div className="form-floating">
                            <Form.Control
                                required
                                type="text"
                                placeholder=" "
                                autoComplete='off'
                                inputMode="numeric"
                                onBlur={ejecutador}
                                ref={refITNA}
                            />
                            <Form.Control.Feedback type="invalid">Ingrese un porcentaje!</Form.Control.Feedback>
                            <label htmlFor="floatingInput">
                                % TNA
                            </label>
                        </div>
                    </Form.Group>
                    <div className='col-11 d-flex justify-content-end'>
                        <Button onClick={limpiar} className='btn btn-lg btn-warning col-md-2 mt-2'>Limpiar</Button>
                        <Button type="submit" className='ms-2 btn btn-lg btn-success col-md-2 mt-2'>Calcular</Button>
                    </div>
                </Form >

            </div >
            <hr className='text-white w-50 m-auto mt-5 mb-3' />

            {/* Verifica que la variable tenga datos para mostrar */}
            {
                arrayDatosXMes.length > 0 ?
                    <div className='row m-0 justify-content-center'>
                        <div className='text-white text-center ps-2 pt-2 mt-3 border border-1 rounded border-warning col-5 col-md-3' id='txt-ganaste'>
                            {arrayDatosXMes[arrayDatosXMes.length - 1].dineroBruto > 0 ? (
                                <h5><i className="bi bi-cash-coin fs-6"> </i>
                                    Ganaste: <span className='text-success'>${(arrayDatosXMes[arrayDatosXMes.length - 1].dineroBruto).toFixed(2)}</span></h5>
                            ) : (
                                <div>
                                    <h5><i className="bi bi-x-octagon fs-6"> </i>
                                        Perdiste: <span className='text-danger'>${(arrayDatosXMes[arrayDatosXMes.length - 1].dineroBruto).toFixed(2)}</span></h5>
                                    <p className='text-danger'>El dinero no fue suficiente para abonar las cuotas!</p>
                                </div>
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