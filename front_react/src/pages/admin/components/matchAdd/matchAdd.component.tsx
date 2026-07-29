import { FaCheck } from 'react-icons/fa';
import './matchAdd.scss';
import { FaXmark } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import type { MatchResponse } from '../../../../dtos/match';
import mathService from '../../../../services/match.service';
import type { Country } from '../../../../dtos/country';
import { InputTypeSearchAdapter } from '../../../../utilities/inputTypeSerch.adapter';
import SearchSelectComponent, { type InputTypeSearch } from '../../../../utilities/components/searchSelect.component';
import { toast } from 'react-toastify';


interface MatchAddProps {
  //para este caso no se actualiza la lista en el front, ya q no se pude insertar en la ultima
  // o primera posicion pq esta ordenado por la fecha y esto lo hace el backend
  updateList:()=>void,
  addNewMatch:(val: boolean)=>void,
  countryList: Country[]
};

const MatchAddComponent:React.FC<MatchAddProps> = ({updateList, addNewMatch, countryList}) =>{
  const [countryKeyValues, setcountryKeyValues] = useState<InputTypeSearch[]>([]);
  
  useEffect(()=>{
    if(countryList){
      const response = InputTypeSearchAdapter(countryList,'name', 'code');
      setcountryKeyValues(response);
    }
  },[countryList])

  const formRef = useRef<HTMLFormElement>(null);

  const validateTeam = (team:string): Boolean => {
    const position = countryList.findIndex((e)=> e.name === team);

    return position >=0;
  }


  const handleform = async() => {
    const formData = new FormData(formRef.current!);
    const formValue = Object.fromEntries(formData) as unknown as MatchResponse;

    if(!validateTeam(formValue.team1) || !validateTeam(formValue.team2)) {
      toast.error(`Hubo un error: uno o dos de los equipos seleccionados no son validos`);
    } else {
      if (formRef.current?.checkValidity() ) {
        formValue.bonusPhase = formData.get('bonusPhase') !== null
        await mathService.addMatch(formValue);
        updateList(); 
      } else 
        formRef.current?.reportValidity()
    }
  }

  return <form id="matchForm" ref={formRef} className="match-add-component match-row">
    <div> <input type="datetime-local" name="date" required></input> </div>
    <div>
      <SearchSelectComponent inputTypeSearch={countryKeyValues} nameProperty='team1' isRequired={true}></SearchSelectComponent>
    </div>
    <div> vs </div>
    <div>
      <SearchSelectComponent inputTypeSearch={countryKeyValues} nameProperty='team2' isRequired={true}></SearchSelectComponent> 
    </div>
    <div> <input type="checkbox" name="bonusPhase"/> </div>
    <div> </div>
    <div>
      <FaCheck className="confirm-icon" onClick={()=> handleform()}/>
    </div>
    <div>
      <FaXmark className="cancel-icon" onClick={()=>addNewMatch(false)}/>
    </div>
  </form>
}

export default MatchAddComponent;