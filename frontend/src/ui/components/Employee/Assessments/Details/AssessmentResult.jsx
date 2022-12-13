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
  const data = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        label: "Categories",
        data: [0, 0, 0, 0, 0, 0],
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
          <Heading>
            <p>Name</p>
            <span>Ogharandukun-Brown Meyiwa Louis</span>
          </Heading>
          <AssessmentInfo>
            <Details>
              <Detail>
                <span>
                  <b>Name</b>
                </span>
                <p>UI/UX Engineer</p>
              </Detail>

              <Detail>
                <span>
                  <b>Name</b>
                </span>
                <p>UI/UX Engineer</p>
              </Detail>

              <Detail>
                <span>
                  <b>Percentage</b>
                </span>
                <p
                  style={{
                    color: "green",
                  }}
                >
                  96.00%
                </p>
              </Detail>
            </Details>
            <ChartDetails>
              <Radar data={data} />
              <Button fullWidth>View Full Profile</Button>
            </ChartDetails>
          </AssessmentInfo>
        </ResultContainer>
      </ResultModal>
    </>
  );
};

export default AssessmentResult;

const ResultModal = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 2;
  overflow: auto;

  background-color: rgba(255, 255, 255, 0.8);
`;

const ResultContainer = styled.div`
  width: 95%;

  // max-width: 720px;
  border-radius: ${({ theme }) => theme.spacing(2)};
  background: #f8fcfe;
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid #c7e0f4;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
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
`;

const Details = styled.div`
  flex: 0 0 calc(40% - ${({ theme }) => theme.spacing(2)});
  padding: ${({ theme }) => theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  border: 1px solid grey;
  border-radius: ${({ theme }) => theme.spacing(3)};
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
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing(6)};

  ${Button} {
    width: 100%;
    max-width: initial;
  }
`;
