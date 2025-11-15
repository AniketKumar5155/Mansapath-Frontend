import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFormStore from "../store/formStore";

const SubmissionTable = () => {
  const { submissions, getSubmissions, loading } = useFormStore();

  useEffect(() => {
    getSubmissions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone_number", headerName: "Phone", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "created_at", headerName: "Created At", width: 180 },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={submissions}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id}
        pagination
      />
    </div>
  );
};

export default SubmissionTable;
