import { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Eye, Pencil, Plus, RefreshCw, UserRound } from "lucide-react";
import ToolBar from "./ToolBar";
import CustomButton from "./CustomButton";
import CreateEmployeeForm from "./CreateEmployeeForm";
import EmployeeInfo from "./EmployeeInfo";

import useEmployeeStore from "../store/useEmployeeStore";
import buildFullName from "../utils/buildFullName";

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

const ROLE_OPTIONS = [
  { value: "", label: "All" },
  { value: "EMPLOYEE", label: "Employee" },
  { value: "SUPERADMIN", label: "Super admin" },
];

const BLOOD_GROUP_OPTIONS = [
  { value: "", label: "All" },
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

const ROLE_TONE = {
  SUPERADMIN: "bg-violet-50 text-violet-700 ring-violet-100",
  EMPLOYEE: "bg-blue-50 text-blue-700 ring-blue-100",
  NOT_SET: "bg-slate-100 text-slate-600 ring-slate-200",
};

const getFullName = (employee) =>
  buildFullName(
    employee?.first_name,
    employee?.middle_name,
    employee?.last_name
  ) || "Unnamed";

const getRoleLabel = (role) =>
  role === "SUPERADMIN" ? "Super admin" : role === "EMPLOYEE" ? "Employee" : "Not Set";

const EmployeesTable = () => {
  const { employees, getAllEmployees, loading, total } = useEmployeeStore();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEmployeeInfoOverlay, setShowEmployeeInfoOverlay] = useState(false);
  const [employeeDetailsId, setEmployeeDetailsId] = useState(null);

  const visibleRows = useMemo(
    () => (Array.isArray(employees) ? employees : []),
    [employees]
  );
  const totalRows = total || visibleRows.length;
  const currentPageStart = totalRows
    ? paginationModel.page * paginationModel.pageSize + 1
    : 0;
  const currentPageEnd = Math.min(
    (paginationModel.page + 1) * paginationModel.pageSize,
    totalRows
  );
  const currentPageLabel = `${currentPageStart}-${currentPageEnd}`;

  useEffect(() => {
    getAllEmployees(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      role,
      sortType,
      sortDirection
    );
  }, [getAllEmployees, paginationModel, search, role, sortType, sortDirection]);

  const filteredRows = useMemo(() => {
    if (!bloodGroup) return visibleRows;
    return visibleRows.filter((employee) => employee.blood_group === bloodGroup);
  }, [bloodGroup, visibleRows]);

  const columns = [
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
              <p className="truncate text-xs text-slate-500">
                {row?.username || "No username"}
              </p>
            </div>
          </div>
        ),
      },
      {
        field: "role",
        headerName: "Role",
        width: 140,
        renderCell: ({ value }) => {
          const roleValue = value || "NOT_SET";
          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                ROLE_TONE[roleValue] || ROLE_TONE.NOT_SET
              }`}
            >
              {getRoleLabel(roleValue)}
            </span>
          );
        },
      },
      { field: "email", headerName: "Email", minWidth: 220, flex: 1 },
      { field: "phone_number", headerName: "Phone", width: 150 },
      {
        field: "blood_group",
        headerName: "Blood Group",
        width: 130,
        renderCell: ({ value }) => (
          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-rose-100">
            {value || "Not Set"}
          </span>
        ),
      },
      { field: "age", headerName: "Age", width: 80 },
      {
        field: "action",
        headerName: "",
        width: 72,
        sortable: false,
        renderCell: (params) => (
          <button
            onClick={(event) => {
              event.stopPropagation();
              openEdit(params.row.id);
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50"
            aria-label="Edit employee"
          >
            <Pencil size={17} />
          </button>
        ),
      },
    ];

  const handleRowClick = (params) => {
    setEmployeeDetailsId(params.id);
    setShowEmployeeInfoOverlay(true);
  };

  function openEdit(id) {
    setEditingEmployee(id);
    setShowEmployeeInfoOverlay(false);
    setShowForm(true);
  }

  const refreshEmployees = () => {
    getAllEmployees(
      paginationModel.page + 1,
      paginationModel.pageSize,
      search,
      role,
      sortType,
      sortDirection
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <ToolBar
        searchValue={search}
        onSearchChange={setSearch}
        status={ROLE_OPTIONS}
        selectedStatus={role}
        onStatusChange={setRole}
        category={BLOOD_GROUP_OPTIONS}
        selectedCategory={bloodGroup}
        onCategoryChange={setBloodGroup}
        sortTypes={SORT_TYPES}
        selectedSortType={sortType}
        onSortTypeChange={setSortType}
        sortDirections={SORT_DIRECTIONS}
        selectedSortDirection={sortDirection}
        onSortDirectionChange={setSortDirection}
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <span className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
              {currentPageLabel} / {totalRows || 0}
            </span>
            <button
              type="button"
              onClick={refreshEmployees}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-slate-700 shadow-sm transition hover:bg-slate-50"
              aria-label="Refresh employees"
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
                setEditingEmployee(null);
                setShowForm(true);
              }}
            />
          </div>
        }
      />

      <div className="hidden min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:block">
        <div className="h-full w-full min-w-[760px]">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            rowCount={totalRows}
            loading={loading}
            onRowClick={handleRowClick}
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
            Loading employees...
          </div>
        ) : filteredRows.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
            No employees found
          </div>
        ) : (
          filteredRows.map((employee) => (
            <MobileEmployeeCard
              key={employee.id}
              employee={employee}
              onView={() => handleRowClick({ id: employee.id })}
              onEdit={() => openEdit(employee.id)}
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
            disabled={currentPageEnd >= totalRows}
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
        <CreateEmployeeForm
          overlay
          onClose={() => setShowForm(false)}
          id={editingEmployee}
        />
      )}

      {showEmployeeInfoOverlay && (
        <EmployeeInfo
          overlay
          id={employeeDetailsId}
          onClose={() => setShowEmployeeInfoOverlay(false)}
        />
      )}
    </div>
  );
};

const MobileEmployeeCard = ({ employee, onView, onEdit }) => {
  const roleValue = employee?.role || "NOT_SET";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-slate-950">
            {getFullName(employee)}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            #{employee?.id} - {employee?.phone_number || "No phone"}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
            ROLE_TONE[roleValue] || ROLE_TONE.NOT_SET
          }`}
        >
          {getRoleLabel(roleValue)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">
            Blood Group
          </p>
          <p className="mt-1 font-semibold text-slate-700">
            {employee?.blood_group || "Not Set"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-400">Age</p>
          <p className="mt-1 font-semibold text-slate-700">
            {employee?.age || "--"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs font-semibold uppercase text-slate-400">Email</p>
          <p className="mt-1 truncate font-semibold text-slate-700">
            {employee?.email || "No email"}
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

export default EmployeesTable;
