import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useEmployeeStore from "../store/useEmployeeStore";
import { CiEdit } from "react-icons/ci";
import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import CreateEmployeeForm from "./CreateEmployeeForm";

const EmployeesTable = () => {
  const { employees, getAllEmployees, loading, total } = useEmployeeStore();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    getAllEmployees(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      filter,
      sortType,
      sortDirection
    );
  }, [paginationModel, search, filter, sortType, sortDirection]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "First Name", width: 120 },
    { field: "last_name", headerName: "Last Name", width: 120 },
    { field: "username", headerName: "Username", width: 120 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "phone_number", headerName: "Phone", width: 140 },
    { field: "blood_group", headerName: "Blood Group", width: 120 },
    { field: "address", headerName: "Address", width: 220 },
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
      <ToolBar
        searchValue={search}
        onSearchChange={setSearch}
        sortTypes={[
          { value: "", label: "Default" },
          { value: "created_at", label: "Created At" },
          { value: "updated_at", label: "Updated At" },
        ]}
        selectedSortType={sortType}
        onSortTypeChange={setSortType}
        sortDirections={[
          { value: "", label: "Default" },
          { value: "ASC", label: "ASC" },
          { value: "DESC", label: "DESC" },
        ]}
        selectedSortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
        actions={
          <CustomButton
            label="NEW +"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            onClick={() => {
              setEditingSubmission(null);
              setShowForm(true);
            }}
          />
        }
      />

      <div className="border border-gray-300 rounded-lg w-full">
        <DataGrid
          rowHeight={43}
          rows={employees}
          columns={columns}
          rowCount={total}
          loading={loading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20, 50]}
          autoHeight={false}
          sx={{
            height: "78.8vh",
            width: "100%",
            overflowX: "auto",
            text: "bold",
          }}
        />
      </div>

      {showForm && (
        <CreateEmployeeForm
          overlay={true}
          onClose={() => setShowForm(false)}
          id={editingSubmission}
        />
      )}
    </>
  );
};

export default EmployeesTable;
