import { Link } from "react-router-dom";

interface IFormButton {
  btn1: string;
  btn2: string;
}
const FormButtons: React.FC<IFormButton> = ({ btn1, btn2 }) => {
  return (
    <div className="form-input home-bar">
      <button type="submit" className="form-btn">
        {btn1}
      </button>
      <Link to="/" role="button" className="form-btn">
        {btn2}
      </Link>
    </div>
  );
};

export default FormButtons;
