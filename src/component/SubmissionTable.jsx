import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Eye, Pencil, Plus, RefreshCw, UserRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import Form from "./Form";
import SubmissionInfo from "./SubmissionInfo";

import useFormStore from "../store/formStore";
import useAuthStore from "../store/useAuthStore";
import buildFullName from "../utils/buildFullName";

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
  ENROLLED: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-100" },
  PENDING: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-100" },
  REJECTED: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-100" },
  NOT_SET: { bg: "bg-slate-100", text: "text-slate-600", ring: "ring-slate-200" },
};

const getFullName = (submission) =>
  buildFullName(
    submission?.first_name,
    submission?.middle_name,
    submission?.last_name
  ) || "Unnamed";

const getAcceptedByLabel = (submission) => {
  const acceptedBy =
    submission?.accepted_by ??
    submission?.acceptedBy ??
    submission?.accepted_by_user ??
    submission?.acceptedByUser;

  if (!acceptedBy) {
    return (
      submission?.accepted_by_username ??
      submission?.acceptedByUsername ??
      submission?.accepted_by_name ??
      submission?.acceptedByName ??
      "—"
    );
  }

  if (typeof acceptedBy === "string" || typeof acceptedBy === "number") {
    return acceptedBy;
  }

  return (
    acceptedBy.username ||
    buildFullName(
      acceptedBy.first_name,
      acceptedBy.middle_name,
      acceptedBy.last_name
    ) ||
    acceptedBy.name ||
    acceptedBy.email ||
    "—"
  );
};

const getAcceptedAtLabel = (submission) => {
  const acceptedAt =
    submission?.accepted_at ??
    submission?.acceptedAt ??
    submission?.enrolled_at ??
    submission?.enrolledAt;

  return acceptedAt ? new Date(acceptedAt).toLocaleString() : "—";
};

const SubmissionTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { submissions, getSubmissions, loading, total } = useFormStore();
  const { accessToken, user } = useAuthStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(() => searchParams.get("status") || "");
  const [category, setCategory] = useState(
    () => searchParams.get("category") || ""
  );
  const [sortType, setSortType] = useState(
    () => searchParams.get("sortType") || ""
  );
  const [sortDirection, setSortDirection] = useState(
    () => searchParams.get("sortDirection") || ""
  );

  const [paginationModel, setPaginationModel] = useState({
    page: Number(searchParams.get("page") || 1) - 1,
    pageSize: Number(searchParams.get("pageSize") || 10),
  });

  const [showForm, setShowForm] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);

  const [showFormDetailsOverlay, setShowFormDetailsOverlay] = useState(false);
  const [submissionDetailsId, setSubmissionDetailsId] = useState(null);

  const isSuperAdmin = user?.role === "SUPERADMIN";

  const visibleRows = Array.isArray(submissions) ? submissions : [];
  const currentPageStart = total ? paginationModel.page * paginationModel.pageSize + 1 : 0;
  const currentPageEnd = Math.min(
    (paginationModel.page + 1) * paginationModel.pageSize,
    total || 0
  );
  const currentPageLabel = `${currentPageStart}-${currentPageEnd}`;

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
        minWidth: 220,
        flex: 1,
        valueGetter: (_, row) => getFullName(row),
        renderCell: ({ row }) => (
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <UserRound size={17} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {getFullName(row)}
              </p>
              <p className="truncate text-xs text-slate-500">{row?.email || "No email"}</p>
            </div>
          </div>
        ),
      },
      { field: "age", headerName: "Age", width: 80 },

      {
        field: "status",
        headerName: "Status",
        width: 140,
        renderCell: ({ value }) => {
          const statusValue = value || "NOT_SET";
          const { bg, text, ring } = STATUS_COLOR_MAP[statusValue] || STATUS_COLOR_MAP.NOT_SET;

          return (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${bg} ${text} ${ring}`}>
              {STATUS_LABELS[statusValue] || "Not Set"}
            </span>
          );
        },
      },

      {
        field: "choose_your_course",
        headerName: "Course",
        width: 170,
        renderCell: ({ value }) => (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${value ? "bg-cyan-50 text-cyan-700 ring-cyan-100" : "bg-slate-100 text-slate-600 ring-slate-200"}`}>
            {value ? CATEGORY_LABELS[value] || value : "Not Selected"}
          </span>
        ),
      },

      {
        field: "category",
        headerName: "Category",
        width: 170,
        renderCell: ({ value }) => (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${value ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-slate-100 text-slate-600 ring-slate-200"}`}>
            {value ? CATEGORY_LABELS[value] || value : "Not Assigned"}
          </span>
        ),
      },

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
          renderCell: ({ row }) => getAcceptedByLabel(row),
        },
        {
          field: "accepted_at",
          headerName: "Accepted At",
          width: 160,
          renderCell: ({ row }) => getAcceptedAtLabel(row),
        }
      );
    }

    baseColumns.push({
      field: "action",
      headerName: "",
      width: 72,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openEdit(params.row.id);
          }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50"
          aria-label="Edit submission"
        >
          <Pencil size={17} />
        </button>
      ),
    });

    return baseColumns;
  }, [isSuperAdmin]);

  const handleRowClick = (params) => {
    setSubmissionDetailsId(params.id);
    setShowFormDetailsOverlay(true);
  };

  function openEdit(id) {
    setEditingSubmission(id);
    setShowFormDetailsOverlay(false);
    setShowForm(true);
  }

  const refreshSubmissions = () => {
    getSubmissions(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      status,
      category,
      sortType,
      sortDirection
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
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
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <span className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
              {currentPageLabel} / {total || 0}
            </span>
            <button
              type="button"
              onClick={refreshSubmissions}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Refresh submissions"
            >
              <RefreshCw size={16} />
            </button>
            <CustomButton
              label={
                <span className="inline-flex items-center gap-2">
                  <Plus size={16} />
                  New
                </span>
              }
              className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              onClick={() => {
                setEditingSubmission(null);
                setShowForm(true);
              }}
            />
          </div>
        }
      />

      <div className="hidden min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:block">
        <div className="h-full w-full min-w-[760px]">
          <DataGrid
            rows={visibleRows}
            columns={columns}
            onRowClick={handleRowClick}
            rowCount={total}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 50]}
            rowHeight={64}
            sx={{
              height: "100%",
              width: "100%",
              border: 0,
              color: "#0f172a",
              fontFamily: "inherit",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#475569",
                textTransform: "uppercase",
                letterSpacing: "0",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f8fafc",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #eef2f7",
                outline: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e2e8f0",
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:hidden">
        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            Loading submissions...
          </div>
        ) : visibleRows.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            No submissions found
          </div>
        ) : (
          visibleRows.map((submission) => (
            <MobileSubmissionCard
              key={submission.id}
              submission={submission}
              onView={() => handleRowClick({ id: submission.id })}
              onEdit={() => openEdit(submission.id)}
            />
          ))
        )}

        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <button
            type="button"
            disabled={paginationModel.page === 0}
            onClick={() =>
              setPaginationModel((model) => ({
                ...model,
                page: Math.max(model.page - 1, 0),
              }))
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm font-semibold text-slate-600">
            Page {paginationModel.page + 1}
          </span>

          <button
            type="button"
            disabled={currentPageEnd >= (total || 0)}
            onClick={() =>
              setPaginationModel((model) => ({
                ...model,
                page: model.page + 1,
              }))
            }
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
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
          onEdit={() => openEdit(submissionDetailsId)}
        />
      )}
    </div>
  );
};

const MobileSubmissionCard = ({ submission, onView, onEdit }) => {
  const statusValue = submission?.status || "NOT_SET";
  const statusTone = STATUS_COLOR_MAP[statusValue] || STATUS_COLOR_MAP.NOT_SET;
  const category = submission?.category;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-slate-950">
            {getFullName(submission)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            #{submission?.id} - {submission?.phone_number || "No phone"}
          </p>
        </div>

        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusTone.bg} ${statusTone.text} ${statusTone.ring}`}>
          {STATUS_LABELS[statusValue] || "Not Set"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Course</p>
          <p className="mt-1 font-semibold text-slate-700">
            {submission?.choose_your_course
              ? CATEGORY_LABELS[submission.choose_your_course] || submission.choose_your_course
              : "Not Selected"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Category</p>
          <p className="mt-1 font-semibold text-slate-700">
            {category ? CATEGORY_LABELS[category] || category : "Not Assigned"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Age</p>
          <p className="mt-1 font-semibold text-slate-700">{submission?.age || "--"}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs font-semibold uppercase text-slate-400">Email</p>
          <p className="mt-1 truncate font-semibold text-slate-700">
            {submission?.email || "No email"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onView}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm"
        >
          <Eye size={16} />
          View
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm"
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>
    </article>
  );
};

export default SubmissionTable;
