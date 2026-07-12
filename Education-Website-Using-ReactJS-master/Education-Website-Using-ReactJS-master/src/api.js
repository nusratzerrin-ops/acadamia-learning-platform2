import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api"
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.authorization = token;
    }
    return req;
});

// User
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getAllUsers = () => API.get("/users/all");

// Courses
export const getCourses = () => API.get("/courses");
export const addCourse = (data) => API.post("/courses/add", data);
export const updateCourse = (id, data) => API.put(`/courses/update/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/delete/${id}`);