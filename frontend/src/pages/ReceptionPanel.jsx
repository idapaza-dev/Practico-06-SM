import Patients from './Patients';
import Appointments from './Appointments';

export default function ReceptionPanel(){
  return (
    <div>
      <h2>Panel Recepcionista</h2>
      <Patients />
      <Appointments />
    </div>
  );
}
