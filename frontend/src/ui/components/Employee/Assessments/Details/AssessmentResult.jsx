import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import useAuth from "../../../../../hooks/useAuth";
import axios from "../../../../../api/axios";
import {
  Button,
  OverlayLoader,
} from "../../../../../styles/reusableElements.styled";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AssessmentResult = ({ assessment_id, setModal }) => {
  const { auth } = useAuth();
  const [performance, setPerformance] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        await axios
          .get(`userscore/${auth.id}/${assessment_id}`)
          .then((data) => {
            console.log(data);
            setPerformance(data.data.data[0]);
          });

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getDetails();
  }, [assessment_id]);

  const data = {
    labels: performance.userscore?.categories
      ? JSON.parse(performance.userscore?.categories)
      : ["", "", "", "", "", ""],
    datasets: [
      {
        label: "Categories",
        data: performance.userscore?.passed_questions
          ? performance.userscore?.passed_questions
          : [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(95, 210, 85, 0.2)",
        borderColor: "#107C10",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <ResultModal onClick={() => setModal(false)}>
        <ResultContainer>
          {!isLoading ? (
            <>
              <Heading>
                <p>Username</p>
                <span>John Snow</span>
              </Heading>
              <AssessmentInfo>
                <Details>
                  <Detail>
                    <span>
                      <b>Department</b>
                    </span>
                    <p>UI/UX Engineer</p>
                  </Detail>

                  <Detail>
                    <span>
                      <b>Assessment</b>
                    </span>
                    <p>UI/UX Engineer</p>
                  </Detail>

                  <Detail>
                    <span>
                      <b>Percentage</b>
                    </span>
                    <p
                      style={{
                        color:
                          performance &&
                          (
                            (performance.result / performance.total_questions) *
                            100
                          ).toFixed(2) > 50
                            ? "green"
                            : "red",
                      }}
                    >
                      {performance
                        ? (
                            (performance.result / performance.total_questions) *
                            100
                          ).toFixed(2)
                        : 0}
                      %
                    </p>
                  </Detail>
                </Details>
                <ChartDetails>
                  <Radar data={data} />
                  <Link to={`/employee/profile/${auth.id}`}>
                    <Button fullWidth $weight="400">
                      View Full Profile
                    </Button>
                  </Link>
                </ChartDetails>
              </AssessmentInfo>
            </>
          ) : (
            <OverlayLoader contained>
              <div></div>
              Loading Result...
            </OverlayLoader>
          )}
        </ResultContainer>
      </ResultModal>
    </>
  );
};

export default AssessmentResult;

const ResultModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 190px;
  left: 50%;
  transform: translate(-50%, -15%);
  z-index: 2;

  background-color: rgba(255, 255, 255, 0.8);
`;

const ResultContainer = styled.div`
  width: 95%;
  border-radius: ${({ theme }) => theme.spacing(2)};
  background: #f8fcfe;
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid #c7e0f4;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)} 0;

  span {
    color: #323130;
    font-size: 20px;
    font-weight: 600;
  }
`;

const AssessmentInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => theme.breakpoints.down("touch")} {
    flex-direction: column;
    width: 80%;
    margin: auto;
    gap: ${({ theme }) => theme.spacing(6)};
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`;

const Details = styled.div`
  flex: 0 0 calc(40% - ${({ theme }) => theme.spacing(2)});
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  border: 1px solid grey;
  border-radius: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down("touch")} {
    width: 100%;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing(3)};
  background: #ffffff;
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.spacing(2)};

  p {
    font-size: 24px;
    color: #323130;
    font-weight: 600;
  }

  span {
    font-size: 16px;
    color: #323130;
  }
`;

const ChartDetails = styled.div`
  flex: 0 0 calc(55% - ${({ theme }) => theme.spacing(2)});
  max-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 0 ${({ theme }) => theme.spacing(1.5)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};

  ${({ theme }) => theme.breakpoints.down("touch")} {
    width: 100%;
  }

  a {
    width: 100%;
  }

  ${Button} {
    width: 100%;
    max-width: 100%;
  }
`;
