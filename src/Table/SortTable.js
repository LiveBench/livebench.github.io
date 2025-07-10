import { useState, useEffect } from "react";
import { getGlobalAverage, calculateAverage} from './Averaging';
import { modelLinks } from './modelLinks';

export const useTable = (data, columns, checkedCategories, categories, searchColumn, filterInfo) => {
    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState();
    const [sortOrder, setSortOrder] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState({}); // {column: values[]}

    const searchData = (searchQuery, searchColumn, data) => {
        if (searchQuery === "") return data;
        return data.filter((row) => {
            return row[searchColumn].toString().toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    const filterData = (filter, data) => {
        if (Object.keys(filter).length === 0) return data;
        if (Object.keys(filter).every(key => filter[key].length === 0)) return data;
        return data.filter((row) => {
            const rowFilterInfo = filterInfo[row.model];
            if (rowFilterInfo === undefined) return false;
            return Object.keys(filter).every((key) => {
                return filter[key]?.some(value => value.toLowerCase() === rowFilterInfo[key]?.toLowerCase());
            });
        });
    };

    const sortData = (sortField, sortOrder, sortingData, checkedCategories, categories, columns) => {
        const column = columns.find(col => col.accessor === sortField);
        return [...sortingData].sort((a, b) => {
            // Use custom sort function if provided
            if (column?.sortByFn) {
                return column.sortByFn(a, b) * (sortOrder === "asc" ? 1 : -1);
            }
            let primaryCompare = 0;

            // Null handling standard across all fields
            if (a[sortField] === null) return 1;
            if (b[sortField] === null) return -1;
            if (a[sortField] === null && b[sortField] === null) return 0;

            // Global average case
            if (sortField === 'ga') {
                let globalAvgA = 0;
                let globalAvgB = 0;
                globalAvgA = parseFloat(getGlobalAverage(a, checkedCategories, categories));
                globalAvgB = parseFloat(getGlobalAverage(b, checkedCategories, categories));

                primaryCompare = (globalAvgA - globalAvgB) * (sortOrder === "asc" ? 1 : -1);
            } else if (sortField === "organization") {
                // Special case for organization sorting
                const orgA = modelLinks[a.model]?.organization || '';
                const orgB = modelLinks[b.model]?.organization || '';
                primaryCompare = orgA.localeCompare(orgB) * (sortOrder === "asc" ? 1 : -1);
            } else if (sortField.includes("Average")) {
                // Extract the category name from sortField
                const categoryName = sortField.replace(" Average", "");  // Assuming standardized naming as "<categoryName> Average"
                const categoryColumns = categories[categoryName];
                const avgA = calculateAverage(a, categoryColumns);
                const avgB = calculateAverage(b, categoryColumns);
                primaryCompare = (avgA - avgB) * (sortOrder === "asc" ? 1 : -1);
            } else if (sortField === "model") {
                // Special case for model sorting
                primaryCompare = a[sortField].localeCompare(b[sortField]) * (sortOrder === "asc" ? 1 : -1);
            } else {
                // Default numeric or string comparison
                primaryCompare = (a[sortField] - b[sortField]) * (sortOrder === "asc" ? 1 : -1);
            }
            
            // If primary sort values are equal, sort by model name as secondary sort
            if (primaryCompare === 0 && sortField !== "model") {
                return a.model.localeCompare(b.model);
            }
            
            return primaryCompare;
        });
    };

    useEffect(() => {
        const initialSortField = columns.find(col => col.sortbyOrder)?.accessor || "model";
        const initialSortOrder = columns.find(col => col.sortbyOrder)?.sortbyOrder || "asc";
        setSortField(initialSortField);
        setSortOrder(initialSortOrder);
    }, [columns]);

    useEffect(() => {
        let sortedData = sortData(sortField, sortOrder, data, checkedCategories, categories, columns);
        if (searchQuery !== "" && searchColumn !== "") {
            sortedData = searchData(searchQuery, searchColumn, sortedData);
        }
        sortedData = filterData(filter, sortedData);
        setTableData(sortedData);
    }, [data, sortField, sortOrder, searchQuery, searchColumn, checkedCategories, categories, filter, columns]);

    const handleSorting = (sortField, sortOrder) => {
        setSortField(sortField);
        setSortOrder(sortOrder);
    }

    const handleSearch = (searchQuery) => {
        setSearchQuery(searchQuery);
    }

    const handleFilter = (filter) => {
        setFilter(filter);
    }



    return [tableData, handleSorting, handleSearch, handleFilter, sortField, sortOrder, searchQuery, filter];
};