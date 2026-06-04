import { useEffect, useMemo } from "react";
import { X, Hash, Pencil } from "lucide-react";
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

const SubmissionInfo = ({ id, overlay = false, onClose, onEdit }) => {
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

            <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-2 sm:items-center sm:p-4">
                <div
                    className="my-2 flex max-h-[calc(100dvh-1rem)] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl animate-scaleIn sm:my-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-start justify-between gap-4 px-4 py-4 border-b bg-slate-50 sm:px-6 sm:py-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                Submission Details
                            </h2>

                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <Hash size={14} />
                                <span>Submission ID: {submission?.id ?? id}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {submission && onEdit && (
                                <button
                                    type="button"
                                    onClick={onEdit}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-200 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-5 sm:p-6 sm:space-y-6">
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
                                        Course: {CATEGORY_LABELS[submission.choose_your_course] || "Not Selected"}
                                    </span>

                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                                        Category: {CATEGORY_LABELS[submission.category] || "Not Assigned"}
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
                                        <Info
                                            label="Selected Course"
                                            value={CATEGORY_LABELS[submission.choose_your_course] || submission.choose_your_course}
                                        />
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

                    <div className="shrink-0 flex justify-end px-4 py-3 border-t bg-gray-50 sm:px-6 sm:py-4">
                        <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row sm:items-center">
                            {submission && onEdit && (
                                <button
                                    type="button"
                                    onClick={onEdit}
                                    className="inline-flex justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    Edit Submission
                                </button>
                            )}

                            <button
                                onClick={onClose}
                                className="px-5 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                            >
                                Close
                            </button>
                        </div>
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
