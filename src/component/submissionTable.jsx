import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFormStore from "../store/formStore";
import CustomButton from "./CustomButton";
import Form from "./Form";
import { CiEdit } from "react-icons/ci";

const SubmissionTable = () => {
  const { submissions, getSubmissions, loading, total = 0 } = useFormStore();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    getSubmissions(paginationModel.page + 1, paginationModel.pageSize);
  }, [paginationModel]);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "first_name", headerName: "First Name", width: 130 },
    { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone_number", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "problem_description", headerName: "Problem Description", width: 250 },
    { field: "created_at", headerName: "Created At", width: 140 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={() => {
            setEditingSubmission(params.row.id);
            setShowForm(true);
          }}
          className="p-1 rounded-md hover:bg-gray-200"
        >
          <CiEdit size={22} className="text-blue-600" />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="w-full flex justify-end mb-3 px-2 sm:px-6">
        <CustomButton
          label="NEW +"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700"
          onClick={() => {
            setEditingSubmission(null);
            setShowForm(true);
          }}
        />
      </div>

      <div className="overflow-x-auto w-full border border-gray-400 rounded-md">
        <div className="h-[650px] w-full min-w-[700px]">
          <DataGrid
            rows={submissions}
            columns={columns}
            rowCount={total}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => setPaginationModel(model)}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </div>

      {showForm && (
        <Form
          overlay={true}
          onClose={() => setShowForm(false)}
          id={editingSubmission}
        />
      )}
    </>
  );
};

export default SubmissionTable;
