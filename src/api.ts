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
    const response = await api.get("/classes", {
      params: {
        name: selectedClass,
      },
    });

    const data: ClassData[] = response.data;

    if (data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching class data:", error);
    return null;
  }
};

export const fetchTeacherData = async (): Promise<string[] | null> => {
  try {
    const response = await api.get("/classes");
    const data: { teacherName: string }[] = response.data;

    const teacherNames = data.map((classItem) => classItem.teacherName);

    return teacherNames;
    return teacherNames;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    return null;
    return null;
  }
};

export const fetchStudentData = async (): Promise<
  { className: string; students: string[] }[] | null
> => {
  try {
    const response = await api.get("/classes");
    const data: ClassData[] = response.data;

    const studentClassData = data.map((classItem) => ({
      className: classItem.name,
      students: classItem.students.map((student) => student.name),
    }));

    return studentClassData;
  } catch (error) {
    console.error("error fetching student name data", error);
    return null;
  }
};
