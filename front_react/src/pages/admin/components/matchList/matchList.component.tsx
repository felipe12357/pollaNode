
import { useEffect, useState } from "react";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import './matchList.scss';
import mathService from "../../../../services/match.service";
import type { MatchDto } from "../../../../dtos/match";
import { useTableScrollDate } from "../../../../hooks/useTableScrollDate";
import { formatDate } from "../../../../utilities/date.handling";
import type { Country } from "../../../../dtos/country";
import ReactCountryFlag from "react-country-flag";

interface MatchListProps {
  matchList:MatchDto[]
  updateList:(val: MatchDto[])=>void,
  countryList: Country[],
};

const MatchListComponent:React.FC<MatchListProps> = ({matchList, updateList, countryList}) =>{
  const [selectedMatch, setMatch] = useState<MatchDto | null>();
  const [matchResultInput1, setmatchResultInput1] = useState<number>();
  const [matchResultInput2, setmatchResultInput2] = useState<number>();
  const { setRef, scroll } = useTableScrollDate();

  useEffect(() => {
    if(matchList.length > 0) {
      const today = new Date();
      scroll(today, matchList);
    }
  },[matchList]);

  const updateMatch = async() => {
    const result = await mathService.updateResult({
      result: `${matchResultInput1}-${matchResultInput2}`, 
      id:selectedMatch!.id as number,
      bonusPhase: selectedMatch!.bonusPhase
    });
    
    let matchToUpdate = matchList.find((match)=> (match.id as number) === selectedMatch?.id );
    matchToUpdate!.result = result.result;
    matchToUpdate!.bonusPhase = result.bonusPhase;

    const updatedMatchList = [...matchList]
    updateList(updatedMatchList);
    setMatch(null);
  }

  const deleteMatch = async(id:number) => {
    await mathService.deleteMatch(id);
    const newMatchList = matchList.filter((match)=> (match.id as number) !== id );

    updateList(newMatchList);
  }

  const getCountryCode = (countryName: string): string => {
    return countryList.find((country) => country.name === countryName)?.code || 'Error';
  }

  return  <div className="match-list-component">
    { matchList?.map(match =>
      <div className="match-row" key={match.id} ref={
        (element) => {
          if (element) setRef(element)
      }}>
        <div> {formatDate(match.date)} </div>
        <div> {match.team1} </div>
        <div> vs </div>
        <div> {match.team2} </div>
        <div> {
          selectedMatch?.id === match.id
          ?  <input type="checkbox" 
              checked={selectedMatch?.bonusPhase}
              onChange={(e)=> setMatch({...selectedMatch!, bonusPhase:e.target.checked})
        }></input>
          : match.bonusPhase 
            ? <FaCheck className="confirm-icon"></FaCheck>
            : <FaXmark className="cancel-icon"/>} </div>
        <div>
          <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team1)} svg />
            <span className="match-row-score">
              { selectedMatch?.id === match.id
                ? <>
                  <input type="text" onChange={(e)=>setmatchResultInput1(+e.target.value)}></input>
                  -
                  <input type="text" onChange={(e)=>setmatchResultInput2(+e.target.value)}></input>
                  </>
                : match.result ? match.result : 'N/A'
              }
            </span>
  
          <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team2)} svg />
        </div>
        {/* <div>
          {  (selectedMatch?.id === match.id)
            ? <input type="text" onChange={(e)=>setMatch({...selectedMatch!, result:e.target.value})}></input>
            : match.result ? match.result : 'N/A'
          }
        </div> */}
        <div>
          {
            (selectedMatch?.id === match.id)  
            ? <FaCheck className="confirm-icon" onClick={()=>updateMatch()}/>
            : <FaPen className="update-icon" onClick={()=>setMatch(match)}/>
          }
        </div>
        <div>
          {
            (selectedMatch?.id === match.id)
            ? <FaXmark className="cancel-icon" onClick={()=>setMatch(null)}/>
            : <FaTrash className="delete-icon" onClick={()=>deleteMatch(match.id as number)}/>
          }
        </div>
      </div>
    )}
  </div>
}

export default MatchListComponent;