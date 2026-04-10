import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import './register.scss';
import { toast } from "react-toastify";
import { GiSoccerBall } from "react-icons/gi";


const RegisterPage = () =>{
  const actionData: unknown = useActionData();
  const navigate =  useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(()=>{
    if(actionData) {
      toast.success('Revisa el correo electrónico para terminar el proceso');
      navigate('/');
    }
  },[actionData])

  return(
    <Form className='container register-component' method='post'>
      <div>
          <div>
              <label htmlFor="username"> Nombre de Usuario: </label>
              <input type="text" name="username" id="user" required defaultValue='felipe'></input>
          </div>
          <div>
              <label htmlFor="username"> Correo Electrónico: </label>
              <input name="email" id="email" required defaultValue='andrewt12357@hotmail.com'></input>
          </div>
          <div>
              <label htmlFor="password"> Contraseña: </label>
              <input type="password" name="password" id="password" required defaultValue='holamundo123'></input>
          </div>
      </div>
      <div>
      <button className={`button button-primary ${isSubmitting && "button-primary_disabled"} `} disabled={isSubmitting}>
        <span>Registrarse</span> 
        { isSubmitting && <GiSoccerBall className="loading-icon"/> }
      </button>
      </div>
    </Form>
  )
}

export default RegisterPage;