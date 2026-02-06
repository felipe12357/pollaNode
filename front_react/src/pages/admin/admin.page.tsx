import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import type { MatchDto } from "../../dtos/match";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import './admin.scss';
import MatchListComponent from "../../components/matchList/matchList.component";
import MatchAddComponent from "../../components/matchAdd/matchAdd.component";
import { FaPlus } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const AdminPage = () =>{
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const {data, error:loadingError} = useLoaderData() as {data?: MatchDto[], error?:string};
  const currentLoadingError = useRef<string | undefined>('');
  const [matchList, setmatchList] = useState<MatchDto[]>([]);
  const [showAddMatchButton, setshowAddMatchButton] = useState<Boolean>(false);
  
  
  useEffect(() => {
    if(loadingError && currentLoadingError.current !== loadingError) 
      toast.error(`Error loading matches: ${loadingError}`);

    currentLoadingError.current = loadingError;
  }, [loadingError]);

  useEffect(()=>{
    if(data)
      setmatchList(data);
  },[data])

  const handleNavigate = () => {
    navigate('/home');
  }

  return (
    <div className="admin-component">
      <div className="admin-component_menu">
        <button className="button button-primary" onClick={() => handleNavigate()} >
          <FaHome /> Home
        </button>
        <button className="button" onClick={() => setshowAddMatchButton(true)} >
          <FaPlus /> Add Match
        </button>
      </div>
      <div className="match-row header">
        <div className="match-row_header-match"> Partido </div>
        <div> Fecha </div>
        <div> Resultado </div>
        <div className="match-row_header-actions"> Acciones </div>
        { showAddMatchButton && <MatchAddComponent updateList={() =>revalidate()} addNewMatch={(e) => setshowAddMatchButton(e) }/> }
        
      </div>
      { (!loadingError) && <MatchListComponent matchList={matchList} updateList={(e) =>setmatchList(e)} /> }
    </div>
  )
}

export default AdminPage;