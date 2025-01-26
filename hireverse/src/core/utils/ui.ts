import { JobApplicationStatus } from "@core/types/job.application.interface";

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