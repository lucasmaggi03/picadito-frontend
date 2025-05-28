import { useState } from 'react';
import './Booking.css';

type BookingProps = {
    cancha: string;
    ubicacion: string;
};


export function Booking( BookingProps: BookingProps ) {
    const { cancha, ubicacion } = BookingProps;
    const [canchaa,setCancha] = useState(cancha);
    const [ubicaciona,setUbicacion] = useState(ubicacion);


    const times = ["13", '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const options = ['Cancha 1 Futbol 11', 'Cancha 2 Futbol 7', 'Cancha 3 Futbol 5', 'Cancha 4 Futbol 5']

    const [selectedCell, setSelectedCell] = useState<{ day: string; time: string } | null>(null);

    const handleCellClick = (day: string, time: string) => {
    setSelectedCell({ day, time });
    console.log(`Día seleccionado: ${day}, Horario seleccionado: ${time}`);
  };

    return(
        <>
        <div className='top-div'>
            <h1 className=''>elegi un horario</h1>
            <h4 className=''>{canchaa} - {ubicaciona}</h4>
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
                        <td className='columna'>{option}</td>
                        {times.map((time) => (
                            <td
                            key={`${option}-${time}`}
                            onClick={() => handleCellClick(option,time)}
                            className={selectedCell?.time === time && selectedCell?.option === option ? "selected" : ""}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        <h1 className='top-div'> seleccionaste la cancha estupido de mierda </h1>






        </>
    )
}