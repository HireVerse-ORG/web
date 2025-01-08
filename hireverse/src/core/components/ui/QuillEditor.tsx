import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Quill, { QuillOptions } from 'quill';
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
    readOnly?: boolean;
    defaultValue?: any;
    onTextChange?: (delta: any, oldDelta: any, source: string) => void;
    onSelectionChange?: (range: any, oldRange: any, source: string) => void;
    modules?: QuillOptions["modules"];
    placeholder?: QuillOptions["placeholder"];
    style?: React.CSSProperties;
    maxLength?: number;
}

const QuillEditor = forwardRef<Quill | null, QuillEditorProps>(
    (
        {
            readOnly = false,
            defaultValue,
            onTextChange,
            onSelectionChange,
            modules = {},
            placeholder = 'Write Something...',
            style,
            maxLength,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);
        const [contentLength, setContentLength] = useState(0);

        // Keep refs updated
        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        // Toggle readOnly mode
        useEffect(() => {
            ref && (ref as React.MutableRefObject<Quill | null>).current?.enable(!readOnly);
        }, [readOnly, ref]);

        // Initialize Quill editor
        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const editorContainer = container.ownerDocument.createElement('div');
            container.appendChild(editorContainer);

            const quill = new Quill(editorContainer, {
                theme: 'snow',
                modules,
                readOnly,
                placeholder,
            });

            // Assign Quill instance to ref
            if (ref && typeof ref === 'object') {
                ref.current = quill;
            }

            // Set default value
            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            // Attach event listeners
            quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
                const length = quill.getText().length;
                setContentLength(length);

                if (maxLength && length > maxLength) {
                    quill.deleteText(maxLength, length); 
                }

                onTextChangeRef.current?.(delta, oldDelta, source);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                if (ref && typeof ref === 'object') {
                    ref.current = null;
                }
                container.innerHTML = '';
            };
        }, [ref, modules, readOnly, placeholder, maxLength]);

        return (
            <>
                <div style={{ marginBottom: "50px" }}>
                    <div ref={containerRef} style={{ ...style }} />
                </div>
                {maxLength && (
                    <div style={{
                        textAlign: "right",
                        marginTop: '5px',
                        fontSize: '12px',
                        color: contentLength > maxLength ? 'red' : 'gray'
                    }}>
                        {contentLength}/{maxLength}
                    </div>
                )}
            </>
        );
    },
);

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
