import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import { getStudent, updateStudent } from "../services/apiEndPoint";

function StudentForm() {
    const params = useParams();
    const id = params.id;
    const [formData, setForm] = useState({
        firstName: '',
        lastName: '',
        percentage: '',
        DOB: '',
        profileImage: ""
    });
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getStudentDetails = useCallback(async () => {
        setError("");
        setIsLoading(true);
        try {
            const res = await getStudent(id);
            const student = await res.data;
            setForm(student)
        } catch (error) {
            setError("Somthing went wrong!");
        }
        setIsLoading(false);
    }, [id])

    useEffect(() => {
        getStudentDetails();
    }, [getStudentDetails])


    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    const handleFirstNameChange = (e) => {
        setForm((state) => ({ ...state, firstName: e.target.value }));
    }

    const handleLastNameChange = (e) => {
        setForm((state) => ({ ...state, lastName: e.target.value }));
    }

    const handlePercentageChange = (e) => {
        setForm((state) => ({ ...state, percentage: e.target.value }));
    }

    const handleDateOfBirthChange = (e) => {
        setForm((state) => ({ ...state, DOB: e.target.value }));
    }

    const handleUpdateStudent = async () => {
        try {
            const res = await updateStudent(id, formData);
            console.log(res);
            window.location = "/";
        } catch (error) {
            console.log("Error");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUpdateStudent();
    }

    const date = new Date(formData?.DOB);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const todayDate = String(date.getDate()).padStart(2, '0');
    const datePattern = year + '-' + month + '-' + todayDate;
    return (
        <div className="container">
            <h3 className="display-6">Edit Student Details</h3>
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={formData.firstName}
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={formData.lastName}
                        onChange={handleLastNameChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Percentage</label>
                    <input
                        type="number"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        min="0"
                        max="100"
                        required
                        value={formData.percentage}
                        onChange={handlePercentageChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        value={datePattern}
                        onChange={handleDateOfBirthChange}
                    />
                </div>
                <div className="mb-3">
                    {formData.profileImage && <img height="150" width="150" src={`https://stm-1.herokuapp.com/${formData.profileImage}`} alt="Somthing" />}
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default StudentForm
