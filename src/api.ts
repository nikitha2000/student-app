import { ClassData } from "./type/user";
import { User } from "./type/user";
import api from "./axios";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [] as User[];
  }
};

export const fetchClassData = async (
  selectedClass: string
): Promise<ClassData | null> => {
  try {
    const response = await api.get("/classes");
    const data: ClassData[] = response.data;

    const classData = data.find(
      (item: ClassData) =>
        item.name.toLowerCase() === selectedClass.toLowerCase()
    );

    if (!classData) {
      return null;
    }

    return classData;
  } catch (error) {
    console.error("Error fetching class data:", error);
    return null;
  }
};
