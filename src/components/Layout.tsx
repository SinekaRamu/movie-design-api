import { useEffect } from "react";
import React from "react";
// import Model from "./Model";
// import { IShowError } from "../type";

interface ILayout {
  title: string;
  children: React.ReactNode;
}
const Layout: React.FC<ILayout> = ({ title, children }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  // const [showModal, setShowModal] = useState(false);
  // const [showModalMsg, setShowModalMsg] = useState<IShowError>({
  //   action: "",
  //   msg: "",
  // });
  // useEffect(() => {
  //   const asyncFunctionResult = showModalMsg.action; // Replace with your async logic

  //   if (asyncFunctionResult) {
  //     setShowModal(true);
  //   }
  // }, []);
  // const toggleModal = () => {
  //   setShowModal((prevShowModal) => !prevShowModal);
  // };
  
  return (
    <>
      <main className="container-fluid">{children}</main>
      {/* {showModal&&<Model
            showModalMsg={showModalMsg}
            toggleModel={toggleModal}
          />} */}
    </>
  );
};

export default Layout;
