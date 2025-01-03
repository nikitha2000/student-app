import { ClassData } from './type/user'; 
import { User } from "./type/user";
import api from './axios'; 

export const fetchClassData = async (selectedClass: string): Promise<ClassData | null> => {
  try {
    const response = await api.get('/classes');
    const data: ClassData[] = response.data;

   
    return data.find((item:ClassData) => item.name.toLowerCase() === selectedClass.toLowerCase()) || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


export const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await api.get('/users'); 
      return response.data; 
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; 
    }
  };