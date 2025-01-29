import colors from "@core/theme/colors";
import { JobApplicationStatus } from "@core/types/job.application.interface";
import { JobStatus } from "@core/types/job.interface";
import { keyframes } from "@emotion/react";

export function getJobApplicationStatusDetails(
    status: JobApplicationStatus
): { label: string; color: "default" | "primary" | "secondary" | "success" | "error" | "warning" | undefined } {
    const statusDetails: Record<
        JobApplicationStatus,
        { label: string; color: "default" | "primary" | "secondary" | "success" | "error" | "warning" | undefined }
    > = {
        pending: { label: "Pending", color: "warning" },
        applied: { label: "Applied", color: "success" },
        failed: { label: "Failed", color: "error" },
        "in-review": { label: "In Review", color: "secondary" },
        shortlisted: { label: "Shortlisted", color: "success" },
        interview: { label: "Interview Scheduled", color: "primary" },
        hired: { label: "Hired", color: "success" },
        declined: { label: "Unsuitable", color: "error" },
        withdrawn: { label: "Withdrawn", color: "error" },
    };

    return statusDetails[status] ?? { label: "Unknown", color: "default" };
}

export function getJobPostStatusDetails(
    status: JobStatus
): { label: string; color: "default" | "primary" | "secondary" | "success" | "error" | "warning" | undefined } {
    const statusDetails: Record<
        JobStatus,
        { label: string; color: "default" | "primary" | "secondary" | "success" | "error" | "warning" | undefined }
    > = {
        pending: { label: "Pending", color: "warning" },
        failed: { label: "Failed", color: "error" },
        closed: { label: "Closed", color: "error" },
        live: { label: "Live", color: "success" }
    };

    return statusDetails[status] ?? { label: "Unknown", color: "default" };
}


export const applicantStagesOrder: JobApplicationStatus[] = [
    "in-review",
    "shortlisted",
    "interview",
    "hired",
    "declined",
];

export const getApplicantStagesOrder = (stage: JobApplicationStatus) => {
    const currentIndex = applicantStagesOrder.indexOf(stage);
    const progress = (currentIndex / (applicantStagesOrder.length - 1)) * 100;

    let color = colors.secondory.accent;
    if (stage === "hired") {
        return { progress: 100, color: colors.success.main };
    } else if (stage === "declined") {
        return { progress: 100, color: colors.error.main };
    }

    return { progress, color };
};

export const shakeAnimation = keyframes`
0% { transform: rotate(0deg); }
25% { transform: rotate(-10deg); }
50% { transform: rotate(10deg); }
75% { transform: rotate(-10deg); }
100% { transform: rotate(0deg); }
`;