import { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import useFormStore from "../store/formStore";
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

const SubmissionInfo = ({ id, overlay = false, onClose }) => {
  const { submission, getSubmissionById, loading } = useFormStore();

  useEffect(() => {
    if (id) {
      getSubmissionById(id);
    }
  }, [id, getSubmissionById]);

  const groupedIssues = useMemo(() => {
    if (!submission?.Issues || submission.Issues.length === 0) return null;

    return submission.Issues.reduce((acc, issue) => {
      const categoryName = issue.IssueCategory?.name || "Others";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(issue.name);
      return acc;
    }, {});
  }, [submission]);

  if (!overlay) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl relative animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Submission Details
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : !submission ? (
              <div className="text-center text-gray-500">
                No submission found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <Info
                    label="Full Name"
                    value={buildFullName(
                      submission.first_name,
                      submission.middle_name,
                      submission.last_name
                    )}
                  />
                  <Info label="Gender" value={submission.gender} />
                  <Info label="Age" value={submission.age} />
                  <Info label="Email" value={submission.email} />
                  <Info label="Phone" value={submission.phone_number} />
                  <Info
                    label="Category"
                    value={CATEGORY_LABELS[submission.category] || "Not Assigned"}
                  />
                  <Info
                    label="Status"
                    value={STATUS_LABELS[submission.status] || "Not Set"}
                  />
                  <Info label="Address" value={submission.address} />

                  <div className="sm:col-span-2">
                    <p className="text-gray-500 mb-1">
                      Problem Description
                    </p>
                    <div className="p-3 bg-gray-50 rounded-lg text-gray-700">
                      {submission.problem_description || "—"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Issues
                  </h3>

                  {!groupedIssues ? (
                    <p className="text-sm text-gray-500">
                      No issues mentioned
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(groupedIssues).map(
                        ([category, issues]) => (
                          <div key={category}>
                            <p className="font-medium text-gray-700">
                              {category}:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                              {issues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end px-6 py-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "—"}</p>
  </div>
);

export default SubmissionInfo;
