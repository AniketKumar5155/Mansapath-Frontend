import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useEmployeeStore from "../store/useEmployeeStore"
import CustomButton from "./CustomButton";
import Form from "./Form";
import { toast } from "react-toastify";

const EmployeesTable = () => {
  const { employees, getAllEmployees, loading } = useEmployeeStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try{
    getAllEmployees();
    }catch(error){
      console.log(error)
      toast.error("Failed to fetch employees")
    }
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "first_name", headerName: "First Name", width: 130 },
    { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "username", headerName: "Username", width:130},
    // { field: "gender", headerName: "Gender", width: 110 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone_number", headerName: "Phone", width: 125 },
    // { field: "address", headerName: "Address", width: 260 },
    { field: "role", headerName: "Role", width: 60 },
    { field: "created_at", headerName: "Created At", width: 220 },
  ];

  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden w-[96.6%] border rounded-md">
        <div style={{ height: 650, width: "1300px" }}>
          <DataGrid
            rows={employees}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            pagination
          />
        </div>
      </div>
    </>
  );
};

export default EmployeesTable;
