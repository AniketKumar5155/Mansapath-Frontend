import { useEffect, useMemo } from "react";
import { X, Hash } from "lucide-react";
import useFormStore from "../store/formStore";
import buildFullName from "../utils/buildFullName";

const STATUS_LABELS = {
    ENROLLED: { label: "Enrolled", color: "bg-green-100 text-green-700" },
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
};

const CATEGORY_LABELS = {
    CHAITANYA: "Chaitanya",
    "BRAIN GYM": "Brain Gym",
    BODH: "Bodh",
};

const SubmissionInfo = ({ id, overlay = false, onClose }) => {
    const { submission, getSubmissionById, loading } = useFormStore();

    useEffect(() => {
        if (id) getSubmissionById(id);
    }, [id, getSubmissionById]);

    const groupedIssues = useMemo(() => {
        if (!submission?.Issues?.length) return null;

        return submission.Issues.reduce((acc, issue) => {
            const category = issue.IssueCategory?.name || "Others";
            acc[category] ??= [];
            acc[category].push(issue.name);
            return acc;
        }, {});
    }, [submission]);

    if (!overlay) return null;

    const statusMeta = STATUS_LABELS[submission?.status];

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scaleIn"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-start justify-between px-6 py-5 border-b bg-gray-50">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Submission Details
                            </h2>

                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <Hash size={14} />
                                <span>Submission ID: {submission?.id ?? id}</span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-200 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                        {loading ? (
                            <div className="text-center text-gray-500">Loading...</div>
                        ) : !submission ? (
                            <div className="text-center text-gray-500">
                                No submission found
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-wrap gap-3">
                                    {statusMeta && (
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusMeta.color}`}
                                        >
                                            {statusMeta.label}
                                        </span>
                                    )}

                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                        {CATEGORY_LABELS[submission.category] || "Not Assigned"}
                                    </span>
                                </div>

                                <Section title="Personal Information">
                                    <InfoGrid>
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
                                        <Info label="Address" value={submission.address} />
                                    </InfoGrid>
                                </Section>

                                <Section title="Problem Description">
                                    <div className="p-4 bg-gray-50 rounded-xl text-gray-700 text-sm">
                                        {submission.problem_description || "—"}
                                    </div>
                                </Section>

                                <Section title="Issues">
                                    {!groupedIssues ? (
                                        <p className="text-sm text-gray-500">
                                            No issues mentioned
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {Object.entries(groupedIssues).map(
                                                ([category, issues]) => (
                                                    <div
                                                        key={category}
                                                        className="border rounded-xl p-4"
                                                    >
                                                        <p className="font-medium text-gray-800 mb-2">
                                                            {category}
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {issues.map((issue, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="
                                                                    rounded-lg
                                                                    text-sm
                                                                    bg-gray-100
                                                                    text-gray-700
                                                                    border
                                                                    border-gray-200
                                                                    hover:bg-gray-200
                                                                    transition
                                                                    px-3 py-1
                                                                    "
                                                                >
                                                                    {issue}
                                                                </span>
                                                            ))}
                                                        </div>

                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </Section>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end px-6 py-4 border-t bg-gray-50">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const Section = ({ title, children }) => (
    <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
            {title}
        </h3>
        {children}
    </div>
);

const InfoGrid = ({ children }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {children}
    </div>
);

const Info = ({ label, value }) => (
    <div>
        <p className="text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">
            {value || "—"}
        </p>
    </div>
);

export default SubmissionInfo;
