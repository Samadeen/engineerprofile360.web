import React from "react";
import styles from "./UserTakeAssessment.module.css";
import UserTakeAssessmentHeader from "./UserTakeAssessmentHeader";
import { QuestionData } from "./QuestionData";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function UserTakeAssessment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState([
    {
      //answer: "",
    },
  ]);
  const answer = inputValue;

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const indexOfLastPost = currentPage * questionsPerPage;
  const indexOfFirstPost = indexOfLastPost - questionsPerPage;
  const currentPost = QuestionData.slice(indexOfFirstPost, indexOfLastPost);

  
    const Prev = () => {
      if(currentPage  > 1 ){
        return <input type="button" 
        className={styles.Button_next} 
        onClick={(e) => {
          setCurrentPage(currentPage-1)
        }}
        value="Previous" />}
      }

      const Next = () => {
        if(currentPage  < Math.ceil(QuestionData.length / questionsPerPage)){
          return <input type="button" 
          className={styles.Button_next} 
          onClick={(e) => {setCurrentPage(currentPage+1)}} 
          Value="Next" />
      }
    }
  
  return (
    <>
      <div className={styles.UserTakeAssessment_container}>
        <UserTakeAssessmentHeader />
       
        <div className={styles.Questions}>
          <form>
          {currentPost.map((assessment, i) => {
            const { question, options } = assessment;
            return (
              <div className={styles.QuestionsWrapper} key={i}>
                <p>{question}</p>
                  {options.map((query, i) => {
                    const { option } = query;
                    return (
                      <div key={i}>
                        <input
                          type="radio"
                          value={answer}
                          name={question}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                        <label htmlFor={question}>{ option }</label>
            
                      </div>
                    );
                  })}
              </div>
            );
          })}
            
            <br />

            <div className={styles.Filter_Next_Submit}>
             {<Prev />}
             {<Next />}

              <Link to="/take-assessment-result">
                <button type="button"
                className={styles.Button_submit}> Submit </button></Link>
            </div>
          </form>
        </div>
      </div>
</>
  );
}
