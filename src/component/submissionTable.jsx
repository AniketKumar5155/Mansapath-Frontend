import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme, useMediaQuery } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import Form from "./Form";
import useFormStore from "../store/formStore";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const CATEGORY_OPTIONS = [
  { value: "", label: "All" },
  { value: "MENTAL THERAPY", label: "Mental Therapy" },
  { value: "MENTAL FITNESS", label: "Mental Fitness" },
  { value: "CHAITAINYA", label: "Chaitanya" },
];

const SORT_TYPES = [
  { value: "", label: "Default" },
  { value: "created_at", label: "Created At" },
  { value: "updated_at", label: "Updated At" },
];

const SORT_DIRECTIONS = [
  { value: "", label: "Default" },
  { value: "ASC", label: "ASC" },
  { value: "DESC", label: "DESC" },
];

const STATUS_COLOR_MAP = {
  OPEN: { bg: "bg-green-100", text: "text-green-700" },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700" },
  CLOSED: { bg: "bg-red-100", text: "text-red-700" },
  NOT_SET: { bg: "bg-gray-100", text: "text-gray-600" },
};

const SubmissionTable = () => {
  const navigate = useNavigate();
  const { submissions, getSubmissions, loading, total } = useFormStore();
  const { accessToken, user } = useAuthStore();
  console.log(user)

  const STATUS_OPTIONS = user.role === "SUPERADMIN" ? [
    { value: "", label: "All" },
    { value: "OPEN", label: "Enrolled" },
    { value: "PENDING", label: "Pending" },
    { value: "CLOSED", label: "Rejected" },
  ] : [
    { value: "", label: "Default (Not set and pending)" },
    { value: "PENDING", label: "Pending" },
    { value: "CLOSED", label: "Not set" },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  useEffect(() => {
    if (!accessToken) {
      navigate("/operator-login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    getSubmissions(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      status,
      category,
      sortType,
      sortDirection
    );
  }, [paginationModel, search, status, category, sortType, sortDirection]);

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
        const value = params.value || "NOT_SET";
        const { bg, text } = STATUS_COLOR_MAP[value];

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
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
        const value = params.value || "NOT_ASSIGNED";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${value === "NOT_ASSIGNED"
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-100 text-blue-700"
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
    {
      field: "problem_description",
      headerName: "Description",
      width: 260,
    },
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
        status={STATUS_OPTIONS}
        selectedStatus={status}
        onStatusChange={setStatus}
        category={CATEGORY_OPTIONS}
        selectedCategory={category}
        onCategoryChange={setCategory}
        sortTypes={SORT_TYPES}
        selectedSortType={sortType}
        onSortTypeChange={setSortType}
        sortDirections={SORT_DIRECTIONS}
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
          rows={submissions}
          columns={columns}
          rowCount={total}
          loading={loading}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20, 50]}
          rowHeight={isMobile ? 50 : 43}
          sx={{
            height: isMobile ? "63vh" : "78.8vh",
            width: "100%",
            fontWeight: "bold",
          }}
        />
      </div>

      {showForm && (
        <Form
          overlay
          id={editingSubmission}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
};

export default SubmissionTable;
