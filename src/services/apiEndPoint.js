import axios from 'axios';

const API = axios.create({ baseURL: 'https://stm-1.herokuapp.com/' });

export const fetchAllStudents = () => {
    return API.get("/api/student/");
}


export const createStudent = (student, options) => {
    return API.post("/api/student", student, options);
}


export const getStudent = (id) => {
    return API.get(`/api/student/${id}`);
}

export const updateStudent = (id, student) => {
    return API.put(`/api/student/${id}`, {
        firstName: student.firstName,
        lastName: student.lastName,
        DOB: student.DOB,
        percentage: student.percentage,
    });
}

export const deleteStudent = (id) => {
    return API.delete(`/api/student/${id}`,);
}


export const uploadImage = (imageData) => {
    return API.post(`/api/student/image`, imageData);
}
