import { useLoaderData, useNavigate } from "react-router-dom";
import type { MatchDto } from "../../dtos/match";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const AdminPage = () =>{
  const navigate = useNavigate();
  const {data:matchList, error:loadingError} = useLoaderData() as {data?: MatchDto[], error?:string};
  const currentLoadingError = useRef<string | undefined>('');

  useEffect(() => {
    if(loadingError && currentLoadingError.current !== loadingError) 
      toast.error(`Error loading matches: ${loadingError}`);

    currentLoadingError.current = loadingError;
  }, [loadingError]);

  const handleNavigate = () => {
    navigate('/home');
  }

  return (
      <div> Admin page  
        { (!loadingError) && matchList?.map((match) => (
          <div key={match.id}>
            <p>{match.team1} vs {match.team2} on {match.date} - Result: {match.result ? match.result : 'N/A'}</p>
          </div>
         )) }

         <button onClick={() => handleNavigate()} > configure</button>
      </div>
  )
}

export default AdminPage;