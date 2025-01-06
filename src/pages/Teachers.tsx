import React, { useState, useEffect } from "react";
import { fetchTeacherData } from '../api';

const TeacherPage = () => {
  const [teacherData, setTeacherData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchTeacherData() 
      .then((data) => {
        setTeacherData(data);
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
        setTeacherData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/assets/background.webp')` }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <header className="flex flex-col items-center w-full py-4 px-8 bg-black bg-opacity-50">
          <h2 className="text-3xl font-semibold text-white">Teachers</h2>
        </header>

        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <span className="text-white">Loading...</span>
          </div>
        ) : (
          <div className="flex justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto">
              {teacherData && teacherData.length > 0 ? (
                <ul>
                  {teacherData.map((teacher, index) => (
                    <li key={index} className="mt-4">
                      <h5 className="text-lg font-semibold">{teacher}</h5>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No teachers available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPage;
