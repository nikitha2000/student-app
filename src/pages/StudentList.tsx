import React, { useState, useEffect } from "react";
import { fetchStudentData } from "../api";

const StudentList = () => {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studentData, setStudentData] = useState<
    { className: string; students: string[] }[] | null
  >([]);
  const [filteredStudents, setFilteredStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const students = await fetchStudentData();
      setStudentData(students);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (studentData) {
      let filtered: string[] = [];

      if (selectedClass === "all") {
        studentData.forEach((classItem) => {
          const classFilteredStudents = classItem.students.filter((student) =>
            student.toLowerCase().includes(searchQuery.toLowerCase())
          );
          filtered = [...filtered, ...classFilteredStudents];
        });
      } else {
        const selectedClassData = studentData.find(
          (classItem) => classItem.className === selectedClass
        );
        if (selectedClassData) {
          filtered = selectedClassData.students.filter((student) =>
            student.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
      }

      setFilteredStudents(filtered);
    }
  }, [selectedClass, searchQuery, studentData]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/background.webp')` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <header className="flex flex-col items-center w-full py-4 px-8 bg-black bg-opacity-50">
          <h2 className="text-3xl font-semibold text-white">Student List</h2>
        </header>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <span className="text-white">Loading...</span>
          </div>
        ) : (
          <div className="flex justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto">
              <div className="mb-4">
                <label
                  htmlFor="class-select"
                  className="block text-sm font-semibold"
                >
                  Select Class:
                </label>
                <select
                  id="class-select"
                  value={selectedClass}
                  onChange={handleClassChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Classes</option>
                  {studentData &&
                    studentData.map((classItem) => (
                      <option
                        key={classItem.className}
                        value={classItem.className}
                      >
                        {classItem.className}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="search-bar"
                  className="block text-sm font-semibold"
                >
                  Search by Name:
                </label>
                <input
                  id="search-bar"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter student name"
                />
              </div>

              <h3 className="text-xl font-semibold mb-2">Filtered Students</h3>
              {filteredStudents.length ? (
                <div className="border border-gray-300 rounded-lg p-4 mt-4 max-h-64 overflow-y-auto">
                  <ul>
                    {filteredStudents.map((student, index) => (
                      <li key={index} className="mt-2">
                        <h5 className="text-lg font-semibold">{student}</h5>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No students found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
