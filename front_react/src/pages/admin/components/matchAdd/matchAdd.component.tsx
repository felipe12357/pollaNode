import { FaCheck } from 'react-icons/fa';
import './matchAdd.scss';
import { FaXmark } from 'react-icons/fa6';
import { useRef } from 'react';
import type { MatchDto } from '../../../../dtos/match';
import mathService from '../../../../services/match.service';


interface MatchAddProps {
  //para este caso no se actualiza la lista en el front, ya q no se pude insertar en la ultima
  // o primera posicion pq esta ordenado por la fecha y esto lo hace el backend
  updateList:()=>void,
  addNewMatch:(val: boolean)=>void,
};

const MatchAddComponent:React.FC<MatchAddProps> = ({updateList, addNewMatch}) =>{

  const formRef = useRef<HTMLFormElement>(null);
  const handleform = async() => {
    const formData = new FormData(formRef.current!);
    const formValue = Object.fromEntries(formData) as unknown as MatchDto;

    await mathService.addMatch(formValue);
    updateList();
  }

  // TODO AGREGAR SI TIENE BONUS DE FASE
  return <form id="matchForm" ref={formRef} className="match-add-component match-row">
    <div> <input type="text" name="team1"></input> </div>
    <div> vs </div>
    <div> <input type="text" name="team2"></input> </div>
    <div> <input type="date" name="date"></input> </div>
    <div></div>
    <div>
      <FaCheck className="confirm-icon" onClick={()=> handleform()}/>
    </div>
    <div>
      <FaXmark className="cancel-icon" onClick={()=>addNewMatch(false)}/>
    </div>
  </form>
}

export default MatchAddComponent;