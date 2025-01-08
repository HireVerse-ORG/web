import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const SeekerEducationFormSchema = Yup.object().shape({
    school: Yup.string().required("School is required"),
    fieldOfStudy: Yup.string().required("Field of study is required"),
    startMonth: Yup.number()
        .required("Start month is required")
        .min(1, "Start month must be between 1 and 12")
        .max(12, "Start month must be between 1 and 12"),
    startYear: Yup.number()
        .required("Start year is required")
        .max(currentYear, `Start year cannot exceed ${currentYear}`),
    endMonth: Yup.number().nullable().when("currentlyPursuing", {
        is: (val: boolean) => val === false,
        then: (schema) =>
            schema
                .required("End month is required")
                .min(1, "End month must be between 1 and 12")
                .max(12, "End month must be between 1 and 12"),
        otherwise: (schema) => schema.notRequired(),
    }),
    endYear: Yup.number().nullable().when("currentlyPursuing", {
        is: (val: boolean) => val === false,
        then: (schema) =>
            schema
                .required("End year is required")
                .max(currentYear, `End year cannot exceed ${currentYear}`),
        otherwise: (schema) => schema.notRequired(),
    }),
    currentlyPursuing: Yup.boolean(),
    location: Yup.object().shape({
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
    }),
});
