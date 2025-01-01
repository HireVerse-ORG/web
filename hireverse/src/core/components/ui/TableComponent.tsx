import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export interface TableColumn {
    id: string;
    label: string;
    minWidth: number;
    align?: "right" | "left" | "center";
    render?: (row: any) => React.ReactNode;
}

interface TableComponentProps {
    columns: TableColumn[];
    rows: any[];
}

const TableComponent = ({ columns, rows }: TableComponentProps) => {
    const stripeColour = "#F8F8FD";
    const borderColour = "#f0f0f8";

    return (
        <TableContainer>
            <Table>
                <TableHead sx={{ border: `2px solid ${borderColour}`, marginBottom: 2 }}>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align || "left"}
                                style={{
                                    minWidth: column.minWidth,
                                    color: "GrayText",
                                }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {/* Adding gap using margin */}
                <TableBody sx={{ border: `2px solid ${borderColour}` }}>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                backgroundColor: index % 2 === 0 ? stripeColour : "inherit",
                                "&:hover": {
                                    backgroundColor: borderColour,
                                },
                            }}
                        >
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align || "left"}>
                                    {column.render ? column.render(row) : row[column.id]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
