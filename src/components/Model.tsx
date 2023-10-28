import { IShowError } from "../type";

interface IModel {
  showModalMsg: IShowError;
  toggleModel: () => void;
}

const Model: React.FC<IModel> = ({ showModalMsg, toggleModel }) => {
  return (
    <dialog open>
      <article>
        <a
          href="#close"
          aria-label="Close"
          className="close"
          data-target="modal-example"
          onClick={() => toggleModel()}
        ></a>
        <h3>{showModalMsg.action}</h3>
        <p>{showModalMsg.msg}</p>
      </article>
    </dialog>
  );
};

export default Model;
