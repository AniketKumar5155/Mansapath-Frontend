import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useFormStore from "../store/formStore";
import ToolBar from "./ToolBar";
import { useTheme, useMediaQuery } from "@mui/material";

const AcceptedSubmissionTable = () => {
  const {
    acceptedSubmissions,
    getAllAcceptedSubmissions,
    loading,
  } = useFormStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  useEffect(() => {
    getAllAcceptedSubmissions();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "first_name", headerName: "First Name", width: 130 },
    { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "age", headerName: "Age", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => {
        const value = params.value;

        const labelMap = {
          OPEN: "Accepted",
          PENDING: "Pending",
          CLOSED: "Rejected",
        };

        const colorMap = {
          OPEN: { bg: "bg-green-100", text: "text-green-700" },
          PENDING: { bg: "bg-yellow-100", text: "text-yellow-700" },
          CLOSED: { bg: "bg-red-100", text: "text-red-700" },
        };

        const { bg, text } = colorMap[value] || { bg: "", text: "" };

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text}`}
          >
            {labelMap[value] || value}
          </span>
        );
      },
    },
    { field: "category", headerName: "Category", width: 150 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phone_number", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 220 },
    {
      field: "problem_description",
      headerName: "Description",
      width: 260,
    },
    { field: "accepted_by", headerName: "Accepted By", width: 180 },
    { field: "accepted_at", headerName: "Accepted At", width: 180 },
    { field: "created_at", headerName: "Created At", width: 150 },
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
          { value: "accepted_at", label: "Accepted At" },
          { value: "created_at", label: "Created At" },
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
      />

      <div className="border border-gray-300 rounded-lg w-full">
        <DataGrid
          rowHeight={isMobile ? 50 : 43}
          rows={acceptedSubmissions}
          columns={columns}
          loading={loading}
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
    </>
  );
};

export default AcceptedSubmissionTable;
