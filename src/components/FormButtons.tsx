import { Link } from "react-router-dom";
import Loading from "./Loading";

interface IFormButton {
  btn1: string;
  btn2: string;
  isLoading?: boolean;
  setIsLoading?: (b: boolean) => void;
}
const FormButtons: React.FC<IFormButton> = ({ btn1, btn2, isLoading }) => {
  return (
    <div className="form-input home-bar">
      <button type="submit" className="form-btn" disabled={isLoading}>
        {isLoading ? <Loading /> : <>{btn1}</>}
      </button>
      <Link to="/" role="button" className="form-btn">
        {btn2}
      </Link>
    </div>
  );
};

export default FormButtons;
