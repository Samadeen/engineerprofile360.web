import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { MainContainer } from "../../../styles/reusableElements.styled";
import Main from "./StyledAdminCSVUpload";

import { BsCloudUpload, BsPlusCircle, BsCheckCircle } from "react-icons/bs";
import { useState } from "react";

const AdminCSVUpload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const browseBtnHandler = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsCompleted(true)
    }, 4000)
  }
  return (
    <>
      <Header />
      <MainContainer>
        <Sidebar />
        <Main>
          <nav>
            <ul>
              <li>Upload CSV File</li>
              <li>Create assessment manually </li>
            </ul>
          </nav>
          <section>
            <div>
            <BsCloudUpload className="icon" color="#696969" />
            <p>Drag and drop CSV</p>
            </div>
            <div className="buttons">
              <button>Cancel</button>
              <button onClick={browseBtnHandler}><BsPlusCircle className="plus-icon" /> Browse Computer</button>
            </div>        
          </section>
        </Main>
      </MainContainer>
    </>
  );
};

export default AdminCSVUpload;
