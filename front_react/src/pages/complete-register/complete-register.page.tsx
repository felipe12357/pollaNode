import { useLoaderData, useNavigate } from "react-router-dom";
import type { UserLoginRDto } from "../../dtos/user";
import { useEffect } from "react";
import { useContextGlobal } from "../../contextGlobalProvider";
import { ACTION_TYPES_APP } from "../../redux/app.actions";

const CompleteRegisterPage = () =>{
  const navigate = useNavigate();
  const data = useLoaderData() as string | UserLoginRDto;
  const { dispatch } = useContextGlobal();


  useEffect(()=>{
    if(typeof data === "object" && "id" in data) {
      navigate('/home');
      dispatch({type: ACTION_TYPES_APP.SET_USER, payload:data});
    } else {
      dispatch({type: ACTION_TYPES_APP.SET_USER, payload:null});
    }
  },[data]);
  
  return (
    <>
      { typeof data === "string" && 
        <>
          <h3>Hubo un error: </h3>
          <p className="alert-container alert-container-danger">{data}</p>
        </>
      }
    </>
  )
}

export default CompleteRegisterPage;