import DataTable, { createTheme } from 'react-data-table-component';
import './css/TablaMes.css'
import { useEffect } from 'react';

const TablaMes = ({ data }) => {


    /* Contenido expandible */
    const ExpandedComponent = ({ data }) => {
        return (
            <div className='col-12'>
                <div className='ms-2 ps-2 p-1' id='tabla-txt-expandible'>
                    <p><strong>Dinero bruto x mes:</strong> ${data.dineroInv.toFixed(2)}</p>
                    <p><strong>Interes Plazo Fijo:</strong> ${data.dineroGanado.toFixed(2)}</p>
                    <p><strong>Precio descontando la cuota:</strong> ${data.dineroBruto.toFixed(2)}</p>
                </div>
                <hr className='m-2' />
            </div>
        )
    };

    /* Columnas */
    const columns = [
        {
            name: 'Cuota',
            selector: row => row.mes,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Dinero bruto x mes',
            selector: row => '$' + row.dineroInv.toFixed(2),
            sortable: true,
            width: '240px',
            hide:'sm'
        },
        {
            name: 'Interes Plazo Fijo',
            selector: row => '$' + row.dineroGanado.toFixed(2),
            sortable: true,
            width: '330px',
            hide: 'md',
        },
        {
            name: 'Precio descontando la cuota',
            selector: row => '$' + row.dineroBruto.toFixed(2),
            sortable: true,
            width: '340px',
            hide: 'lg',
        },
    ];

    /* Crea un tema personalizado */
    createTheme('solarized', {
        text: {
            primary: '#FFFFFFFF',
        },
        background: {
            default: 'transparent',
        },
        context: {
            background: '#c4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#494949',
        },

    }, 'dark');

    /* Eestilos customisables */
    const customStyles = {
        headCells: {
            style: {
                fontSize: '20px',
                justifyContent: 'center',
                fontFamily: 'Rubik',
                backgroundCOlor: '#00000',
            },
        },
        cells: {
            style: {
                fontSize: '18px',
                fontFamily: 'Rubik',
                justifyContent: 'center',

            },
        },
    };

    return (
        <div className='mt-3 rounded col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-10' id='tabla-datos'>
            <DataTable
                columns={columns}                                                                            //Aqui se inserta las columnas previamente configuradas
                data={data}                                                                                  //Aqui se inserta los datos que van en la tabla
                expandableRows                                                                               //Agrega las columnas expandibles
                responsive                                                                                   //Agrega Responsive al agrandar y achicar la pantalla
                highlightOnHover                                                                             //Agrega Efecto Hover
                pointerOnHover                                                                               //Agrega el efecto de click
                expandableRowsComponent={ExpandedComponent}                                                  //Introduce el contenido que va a tener las columnas expandibles
                theme='solarized'                                                                            //Aqui se agrega el tema
                customStyles={customStyles}                                                                  //Aqui agrega estilo
            />
        </div>
    )
}

export default TablaMes