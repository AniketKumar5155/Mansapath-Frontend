import React, { useEffect, useState } from "react";
import Card from "./Card";
import { FaClipboardList } from "react-icons/fa";
import useFormStore from "../store/formStore";

const AdminDashboardInfoSection = () => {
  const { submissions, getSubmissions } = useFormStore();
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    getSubmissions();
  }, []);

  useEffect(() => {
    setTotalSubmissions(submissions.length);
  }, [submissions]);

  return (
    <div className="flex flex-wrap gap-6 mb-6">
      <Card
        label="Total Submissions"
        value={totalSubmissions}
        icon={<FaClipboardList />}
      />
    </div>
  );
};

export default AdminDashboardInfoSection;
