import React, { useState, useEffect, useRef, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme, useMediaQuery } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import Form from "./Form";
import SubmissionInfo from "./SubmissionInfo";

import useFormStore from "../store/formStore";
import useAuthStore from "../store/useAuthStore";

const STATUS_LABELS = {
  ENROLLED: "Enrolled",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

const CATEGORY_LABELS = {
  CHAITANYA: "Chaitanya",
  "BRAIN GYM": "Brain Gym",
  BODH: "Bodh",
};

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
  ENROLLED: { bg: "bg-green-100", text: "text-green-700" },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700" },
  REJECTED: { bg: "bg-red-100", text: "text-red-700" },
  NOT_SET: { bg: "bg-gray-100", text: "text-gray-600" },
};

const SubmissionTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const hydratedRef = useRef(false);

  const { submissions, getSubmissions, loading, total } = useFormStore();
  const { accessToken, user } = useAuthStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  const [showFormDetailsOverlay, setShowFormDetailsOverlay] = useState(false);
  const [submissionDetailsId, setSubmissionDetailsId] = useState(null);

  const isSuperAdmin = user?.role === "SUPERADMIN";

  const STATUS_OPTIONS = [
    { value: "", label: "All" },
    { value: "ENROLLED", label: STATUS_LABELS.ENROLLED },
    { value: "PENDING", label: STATUS_LABELS.PENDING },
    { value: "REJECTED", label: STATUS_LABELS.REJECTED },
  ];

  const CATEGORY_OPTIONS = [
    { value: "", label: "All" },
    { value: "CHAITANYA", label: CATEGORY_LABELS.CHAITANYA },
    { value: "BRAIN GYM", label: CATEGORY_LABELS["BRAIN GYM"] },
    { value: "BODH", label: CATEGORY_LABELS.BODH },
  ];

  useEffect(() => {
    if (!accessToken) navigate("/operator-login");
  }, [accessToken, navigate]);

  useEffect(() => {
    setStatus(searchParams.get("status") || "");
    setCategory(searchParams.get("category") || "");
    setSortType(searchParams.get("sortType") || "");
    setSortDirection(searchParams.get("sortDirection") || "");

    setPaginationModel({
      page: Number(searchParams.get("page") || 1) - 1,
      pageSize: Number(searchParams.get("pageSize") || 10),
    });

    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;

    setSearchParams({
      status,
      category,
      sortType,
      sortDirection,
      page: String(paginationModel.page + 1),
      pageSize: String(paginationModel.pageSize),
    });
  }, [status, category, sortType, sortDirection, paginationModel]);

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

  const columns = useMemo(() => {
    const baseColumns = [
      { field: "id", headerName: "ID", width: 80 },
      {
        field: "full_name",
        headerName: "Name",
        width: 200,
        valueGetter: (_, row) => {
          const { first_name, middle_name, last_name } = row || {};
          return [first_name, middle_name, last_name].filter(Boolean).join(" ");
        },
      },
      { field: "age", headerName: "Age", width: 80 },

      {
        field: "status",
        headerName: "Status",
        width: 140,
        renderCell: ({ value }) => {
          const statusValue = value || "NOT_SET";
          const { bg, text } = STATUS_COLOR_MAP[statusValue];

          return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}>
              {STATUS_LABELS[statusValue] || "Not Set"}
            </span>
          );
        },
      },

      {
        field: "category",
        headerName: "Category",
        width: 170,
        renderCell: ({ value }) => (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${value ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
            {value ? CATEGORY_LABELS[value] || value : "Not Assigned"}
          </span>
        ),
      },

      { field: "email", headerName: "Email", width: 220 },
      { field: "phone_number", headerName: "Phone", width: 150 },
      { field: "created_at", headerName: "Created At", width: 150 },
    ];

    if (isSuperAdmin) {
      baseColumns.push(
        {
          field: "payment_method",
          headerName: "Payment",
          width: 130,
          renderCell: ({ value }) => value || "—",
        },
        {
          field: "accepted_by",
          headerName: "Accepted By",
          width: 160,
          renderCell: ({ value }) => value?.username || "—",
        },
        {
          field: "accepted_at",
          headerName: "Accepted At",
          width: 160,
          renderCell: ({ value }) =>
            value ? new Date(value).toLocaleString() : "—",
        }
      );
    }

    baseColumns.push({
      field: "action",
      headerName: "Action",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditingSubmission(params.row.id);
            setShowForm(true);
          }}
          className="p-1 rounded-md hover:bg-gray-200"
        >
          <CiEdit size={22} className="text-blue-600" />
        </button>
      ),
    });

    return baseColumns;
  }, [isSuperAdmin]);

  const handleRowClick = (params) => {
    setSubmissionDetailsId(params.id);
    setShowFormDetailsOverlay(true);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
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

      <div className="flex-1 min-h-0 border border-gray-300 rounded-lg w-full overflow-x-auto">
        <div className="h-full w-full min-w-0 sm:min-w-[700px]">
          <DataGrid
            rows={submissions}
            columns={columns}
            onRowClick={handleRowClick}
            rowCount={total}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 50]}
            rowHeight={isMobile ? 38 : 37.9}
            sx={{
              height: '100%',
              width: '100%',
              maxWidth: '100vw',
              fontWeight: 'bold',
              overflowX: 'auto',
            }}
          />
        </div>
      </div>

      {showForm && (
        <Form overlay id={editingSubmission} onClose={() => setShowForm(false)} />
      )}

      {showFormDetailsOverlay && (
        <SubmissionInfo
          overlay
          id={submissionDetailsId}
          onClose={() => setShowFormDetailsOverlay(false)}
        />
      )}
    </div>
  );
};

export default SubmissionTable;
