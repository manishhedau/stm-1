import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Modal from "./Modal";
import { deleteStudent } from "../services/apiEndPoint";


const Student = ({ student }) => {
    const { firstName, lastName, DOB, percentage, _id: id, profileImage } = student;
    const history = useHistory();

    const [isVisible, setIsVisible] = useState(false);

    const handleEditButton = () => {
        history.push(`/${id}`)
    }

    const handleDeleteButton = () => {
        setIsVisible(true);
    }

    const toggleIsConfirm = async () => {
        console.log("Toggle isConfirm");
        try {
            const res = await deleteStudent(id);
            console.log(res);
            window.location = "/";
        } catch (error) {
            console.log("error while deleting student!");
        }
        setIsVisible(false);

    }

    const toggleIsVisible = () => {
        setIsVisible(false);
    }

    return (
        <div style={{ marginBottom: "20px" }}>
            <Modal isVisible={isVisible} toggleIsVisible={toggleIsVisible} toggleIsConfirm={toggleIsConfirm} />
            <div style={{ display: 'flex' }}>
                <div>
                    <p>First Name : {firstName}</p>
                    <p>Last Name : {lastName}</p>
                    <p>Date of birth : {new Date(DOB).toDateString()}</p>
                    <p>Percentage : {percentage}</p>
                </div>
                <div>
                    <img src={`https://stm-1.herokuapp.com/${profileImage}`} alt="" width="200" height="200" />
                </div>
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleEditButton} >Edit</button>
                <button className="btn btn-primary" style={{ marginLeft: "1rem" }} onClick={handleDeleteButton}>Delete</button>
            </div>
        </div>
    )
}

export default Student
