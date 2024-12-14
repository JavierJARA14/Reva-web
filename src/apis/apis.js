import axios from "./axios_config"

//Get
export const getListUser = () => axios.get(`/users`);
export const getUser = (id) => axios.get(`/users/${id}`);

//Insert
export const insertUser = (values) => axios.post(`/users`, values);

//Update
export const updateUser = (id, values) => axios.put(`/users/${id}`, values);

//Delete
export const deleteUser = (id) => axios.delete(`/users/${id}`);