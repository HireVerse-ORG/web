import * as Yup from "yup";

export const InterviewScheduleSchema = Yup.object().shape({
    scheduledTime: Yup.date()
        .required("Scheduled time is required")
        .min(new Date(), "Scheduled time must be in the future"),
    type: Yup.string()
        .oneOf(["online", "offline"], "Invalid interview type")
        .required("Interview type is required"),
    description: Yup.string().when('type', {
        is: 'offline',
        then: (schema) => schema.required("Description is required for offline interviews"),
        otherwise: (schema) => schema.notRequired(),
    })
});