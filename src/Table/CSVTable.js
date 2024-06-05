// src/Table/CSVTable.js
import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';
import { calculateAverage, getGlobalAverage } from './Averaging';
import { useSortableTable } from "./SortTable";


const CSVTable = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState({});
    const [checkedCategories, setCheckedCategories] = useState({});
    // Use the custom hook for sorting
    const [order, setOrder] = useState("asc");
    const [sortField, setSortField] = useState("");
    // const [sortedData, handleSorting] = useSortableTable(data, { key: sortField, direction: order }, categories, checkedCategories);


    // Define columns as a memoized array
    const columns = useMemo(() => [
        { label: "Model", accessor: "model", sortable: true, visible: true },
        { label: "CTA", accessor: "DataBench_CTA", sortable: true, visible: false },
        { label: "JoinMap", accessor: "DataBench_JoinMap", sortable: true, visible: false },
        { label: "AIME", accessor: "AIME", sortable: true, visible: false },
        { label: "AMC", accessor: "AMC", sortable: true, visible: false },
        { label: "House Traversal", accessor: "house_traversal", sortable: true, visible: false },
        { label: "AMPS_Hard", accessor: "AMPS_Hard", sortable: true, visible: false },
        { label: "web_of_lies_v2", accessor: "web_of_lies_v2", sortable: true, visible: false },
        { label: "zebra_puzzle", accessor: "zebra_puzzle", sortable: true, visible: false },
        { label: "SMC", accessor: "smc", sortable: true, visible: true },
        { label: "IMO", accessor: "imo", sortable: true, visible: true },
        { label: "Connections", accessor: "connections", sortable: true, visible: true },
        { label: "Plot Unscrambling", accessor: "movie_unscrambling", sortable: true, visible: true },
        { label: "Typo Fixing", accessor: "typos", sortable: true, visible: true },
        { label: "Paraphrase", accessor: "paraphrase", sortable: true, visible: true },
        { label: "Simpler", accessor: "simpler", sortable: true, visible: true },
        { label: "Story Generation", accessor: "story_generation", sortable: true, visible: true },
        { label: "Summarize", accessor: "summarize", sortable: true, visible: true },
        { label: "Global Average", accessor: "ga", sortable: true, visible: true, sortbyOrder: "desc" },
        { label: "Reasoning", accessor: "average_reasoning", sortable: true, visible: true },
        { label: "Coding", accessor: "average_coding", sortable: true, visible: true },
        { label: "Data Analysis", accessor: "average_data_analysis", sortable: true, visible: true },
        { label: "Writing", accessor: "average_writing", sortable: true, visible: true },
        { label: "IF", accessor: "average_instruction_following", sortable: true, visible: true },
        { label: "Mathematics", accessor: "average_mathematics", sortable: true, visible: true }
    ], []);
    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/table.csv')
            .then(response => response.text())
            .then(text => {
                Papa.parse(text, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        setData(result.data);
                    }
                });
            });

        fetch(process.env.PUBLIC_URL + '/categories.json')
            .then(response => response.json())
            .then(json => {
                setCategories(json);
                const initialChecked = Object.keys(json).reduce((acc, category) => {
                    acc[category] = { average: true, allSubcategories: false };
                    return acc;
                }, {});
                setCheckedCategories(initialChecked);
            });
    }, []);

    const handleCheckboxChange = (clickedCategory, type) => {
        setCheckedCategories(prev => {
            const updatedCategories = Object.keys(prev).reduce((acc, category) => {
                acc[category] = {
                    average: prev[category].average,
                    allSubcategories: prev[category].allSubcategories
                };
                if (category === clickedCategory) {
                    acc[category][type] = !prev[category][type];
                }
                return acc;
            }, {});

            if (type === 'average') {
                Object.keys(updatedCategories).forEach(category => {
                    updatedCategories[category].allSubcategories = false;
                });
            }

            if (type === 'allSubcategories') {
                Object.keys(updatedCategories).forEach(category => {
                    updatedCategories[category].average = false;
                    if (category !== clickedCategory) {
                        updatedCategories[category].allSubcategories = false;
                    }
                });
            }

            const noCheckboxIsActive = !Object.values(updatedCategories).some(cat => cat.average || cat.allSubcategories);
            if (noCheckboxIsActive) {
                Object.keys(updatedCategories).forEach(category => {
                    updatedCategories[category].average = true;
                });
            }

            return updatedCategories;
        });
    };



    const handleSortingChange = (accessor) => {
        const sortOrder = accessor === sortField && order === "desc" ? "asc" : "desc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    const [sortedData, handleSorting] = useSortableTable(data, columns, checkedCategories, categories);

    // Utility to compute class for sorting
    const getSortClass = (accessor) => {
        return sortField === accessor ? (order === "asc" ? "up" : "down") : "default";
    };


    return (
        <div className="table-container">
            <div className="category-checkboxes">
                {Object.keys(categories).map((category, idx) => (
                    <div key={idx} className="category-group">
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkedCategories[category]?.average}
                                    onChange={() => handleCheckboxChange(category, 'average')}
                                />

                                {category} Average
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={checkedCategories[category]?.allSubcategories}
                                    onChange={() => handleCheckboxChange(category, 'allSubcategories')}
                                />
                                Show Subcategories
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="scrollable-table">
                <div className="table-wrap">
                    <table className="main-tabl table">
                        <thead>
                            <tr>
                                <th
                                    className={`sticky-col ${getSortClass("model")}`}
                                    onClick={() => handleSortingChange("model")}>
                                    Model</th>
                                <th
                                    className={`sticky-col globalAverage-col ${getSortClass("ga")}`}
                                    onClick={() => handleSortingChange("ga")}>
                                    Global Average</th>
                                {Object.entries(checkedCategories).flatMap(([category, checks]) =>
                                    checks.average ? [`${category} Average`] :
                                        checks.allSubcategories ? categories[category] : []
                                ).map((header, index) => (
                                    <th
                                        key={index}
                                        onClick={() => handleSortingChange(header)}
                                        className={getSortClass(header)}>
                                        {header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => (
                                <tr key={index}>
                                    <td className="sticky-col model-col">{row.model}</td>
                                    <td className="sticky-col globalAverage-col">{getGlobalAverage(row, checkedCategories, categories)}</td>
                                    {Object.entries(checkedCategories).flatMap(([category, checks]) =>
                                        checks.average ? [calculateAverage(row, categories[category]).toFixed(2)] :
                                            checks.allSubcategories ? categories[category].map(subCat =>
                                                row[subCat] == null ? '-' :
                                                    parseInt(row[subCat]) === row[subCat] ? row[subCat] : row[subCat].toFixed(2)) : []
                                    ).map((cell, idx) => <td key={idx}>{cell}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CSVTable;