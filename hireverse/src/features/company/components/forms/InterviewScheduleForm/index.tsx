import { Box, Button, TextField, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { InterviewType } from "@core/types/interview.interface";
import { Formik, Form } from "formik";
import { InterviewScheduleSchema } from "./schema";
import { Moment } from "moment";

interface FormValues {
    scheduledTime: Moment | null;
    type: InterviewType;
    description: string;
}

type InterviewScheduleFormProps = {
    onSubmit: (schedule: { scheduledTime: Date; type: InterviewType; description?: string }) => void;
    onCancel: () => void;
};

const InterviewScheduleForm = ({ onSubmit, onCancel }: InterviewScheduleFormProps) => {
    return (
        <Formik<FormValues>
            initialValues={{
                scheduledTime: null,
                type: "online",
                description: "",
            }}
            validationSchema={InterviewScheduleSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                if (values.scheduledTime) {
                    onSubmit({
                        scheduledTime: values.scheduledTime.toDate(),
                        type: values.type,
                        description: values.description,
                    });
                }
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
                        {/* DateTimePicker */}
                        <DateTimePicker
                            label="Scheduled Time"
                            value={values.scheduledTime}
                            onChange={(date) => setFieldValue("scheduledTime", date)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: Boolean(touched.scheduledTime && errors.scheduledTime),
                                    helperText: touched.scheduledTime && errors.scheduledTime,
                                },
                            }}
                        />

                        <TextField
                            select
                            label="Interview Type"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            error={Boolean(touched.type && errors.type)}
                            helperText={touched.type && errors.type}
                        >
                            <MenuItem value="online">Online</MenuItem>
                            <MenuItem value="offline">Offline</MenuItem>
                        </TextField>

                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            error={Boolean(touched.description && errors.description)}
                            helperText={touched.description && errors.description}
                        />

                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                            <Button onClick={onCancel} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default InterviewScheduleForm;
