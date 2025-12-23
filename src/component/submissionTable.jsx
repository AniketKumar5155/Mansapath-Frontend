import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, InputLabel, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import Form from "./Form";
import useFormStore from "../store/formStore";

const STATUS_OPTIONS = [
  { value: "OPEN", label: "Accepted" },
  { value: "PENDING", label: "Pending" },
  { value: "CLOSED", label: "Rejected" },
];

const CATEGORY_OPTIONS = ["Mental Fitness", "Mental Therapy", "Chaitanya"];

const STATUS_COLOR_MAP = {
  OPEN: { bg: "bg-green-100", text: "text-green-700" },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700" },
  CLOSED: { bg: "bg-red-100", text: "text-red-700" },
  NOT_SET: { bg: "bg-gray-100", text: "text-gray-600" },
};

const SubmissionTable = () => {
  const { submissions, getSubmissions, loading, total } = useFormStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [editingCell, setEditingCell] = useState({ id: null, field: null });

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

    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const isEditing = editingCell.id === params.row.id && editingCell.field === "status";
        const value = params.value || "NOT_SET";

        if (isEditing) {
          return (
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                autoFocus
                defaultValue={value === "NOT_SET" ? "" : value}
                onBlur={() => setEditingCell({ id: null, field: null })}
                onChange={(e) => {
                  console.log("Status changed:", e.target.value);
                  setEditingCell({ id: null, field: null });
                }}
                className="border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <MenuItem value="" disabled>Select status</MenuItem>
                {STATUS_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        const { bg, text } = STATUS_COLOR_MAP[value];
        return (
          <span
            onClick={() => setEditingCell({ id: params.row.id, field: "status" })}
            className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
          >
            {value === "NOT_SET"
              ? "Not Set"
              : STATUS_OPTIONS.find((o) => o.value === value)?.label}
          </span>
        );
      },
    },

    {
      field: "category",
      headerName: "Category",
      width: 170,
      renderCell: (params) => {
        const isEditing = editingCell.id === params.row.id && editingCell.field === "category";
        const value = params.value || "NOT_ASSIGNED";

        if (isEditing) {
          return (
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                autoFocus
                defaultValue={value === "NOT_ASSIGNED" ? "" : value}
                onBlur={() => setEditingCell({ id: null, field: null })}
                onChange={(e) => {
                  console.log("Category changed:", e.target.value);
                  setEditingCell({ id: null, field: null });
                }}
                className="border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <MenuItem value="" disabled>Select category</MenuItem>
                {CATEGORY_OPTIONS.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        return (
          <span
            onClick={() => setEditingCell({ id: params.row.id, field: "category" })}
            className={`cursor-pointer px-3 py-1 rounded-full text-xs font-semibold ${
              value === "NOT_ASSIGNED" ? "bg-gray-100 text-gray-600" : "bg-blue-100 text-blue-700"
            }`}
          >
            {value === "NOT_ASSIGNED" ? "Not Assigned" : value}
          </span>
        );
      },
    },

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
          { value: "OPEN", label: "Accepted" },
          { value: "PENDING", label: "Pending" },
          { value: "CLOSED", label: "Rejected" },
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
          rowHeight={isMobile ? 50 : 43}
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
            height: isMobile ? "63vh" : "78.8vh",
            width: "100%",
            overflowX: "auto",
            fontWeight: "bold",
          }}
        />
      </div>

      {showForm && (
        <Form overlay onClose={() => setShowForm(false)} id={editingSubmission} />
      )}
    </>
  );
};

export default SubmissionTable;
