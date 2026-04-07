import { Form, useActionData, useNavigate } from "react-router-dom";
import './login.scss';
import type { UserLoginRDto } from "../../dtos/user";
import { useContextGlobal } from "../../contextGlobalProvider";
import { ACTION_TYPES_APP } from "../../redux/app.actions";
import { useEffect } from "react";


const LoginPage = () =>{
  const navigate = useNavigate();
  const { dispatch } = useContextGlobal();
  const actionData: UserLoginRDto | undefined = useActionData();

  useEffect(() => {
    dispatch({type: ACTION_TYPES_APP.SET_USER, payload:null})
  },[])

  useEffect(()=>{
    if(actionData){
      dispatch({type: ACTION_TYPES_APP.SET_USER, payload:actionData});
      navigate('/home');
    }
  },[actionData])

  return(
    <Form className='container login-component' method='post'>
      <div>
          <div>
              <label htmlFor="username"> Nombre de Usuario: </label>
              <input type="text" name="username" id="user" required defaultValue='pepes'></input>
          </div>

          <div>
              <label htmlFor="password"> Contraseña: </label>
              <input type="password" name="password" id="password" required defaultValue='EraseAvezCruz2020'></input>
          </div>
      </div>
      <div>
        <button className='button button-primary' type="button" onClick={()=>navigate('/register')}>Registrarse</button>
        <button className='button'>Ingresar</button> 
      </div>
    </Form>
  )
}

export default LoginPage;