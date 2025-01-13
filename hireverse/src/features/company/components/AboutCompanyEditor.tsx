import { sanitizeHtml } from "@core/utils/helper";
import { Box } from "@mui/material";
import Quill from "quill";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const AboutCompanyEditor = ({ value, onData }: { value?: string; onData: (data: string) => void }) => {
    const quillRef = useRef<Quill | null>(null);

    const toolbarOptions = [
        [{ 'header': '2' }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
    ];

    useEffect(() => {
        if (!quillRef.current && typeof window !== "undefined") {
            quillRef.current = new Quill("#about-company-editor", {
                modules: { toolbar: toolbarOptions },
                placeholder: "Write about your company",
                theme: "snow",
            });

            if (quillRef.current && value) {
                quillRef.current.clipboard.dangerouslyPasteHTML(value);
            }

            quillRef.current.on("text-change", () => {
                const htmlContent = quillRef.current?.root.innerHTML || "";
                const sanitizedContent = sanitizeHtml(htmlContent);
                onData(sanitizedContent);
            });
        }
    }, [value]); 

    return (
        <Box>
            <div id="about-company-editor" style={{ height: "200px" }} />
        </Box>
    );
};

export default AboutCompanyEditor;
