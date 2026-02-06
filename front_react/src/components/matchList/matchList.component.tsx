
import { useState } from "react";
import type { MatchDto } from "../../dtos/match";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import mathService from "../../services/match.service";
import './matchList.scss';

interface MatchListProps {
  matchList:MatchDto[]
  updateList:(val: MatchDto[])=>void,
};

const MatchListComponent:React.FC<MatchListProps> = ({matchList, updateList}) =>{
  const [selectedMatchID, setMatchId] = useState<number | null>();
  const [matchInput, setMatchInput] = useState<string>('');

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

  return  matchList?.map(match =>
    <div className="match-row match-list-component" key={match.id}>
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
  )
}

export default MatchListComponent;