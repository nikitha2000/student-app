import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClassDataAction, selectClass } from "../redux/classActions";
import { RootState, AppDispatch } from "../redux/store";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const selectedClass = useSelector((state: RootState) => state.selectedClass);
  const classData = useSelector((state: RootState) => state.classData);
  const loading = useSelector((state: RootState) => state.loading);

  const CLASSES = ["class A", "class B", "class C"];

  const buttons = [
    {
      label: "Student",
      className: "btn-student text-white",
      onClick: () => navigate("/students"),
    },
    {
      label: "Teacher",
      className: "btn-teacher text-white",
      onClick: () => navigate("/teachers"),
    },
  ];

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchClassDataAction(selectedClass));
    }
  }, [selectedClass, dispatch]);

  const handleClassSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const className = e.currentTarget.id;
    dispatch(selectClass(className));
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/background.webp')` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <header className="flex flex-col items-center w-full py-4 px-8 bg-black bg-opacity-50">
          <h2 className="text-3xl font-semibold text-white">
            Welcome to United Indian School
          </h2>

          <div className="space-x-4">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={button.className}
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        </header>

        <div className="flex justify-center items-center space-x-8 mt-32">
          {CLASSES.map((className) => (
            <button
              key={className}
              className="bg-white text-black py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
              id={className}
              onClick={handleClassSelect}
            >
              {className}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <span className="text-white">Loading...</span>
          </div>
        )}

        {classData && !loading && (
          <div className="flex justify-center mt-16">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4">{classData.name}</h3>
              <h4 className="font-semibold">
                Teacher: {classData.teacherName}
              </h4>

              <div className="mt-4">
                <h4 className="font-semibold">Students:</h4>
                <ul>
                  {classData.students.map((student, index) => (
                    <li key={index} className="mt-4">
                      <h5 className="text-lg font-semibold">{student.name}</h5>
                      <p>ID: {student.id}</p>
                      <div className="mt-2">
                        <h6 className="font-medium">Marks:</h6>
                        <ul>
                          {student.marks.map((mark, idx) => (
                            <li key={idx}>
                              <p>
                                {mark.subject}: {mark.mark}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
