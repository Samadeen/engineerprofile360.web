import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Loader,
  OverlayLoader,
  Title,
} from "../../../../styles/reusableElements.styled";
import { useState } from "react";
import { More, AddCircle } from "iconsax-react";
import AddDept, { Load } from "./AddDept";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Update from "./Update";
import { CategoryListing } from "../Categories/List";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import TableComponent from "../../molecules/TableComponent";
import PageInfo from "../../molecules/PageInfo";

function Hero() {
  //? useState HOOKS
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [AllDept, setAllDept] = useState([]);
  const [addDept, setAddDept] = useState(false);
  const [formData, setFormData] = useState("");

  const [openUpdate, setOpenUpdate] = useState(null);
  const [runEffect, setRunEffect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [departmentDetails, setDepartmentDetails] = useState({
    id: "",
    departmentName: "",
  });
  //! USE AUTH
  const { auth } = useAuth();
  const org_id = auth.org_id;

  //? ASYNC FUNCTION TO FETCH DEPARTMENTS
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        ` https://api.eval360.hng.tech/api/department/company/${org_id}`
      );

      setAllDept(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("could not fetch  departments");
    }
  };
  useEffect(() => {
    fetchDepartments();
  }, [runEffect]);

  return (
    <>
      {editModal && (
        <EditModal
          setEditModal={setEditModal}
          departmentDetails={departmentDetails}
          setRunEffect={setRunEffect}
          cancel={setOpenUpdate}
        />
      )}
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          departmentDetails={departmentDetails}
          setRunEffect={setRunEffect}
          cancel={setOpenUpdate}
        />
      )}
      <Container>
        {/* <Title as="h2" $size="28px" $color="#1E1E1E" $weight="600">
          Departments
        </Title> */}

        <PageInfo pageTitle="Departments" />
        {addDept && (
          <AddDept
            formData={formData}
            setFormData={setFormData}
            setAddDept={setAddDept}
            setRunEffect={setRunEffect}
            runEffect={runEffect}
          />
        )}
        <CRUDContainer>
          <Button
            onClick={() => {
              setAddDept(true);
            }}
            w={"210px"}
            h={"42px"}
            text={"#fff"}
            bg={"#2667ff"}
            rounded={"4px"}
            fs={"16px"}
            fw={"400"}
            lh={"20px"}
            border={"2px solid #2667ff"}
            m={" 0"}
          >
            Add New Department
          </Button>
        </CRUDContainer>
        {loading ? (
          // lOADER COMPONENT
          <OverlayLoader contained>
            <div></div>
            <span>Just a moment...</span>
          </OverlayLoader>
        ) : (
          <CategoryListing>
            <TableComponent>
              <tbody>
                <tr>
                  <th>#</th>

                  <th>Department</th>
                  <th>No of Staffs</th>
                  <th>Available Assessments</th>

                  <th>Action</th>
                </tr>

                {AllDept.length > 0
                  ? AllDept?.map((department, index) => {
                      const {
                        name: departmentName,
                        id,
                        assessment_count: assessmentCount,
                        employee_count: employeeCount,
                      } = department;

                      const handleModal = (i) => {
                        if (openUpdate === i) {
                          setOpenUpdate(null);
                        } else {
                          setOpenUpdate(index);
                        }
                      };
                      return (
                        <tr key={id}>
                          <td>{`${index + 1}.`}</td>
                          <td>{departmentName}</td>
                          <td>{employeeCount}</td>
                          <td>{assessmentCount}</td>
                          <td>
                            {/* <Button
                              disabled
                              w={"201px"}
                              h={"42px"}
                              text={"#2667ff"}
                              bg={"#fff"}
                              rounded={"4px"}
                              fs={"16px"}
                              fw={"400"}
                              lh={"20px"}
                              border={"2px solid #2667ff"}
                              m={" 0"}
                            >
                              View Departments
                            </Button> */}

                            <More
                              onClick={() => {
                                handleModal(index);
                                setDepartmentDetails({
                                  id: id,
                                  departmentName: departmentName,
                                });
                              }}
                            />
                            {openUpdate === index && (
                              <Update
                                cancel={setOpenUpdate}
                                setEditModal={setEditModal}
                                setDeleteModal={setDeleteModal}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : "Oops! you have no departments to show, create a new Department."}
              </tbody>
            </TableComponent>
          </CategoryListing>
        )}
      </Container>
    </>
  );
}
export default Hero;
// STYLED COMPONENTS
export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Button = styled.button`
  cursor: pointer;

  width: ${(props) => props.w};
  height: ${(props) => props.h};

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  line-height: ${(props) => props.lh};
  color: ${(props) => props.text};
  border-radius: ${(props) => props.rounded};
  outline: none;
  border: ${(props) => props.border || "#2667ff"};
  background-color: ${(props) => props.bg};
  transition: all 0.3s ease-in;
  margin: ${(props) => props.m};

  &:hover {
    background-color: ${(props) => props.text};
    color: ${(props) => props.bg};
    border: none;
    border: ${(props) => props.border};
    cursor: pointer;
  }

  @media (min-width: 746px) {
    width: ${(props) => props.w};
    height: ${(props) => props.h};
  }
`;

export const CRUDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
