import axios from 'axios';

export const getAllData = url => axios.get(url);
export const createData = (url, item) => axios.post(url, item);
export const deleteData = (url, id) => axios.delete(`${url}/${id}`);
export const updateData = (url, id, item) => axios.patch(`${url}/${id}`, item);

export const todosTagsApiUrl = '/api/tasks_tags';
export const todoApiUrl = '/api/tasks';
export const tagApiUrl = '/api/tags';