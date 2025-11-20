import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFormStore from "../store/formStore";
import CustomButton from "./CustomButton";
import Form from "./Form";
import { CiEdit } from "react-icons/ci";
import ToolBar from "./ToolBar";

const SubmissionTable = () => {
  const { submissions, getSubmissions, loading, total } = useFormStore();

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
    getSubmissions(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      filter,
      sortType,
      sortDirection
    );
  }, [paginationModel, search, filter, sortType, sortDirection]);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "first_name", headerName: "First Name", width: 130 },
    { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "status", headerName: "Status", width: 110 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone_number", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 220 },
    { field: "problem_description", headerName: "Description", width: 260 },
    { field: "created_at", headerName: "Created At", width: 150 },

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
        filters={[
          { value: "", label: "All" },
          { value: "OPEN", label: "OPEN" },
          { value: "CLOSED", label: "CLOSED" },
          { value: "PENDING", label: "PENDING" },
        ]}
        selectedFilter={filter}
        onFilterChange={setFilter}
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
          // headerHeight={38}
          rows={submissions}
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
            text: "bold"
          }}
        />
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
