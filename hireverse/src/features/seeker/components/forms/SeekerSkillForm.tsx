import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  CircularProgress,
  debounce,
} from "@mui/material";
import { toast } from "sonner";
import { searchSkills } from "@core/api/shared/skillApi";
import { updateSeekerProfileSkills } from "@core/api/seeker/profileApi";
import { ISkill } from "@core/types/skill.interface";

const SeekerSkillFormSchema = Yup.object({
  skill: Yup.string().required("Please select or enter a skill"),
});

type SeekerSkillFormProps = {
  onAdded?: (skill: ISkill) => void;
}
const SeekerSkillForm = ({onAdded}: SeekerSkillFormProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSkills = debounce(async (query: string) => {
    setLoading(true);
    try {
      const data = (await searchSkills(query));
      const mappedSkills = data.map((skill) => skill.name);
      setSkills(mappedSkills);
    } catch (error: any) {
      toast.error(error?.message || "Error fetching skills");
    } finally {
      setLoading(false);
    }
  }, 500);

  const initialValues = {
    skill: "",
  };

  const handleSubmit = async (values: { skill: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void}) => {
    try {
      const {skill, status} = await updateSeekerProfileSkills(values);
      if(skill && status && onAdded){
        onAdded(skill)
      }
    } catch (error: any) {
      toast.error(error || "Failed to add skill")
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SeekerSkillFormSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, errors, touched, isSubmitting }) => (
        <Form>
          <Typography variant="body2" color="textSecondary" mb={1}>
            Skill
          </Typography>
          <Autocomplete
            freeSolo
            options={skills}
            value={values.skill}
            onChange={(_, newValue) => setFieldValue("skill", newValue || "")}
            onInputChange={(_, newInputValue) => {
              setFieldValue("skill", newInputValue || "");
              if (newInputValue) {
                fetchSkills(newInputValue);
              } else {
                setSkills([]);
              }
            }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                placeholder="Enter or select a skill"
                error={Boolean(touched.skill && errors.skill)}
                helperText={touched.skill && errors.skill ? errors.skill : ""}
                slotProps={{
                  input: {
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }
                }}
              />
            )}
            disableClearable
            isOptionEqualToValue={(option, value) => option === value}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SeekerSkillForm;
