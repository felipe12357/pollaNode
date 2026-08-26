import { useRouteError } from "react-router-dom";
import './error.scss';

const ErrorComponent = () => {
  const error = useRouteError();

  return (
    <div className="error-component">
      <h2>Ocurrió un error</h2>
      <pre>{String(error)}</pre>
    </div>
  );
}

export default ErrorComponent;