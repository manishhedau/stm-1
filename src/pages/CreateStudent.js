import React, { useState } from 'react'
import { createStudent } from "../services/apiEndPoint";

function CreateStudent() {
    const [formData, setForm] = useState({
        firstName: '',
        lastName: '',
        percentage: '',
        DOB: '',
        profileImage: '',
    });
    const [progressPercent, setProgressPercent] = useState(0);

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

    const fileChangedHandler = (event) => {
        const file = event.target.files[0]
        console.log("file : ", file);
        setForm((state) => ({ ...state, profileImage: file }));
    }

    const handleCreateStudent = async () => {
        const form = new FormData()
        form.append(
            'profileImage',
            formData.profileImage
        )
        form.append("firstName", formData.firstName)
        form.append("lastName", formData.lastName,)
        form.append("DOB", formData.DOB,)
        form.append("percentage", formData.percentage)

        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                setProgressPercent(percent);
            },
        };

        try {
            const res = await createStudent(form, options);
            setProgressPercent(0);
            console.log(res);
            window.location = "/";
        } catch (error) {
            console.log("Error");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleCreateStudent();
    }


    return (
        <div className="container">
            <h3 className="display-6">Create a student profile</h3>
            <div className='progress mb-3 w-100'>
                <div
                    className='progress-bar'
                    role='progressbar'
                    style={{ width: `${progressPercent}%` }}
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    {progressPercent}
                </div>
            </div>
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
                        value={formData.DOB}
                        onChange={handleDateOfBirthChange}
                    />
                </div>
                <div className="mb-3">
                    {formData.profileImage && <img height="150" width="150" src={URL.createObjectURL(formData.profileImage)} alt="Somthing" />}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Select profile image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={fileChangedHandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateStudent
