import * as Yup from "yup";

export const JobBasicInfoFormSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  employmentTypes: Yup.array()
    .of(Yup.string())
    .min(1, "At least one employment type is required"),
  salaryRange: Yup.array()
    .of(Yup.number())
    .nullable()
    .test("valid-range", "Start range must be less than or equal to end range", (value) => {
      if (!value || value.length < 2 || value[0] === undefined || value[1] === undefined) {
        return true;
      }
      return value[0] <= value[1];
    }),
  categories: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required("Category name is required"),
      })
    )
    .min(1, "At least one category is required")
    .required("Categories are required"),
    skills: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.string(),
        name: Yup.string().required("Skill name is required"),
      })
    )
    .min(1, "At least one skill is required")
    .required("Skill are required"),
});


