import { api } from "./api";

export const fetchCourses = async () => {
    const response = await api.get('/courses.json');
    return response.data;
  };