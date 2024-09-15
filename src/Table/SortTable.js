import { useState, useEffect } from "react";
import { getGlobalAverage, calculateAverage} from './Averaging';

export const useSortableTable = (data, columns, checkedCategories, categories) => {
    const [tableData, setTableData] = useState([]);

    const sortData = (sortField, sortOrder, sortingData, checkedCategories, categories) => {
        return [...sortingData].sort((a, b) => {
            // Null handling standard across all fields
            if (a[sortField] === null) return 1;
            if (b[sortField] === null) return -1;
            if (a[sortField] === null && b[sortField] === null) return 0;

            // Global average case
            if (sortField === 'ga') {
                const globalAvgA = parseFloat(getGlobalAverage(a, checkedCategories, categories));
                const globalAvgB = parseFloat(getGlobalAverage(b, checkedCategories, categories));
                return (globalAvgA - globalAvgB) * (sortOrder === "asc" ? 1 : -1);
            } else if (sortField.includes("Average")) {
                // Extract the category name from sortField
                const categoryName = sortField.replace(" Average", "");  // Assuming standardized naming as "<categoryName> Average"
                const categoryColumns = categories[categoryName];
                const avgA = calculateAverage(a, categoryColumns);
                const avgB = calculateAverage(b, categoryColumns);
                return (avgA - avgB) * (sortOrder === "asc" ? 1 : -1);
            } else {
                // Default numeric or string comparison
                return (
                    (a[sortField] - b[sortField]) * (sortOrder === "asc" ? 1 : -1)
                );
            }
        });
    };

    useEffect(() => {
        const initialSortField = columns.find(col => col.sortbyOrder)?.accessor || "model";
        const initialSortOrder = columns.find(col => col.sortbyOrder)?.sortbyOrder || "asc";
        setTableData(sortData(initialSortField, initialSortOrder, data, checkedCategories, categories));
    }, [data, columns, checkedCategories, categories]);

    const handleSorting = (sortField, sortOrder) => {
        setTableData(sortData(sortField, sortOrder, data, checkedCategories, categories));
    };

    return [tableData, handleSorting];
};