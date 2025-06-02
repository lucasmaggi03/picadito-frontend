import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import './Booking.css';
import { Complex } from '../../types';



export function Booking( ) {
    const location = useLocation()
    const { complex } = location.state as { complex: Complex } || {};




    const times = ["13HS", '14HS', '15HS', '16HS', '17HS', '18HS', '19HS', '20HS', '2HS', '22HS', '23HS']
    const options = ['Cancha 1 Futbol 11', 'Cancha 2 Futbol 7', 'Cancha 3 Futbol 5', 'Cancha 4 Futbol 5']

    const [selectedCell, setSelectedCell] = useState<{ time: string; option: string } | null>(null);

    const handleCellClick = (time: string, option: string) => {
    setSelectedCell({ option, time });
    
    console.log(`cancha seleccionado: ${option}, Horario seleccionado: ${time}`);
    console.log(selectedCell?.time)
  };

    return(
        <>
        <div className='top-div'>
            <h1 className=''>elige un horario</h1>
            <h4 className=''>{complex.name} - {complex.address}</h4>
        </div>
        <div className='info-div'>
            <div className='green'></div>
            <h2>Disponible</h2>
            <div className='red'></div>
            <h2>Reservado</h2>
        </div>


        <table className='options'>
            <thead>
                <tr>
                    <th>Opciones</th>
                    {times.map((time) => (
                        <th key={time}>{time}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {options.map((option) => (

                    <tr key={option}>
                        <td className='columns'>{option}</td>
                        {times.map((time) => (
                            <td
                            key={`${option}-${time}`}
                            onClick={() => handleCellClick(time,option)}
                            className={selectedCell?.time === time && selectedCell?.option === option ? "selected-cell" : ""}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        <h1 className='top-div'> seleccionaste la cancha estupido de mierda </h1>






        </>
    )
}