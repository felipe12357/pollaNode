
import { useEffect, useState } from "react";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import './matchList.scss';
import mathService from "../../../../services/match.service";
import type { MatchDto } from "../../../../dtos/match";
import { useTableScrollDate } from "../../../../hooks/useTableScrollDate";

interface MatchListProps {
  matchList:MatchDto[]
  updateList:(val: MatchDto[])=>void,
};

const MatchListComponent:React.FC<MatchListProps> = ({matchList, updateList}) =>{
  const [selectedMatchID, setMatchId] = useState<number | null>();
  const [matchInput, setMatchInput] = useState<string>('');
  const { setRef, scroll } = useTableScrollDate();

  useEffect(() => {
    if(matchList.length > 0) {
      const today = new Date();
      scroll(today, matchList);
    }
  },[matchList]);

  const updateMatch = async() => {
    const result = await mathService.updateResult({result:matchInput, id:selectedMatchID as number});
    setMatchId(null);
    let matchToUpdate = matchList.find((match)=> (match.id as number) === selectedMatchID );
    matchToUpdate!.result = result.result;

    const updatedMatchList = [...matchList]
    updateList(updatedMatchList);
  }

  const deleteMatch = async(id:number) => {
    await mathService.deleteMatch(id);
    const newMatchList = matchList.filter((match)=> (match.id as number) !== id );

    updateList(newMatchList);
  }

  // todo AGREGAR SI TIENE BONUS
  return  <div className="match-list-component">
    { matchList?.map(match =>
      <div className="match-row" key={match.id} ref={
        (element) => {
          if (element) setRef(element)
      }}>
        <div> {match.team1} </div>
        <div> vs </div>
        <div> {match.team2} </div>
        <div> {match.date} </div>
        <div>
          {  (selectedMatchID === match.id)
            ? <input type="text" onChange={(e)=>setMatchInput(e.target.value)}></input>
            : match.result ? match.result : 'N/A'
          }
        </div>
        <div>
          {
            (selectedMatchID === match.id)  
            ? <FaCheck className="confirm-icon" onClick={()=>updateMatch()}/>
            : <FaPen className="update-icon" onClick={()=>setMatchId(match.id as number)}/>
          }
        </div>
        <div>
          {
            (selectedMatchID === match.id)
            ? <FaXmark className="cancel-icon" onClick={()=>setMatchId(null)}/>
            : <FaTrash className="delete-icon" onClick={()=>deleteMatch(match.id as number)}/>
          }
        </div>
      </div>
    )}
  </div>
}

export default MatchListComponent;