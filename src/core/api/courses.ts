import { api } from "./api";

export const fetchCourses = async () => {
    const response = await api.get('/docs/courses.json');
    return response.data;
  };