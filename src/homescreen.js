import React, { useState, useEffect } from 'react';
import './homescreen.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash'
import Select from "react-select";

function HomeScreen() {
    const [submitted, setSubmitted] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [departmentData,setDepartmentData]=useState([]);
    const [employeeDataAvailable, setEmployeedataAvailable] = useState(false);
    const [projectDataAvailable, setProjectDataAvailable] = useState(false);
    const [departmentDataAvailable, setDepartmentDataAvailable] = useState(false);
    const [dataProcessed, setDataProcessed] = useState(false)
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [allocationData, setAllocationData] = useState([]);
    const navigate = useNavigate();
    // const userLogged = localStorage.getItem('userAvailable')
    // if (_.isEmpty(userLogged)) {
    //     navigate('/')
    // }
    const [formData, setFormData] = useState({
        empid: '',
        projectid: [],
        departmentid:[]
    });

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/getEmployee')
            .then(response => {
                setEmployeeData(JSON.parse(response.data));
                setEmployeedataAvailable(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/getProjects')
            .then(response => {
                setProjectData(JSON.parse(response.data));
                setProjectDataAvailable(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/getDepartments')
            .then(response => {
                setDepartmentData(JSON.parse(response.data));
                setDepartmentDataAvailable(true)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    useEffect(() => {
        axios
            .get('http://localhost:5000/api/getEmployeeAllocation')
            .then(response => {
                console.log(JSON.parse(response.data))
                setAllocationData(JSON.parse(response.data));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target)
        console.log(formData)
        axios.post('http://localhost:5000/api/postEmployeeAllocation', formData)
            .then(response => {
                console.log(response.data);
                if (response.data.result == 'Processed') {
                    axios
                    .get('http://localhost:5000/api/getEmployeeAllocation')
                    .then(response => {
                        console.log(JSON.parse(response.data))
                        setAllocationData(JSON.parse(response.data));
                    })
                    .catch(error => {
                        console.error(error);
                    });
                    setDataProcessed(true)
                }
            })
            .catch(error => {
                console.error(error);
            });
        console.log('formData', formData)
        setSubmitted(true);
    };

    const resetForm = () => {
        setSubmitted(false);
        setDataProcessed(false)
        setSelectedOptions([])
        setSelectedValues([])
        setAllocationData([])


    };

    const handleProjectSelect = (data) => {
        setSelectedValues(data)
        const selectedProjectIds = data.map(option => option.value);
        setFormData({ ...formData, projectid: selectedProjectIds });

    }

    const handleDepartmentSelect = (data) => {
        setSelectedDepartment(data)
        const selectedDepartments = data.map(option => option.value);
        setFormData({ ...formData, departmentid: selectedDepartments });

    }


    const handleEmployeeSelect = (data) => {
        setSelectedOptions(data)
        setFormData({ ...formData, empid: data.value });
    }
    const viewPage = () => {
        navigate('/')
    }
    return (
        <div className="home-container">
            {!submitted ? (
                <div className="screen-1">
                    <h2>Employee Mapping</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Employee:</label>
                            {/* <select name='empid' value={formData.empid} onChange={handleOptionChange} > */}
                            {/* <option value="">Select an employee</option> */}
                            {
                                employeeDataAvailable ? (
                                    // employeeData.map((employee, index) => (
                                    //     <option key={index} value={employee.id}>
                                    //         {employee.name}
                                    //     </option>
                                    // ))
                                    <Select name="empid"
                                        options={employeeData}
                                        placeholder="Select an Employee"
                                        onChange={handleEmployeeSelect}
                                        value={selectedOptions}
                                        isMulti={false}
                                    />

                                ) : (
                                    <option disabled>Loading employees...</option>
                                )}
                            {/* </select> */}
                        </div>
                        <div className="form-group">
                            <label>Projects:</label>
                            {/* <select name="projectid"  value={selectedValues} onChange={handleOptionChange} multiple > */}
                            {/* Add "multiple" attribute to allow selecting multiple options */}
                            {projectDataAvailable ? (
                                //   projectData.map((project, index) => (
                                //     <option key={index} value={project.id}>
                                //       {project.name}
                                //     </option>
                                //   ))
                                <Select name="projectid"
                                    options={projectData}
                                    placeholder="Select the Project"
                                    onChange={handleProjectSelect}
                                    value={selectedValues}
                                    isMulti={true}
                                />
                            ) : (
                                <option disabled>Loading Projects...</option>
                            )}

                            {/* </select> */   console.log(selectedValues)}

                        </div>
                        <div className="form-group">
                            <label>Departments:</label>
                            {/* <select name="projectid"  value={selectedValues} onChange={handleOptionChange} multiple > */}
                            {/* Add "multiple" attribute to allow selecting multiple options */}
                            {departmentDataAvailable ? (
                                //   projectData.map((project, index) => (
                                //     <option key={index} value={project.id}>
                                //       {project.name}
                                //     </option>
                                //   ))
                                <Select name="departmentid"
                                    options={departmentData}
                                    placeholder="Select the department"
                                    onChange={handleDepartmentSelect}
                                    value={selectedDepartment}
                                    isMulti={true}
                                />
                            ) : (
                                <option disabled>Loading Departments...</option>
                            )}

                            {/* </select> */   console.log(selectedDepartment)}

                        </div>
                        <button type="submit">Submit</button>


                    </form>

                </div>
            ) : (
                <div className="screen-2">
                    {
                        dataProcessed ?  <table className="table">
                        <thead>
                          <tr>
                            <th>EmpID</th>
                            <th>Employeename</th>
                            <th>ProjectID's</th>
                            <th>ProjectNames</th>
                            <th>Departmentname</th>
                            <th>DepartmentID's</th>

                          </tr>
                        </thead>
                        <tbody>
                          {allocationData.map((item, index) => (
                            <tr key={index}>
                              <td>{item.empid}</td>
                              <td>{item.employeename}</td>
                              <td>{[JSON.stringify(item.project_ids.filter((value) => value !== null))]}</td>
                              <td>{[JSON.stringify(item.project_name.filter((value) => value !== null))]}</td>
                              <td>{JSON.stringify(item.departmentname.filter((value) => value !== null))}</td>
                              <td>{[JSON.stringify(item.departmentids.filter((value) => value !== null))]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    : <h2>Failed </h2>
                    }

                    <div>
                        <button onClick={resetForm}>Go Back</button>
                    </div>


                </div>

            )}
        </div>
    );
}

export default HomeScreen;
