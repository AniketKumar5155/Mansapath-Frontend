import { useEffect } from 'react';
import useEmployeeStore from '../store/useEmployeeStore';
import { X } from 'lucide-react';

const EmployeeInfo = ({ overlay = true, id, onClose }) => {
  const { getEmployeeById, employee, loading } = useEmployeeStore();

  useEffect(() => {
    if (id) {
      getEmployeeById(id);
    }
  }, [id, getEmployeeById]);

  if (!overlay || (!employee && !loading)) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 font-bold flex items-center justify-center rounded-full text-xl">
                {employee.first_name?.[0]}{employee.last_name?.[0]}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {employee.first_name} {employee.middle_name} {employee.last_name}
                </h2>
                <p className="text-sm text-gray-500">{employee.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">{employee.email}</p>
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm">{employee.phone_number}</p>
              </div>
              <div>
                <p className="font-medium">Age</p>
                <p className="text-sm">{employee.age}</p>
              </div>
              <div>
                <p className="font-medium">Blood Group</p>
                <p className="text-sm">{employee.blood_group}</p>
              </div>
              <div className="col-span-2">
                <p className="font-medium">Address</p>
                <p className="text-sm">{employee.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInfo;
