import { sanitizeHtml } from "@core/utils/helper";
import { Box } from "@mui/material";
import Quill from "quill";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value?: string;
  onData: (data: string) => void;
  placeholder?: string;
  toolbarOptions: any[];
  height?: string;
  editorId: string; // New prop to accept a unique ID
}

const QuillEditor2 = ({
  value,
  onData,
  placeholder = "Write something...",
  toolbarOptions,
  height = "150px",
  editorId, 
}: QuillEditorProps) => {
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current && typeof window !== "undefined") {
      quillRef.current = new Quill(`#${editorId}`, { 
        modules: { toolbar: toolbarOptions },
        placeholder,
        theme: "snow",
      });

      if (quillRef.current && value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      quillRef.current.on("text-change", () => {
        if (quillRef.current?.getLength() === 1) {
          onData("");
        } else {
          const htmlContent = quillRef.current?.root.innerHTML || "";
          const sanitizedContent = sanitizeHtml(htmlContent);
          onData(sanitizedContent);
        }
      });
    }
  }, [value, editorId]);

  return (
    <Box>
      <div id={editorId} style={{ height }} />
    </Box>
  );
};

export default QuillEditor2;
