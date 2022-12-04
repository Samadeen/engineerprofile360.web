import React from "react";
import { Button, Title } from "../../../styles/reusableElements.styled";
import styled from "styled-components";
import { ReactComponent as UserPhoto } from "./assets/user-photo.svg";
import PageInfo from "../../components/molecules/PageInfo";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { Radar } from "react-chartjs-2";
import { Link } from "react-router-dom";

//ChartData Schema
const data = {
  labels: ["Javascript", "PHP", "Java", "ReactJs", "Nodejs", "WordPress"],
  datasets: [
    {
      label: "Dataset",
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgb(255, 99, 132)",
      pointBackgroundColor: "rgb(255, 99, 132)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(255, 99, 132)",
    },
  ],
};

const ResultStatCard = ({ name, status, bgColor }) => {
  return (
    <ResultStat style={{ backgroundColor: bgColor ? bgColor : "" }}>
      <p>{name}</p>
      <p>{status}</p>
    </ResultStat>
  );
};

const UserCard = ({ name, value, color }) => {
  return (
    <UserInfoCard>
      <p>{name}</p>
      <Title
        as="h5"
        $weight="600"
        $lHeight="28px"
        $color={color ? color : "#605e5c"}
        $size="20px"
      >
        {value}
      </Title>
    </UserInfoCard>
  );
};

const UserAssessmentResult = () => {
  const { auth } = useAuth();

  const [, setUserAssessmentResultDetails] =
    React.useState(null);
  const [, setUserAssessmentDetailLoading] = React.useState(false);

  //Get Employee Details
  React.useEffect(() => {
    const getUserAssessmentResult = async () => {
      try {
        const response = await axios.get(`user-assessment/${auth.id}`);
        setUserAssessmentResultDetails(response.data);
        setUserAssessmentDetailLoading(false);
      } catch (err) {
        if (!err?.response) {
          // showErrorToast("No Server Response");
        } else if (err?.response.data.errorState === true) {
          // showErrorToast(err.response.data.message);
        }
      }
    };
    getUserAssessmentResult();
  }, [auth.id]);

  const UserProfileData = [
    { title: "Name", value: auth.username },
    { title: "Department", value: "UX Engineer" },
    { title: "Course", value: "Design Thinking 901" },
    { title: "Percentage", value: "93.3%", color: "#107C10" },
  ];

  const ResultStats = [
    { title: "Design Research 203", status: "Completed", bgColor: "#F8FBFD" },
    { title: "Prototyping And Flow 205", status: "Completed" },
    { title: "User experience on WebApp", status: "Completed" },
    { title: "User experience on Mobile", status: "Completed" },
  ];

  const BreadCrumbList = [
    { name: "Employees" },
    { name: "Profiles" },
    { name: auth.username },
  ];
  return (
    <>
      <PageInfo
        pageTitle="User Assessment Result"
        breadcrumb={BreadCrumbList.map((item, key) => (
          <React.Fragment key={key}>{item.name}</React.Fragment>
        ))}
      />
      <UserAssessmentContainer>
        <ProfileStatsCard>
          <UserPhotoContainer>
            <UserPhoto />
          </UserPhotoContainer>
          {UserProfileData
            ? UserProfileData.map((item, key) => (
                <UserCard
                  key={key}
                  name={item.title}
                  value={item.value}
                  color={item.color}
                />
              ))
            : ""}
        </ProfileStatsCard>
        <ChartContainer>
          <Chart>
            <Radar data={data} />
          </Chart>
          <Result>
            <Title
              as="h5"
              $weight="600"
              $lHeight="28px"
              $color="#605e5c"
              $size="20px"
            >
              Assessment Result
            </Title>
            <ResultStatsContainer>
              {ResultStats
                ? ResultStats.map((item, key) => (
                    <ResultStatCard
                      key={key}
                      name={item.title}
                      status={item.status}
                      bgColor={item.bgColor}
                    />
                  ))
                : ""}
            </ResultStatsContainer>
          </Result>
        </ChartContainer>
        <ButtonContainer>
          <Button
            style={{ backgroundColor: "#fff", border: "1px solid #2667FF" }}
            $color="#2667FF"
          >
            Recommend Staff for Promotion
          </Button>

          <Link to="/employees/full-profile">
            {" "}
            <Button>View Full Profile </Button>
          </Link>
        </ButtonContainer>
      </UserAssessmentContainer>
    </>
  );
};

export default UserAssessmentResult;

const UserAssessmentContainer = styled.div`
  padding: 0px 9px;
`;

const ProfileStatsCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #edebe9;
  border-radius: 8px;
  padding: 19px 20px;
  gap: 30px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;
  }
`;

const UserPhotoContainer = styled.div`
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-bottom: 20px;
  }
`;

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    line-height: 22px;
    color: #a19f9d;
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 24px;
  margin-top: 32px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 18px;
  background: #f8fbfd;
  border-radius: 8px;
  min-height: 460px;
`;

const Result = styled.div`
  border: 1px solid #edebe9;
  border-radius: 8px;
  min-height: 430px;
  width: 90%;
  padding: 19px 13px;
`;

const ResultStatsContainer = styled.div`
  margin-top: 40px;
`;

const ResultStat = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 19px;
  gap: 10px;
  background-color: #faf9f8;
  border-radius: 4px;
  margin-bottom: 20px;
  margin-right: -50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
  width: 100%;
  margin-bottom: 104px;

  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }

  button {
    width: 100%;
    max-width: 565px;
  }
  a {
    width: 100%;
    max-width: 565px;
  }
`;
