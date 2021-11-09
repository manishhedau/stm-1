import React, { useState, useEffect, useCallback } from 'react'
import { fetchAllStudents } from "../services/apiEndPoint";
import { getAllStudents, sortByBirthDay, sortByIncreasePercent, sortByDecreasePercent } from "../store/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Student from '../components/Student';

import { useHistory } from "react-router-dom";



function StudentsList() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('');

    const dispatch = useDispatch();
    const students = useSelector(state => state);
    const history = useHistory();

    const getAllStudent = useCallback(
        async () => {
            setError("");
            setIsLoading(true);
            try {
                const res = await fetchAllStudents();
                const data = await res.data;
                dispatch(getAllStudents(data));

            } catch (error) {
                setError("Error is occured")
            }
            setIsLoading(false);
        },
        [dispatch],
    )

    useEffect(() => {
        getAllStudent();
    }, [getAllStudent])

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    const handleClick = () => {
        console.log("Clicked!");
        history.push("/create");
    }

    const changeHandler = (e) => {
        const filter = e.target.value;
        setFilter(filter);

        if (filter === "latest_dob")
            dispatch(sortByBirthDay(students));
        if (filter === "increase")
            dispatch(sortByIncreasePercent(students));
        if (filter === "decrease")
            dispatch(sortByDecreasePercent(students));
    }


    return (
        <div>
            <div style={{ display: 'flex', flexDirection: "column", width: '40%', marginBottom: "1rem" }}>
                <h5>filter</h5>
                <select id="filter_name" value={filter} onChange={changeHandler} style={{ marginBottom: "1rem" }}>
                    <option value="" >none</option>
                    <option value="latest_dob">Latest B'day</option>
                    <option value="increase">Percentage increase</option>
                    <option value="decrease">Percentage decrease</option>
                </select>
                <button onClick={handleClick} className="btn btn-primary" style={{ marginBottom: "1rem" }}>Create Student Profile</button>
            </div>

            <div>
                {students.map((student, index) => (

                    <Student student={student} key={index} />
                ))}
            </div>
        </div>
    )
}

export default StudentsList
