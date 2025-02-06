// src/Table/CSVTable.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import { calculateAverage, getGlobalAverage } from './Averaging';
import { useTable } from "./SortTable";
import { modelLinks } from './modelLinks';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';


const CSVTable = ({dateStr}) => {
    const date = new Date(dateStr).toISOString().split('T')[0].replaceAll('-', '_');
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState({});
    const [checkedCategories, setCheckedCategories] = useState({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [searchParams, setSearchParams] = useSearchParams();

    const [showProvider, setShowProvider] = useState(true);

    const updateURL = (checkedCategories, newFilter) => {
        const params = new URLSearchParams();
    
        let allAverages = true;
        let anySubcategories = false;
        // Add only the categories with active selections to query params
        Object.keys(checkedCategories).forEach(category => {
            if (checkedCategories[category].average && checkedCategories[category].allSubcategories) {
                params.append(category, 'as');
            } else if (checkedCategories[category].average) {
                params.append(category, 'a'); // 'a' for average
            } else if (checkedCategories[category].allSubcategories) {
                allAverages = false;
                anySubcategories = true;
                params.append(category, 's'); // 's' for subcategories
            } else {
                allAverages = false;
            }
        });

        if (Object.keys(newFilter).length > 0) {
            Object.keys(newFilter).forEach(key => {
                newFilter[key].length > 0 && params.append(key, newFilter[key].join(','));
            });
        }

        if (searchParams.has('q')) {
            params.set('q', searchParams.get('q'));
        }

        if (allAverages && !anySubcategories) {
            const newParams = new URLSearchParams();
            if (searchParams.has('q')) {
                newParams.set('q', searchParams.get('q'));
            }
            if (Object.keys(newFilter).length > 0) {
                Object.keys(newFilter).forEach(key => {
                    newFilter[key].length > 0 && newParams.append(key, newFilter[key].join(','));    
                });
            }
            setSearchParams(newParams);
            return;
        }
    
        setSearchParams(params);
    };


    // Define columns as a memoized array
    const columns = useMemo(() => [
        { label: "Model", accessor: "model", sortable: true, visible: true },
        { label: "CTA", accessor: "cta", sortable: true, visible: false },
        { label: "JoinMap", accessor: "tablejoin", sortable: true, visible: false },
        { label: "Table Reformat", accessor: "tablereformat", sortable: true, visible: false },
        { label: "AIME", accessor: "AIME", sortable: true, visible: false },
        { label: "AMC", accessor: "AMC", sortable: true, visible: false },
        { label: "Spatial", accessor: "spatial", sortable: true, visible: false },
        { label: "AMPS_Hard", accessor: "AMPS_Hard", sortable: true, visible: false },
        { label: "web_of_lies_v2", accessor: "web_of_lies_v2", sortable: true, visible: false },
        { label: "zebra_puzzle", accessor: "zebra_puzzle", sortable: true, visible: false },
        { label: "SMC", accessor: "smc", sortable: true, visible: true },
        { label: "IMO", accessor: "imo", sortable: true, visible: true },
        { label: "Connections", accessor: "connections", sortable: true, visible: true },
        { label: "Plot Unscrambling", accessor: "movie_unscrambling", sortable: true, visible: true },
        { label: "Typo Fixing", accessor: "typos", sortable: true, visible: true },
        { label: "Paraphrase", accessor: "paraphrase", sortable: true, visible: true },
        { label: "simplify", accessor: "simplify", sortable: true, visible: true },
        { label: "Story Generation", accessor: "story_generation", sortable: true, visible: true },
        { label: "Summarize", accessor: "summarize", sortable: true, visible: true },
        { label: "Global Average", accessor: "ga", sortable: true, visible: true, sortbyOrder: "desc" },
        { label: "Reasoning", accessor: "average_reasoning", sortable: true, visible: true },
        { label: "Coding", accessor: "average_coding", sortable: true, visible: true },
        { label: "Data Analysis", accessor: "average_data_analysis", sortable: true, visible: true },
        { label: "Language", accessor: "average_language", sortable: true, visible: true },
        { label: "IF", accessor: "average_instruction_following", sortable: true, visible: true },
        { label: "Mathematics", accessor: "average_math", sortable: true, visible: true }
    ], []);

    const [sortedData, handleSorting, handleSearch, handleFilter, sortField, sortOrder, searchQuery, filter] = useTable(data, columns, checkedCategories, categories, 'model', modelLinks);


    useEffect(() => {
        fetch(process.env.PUBLIC_URL + `/table_${date}.csv`)
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

        fetch(process.env.PUBLIC_URL + `/categories_${date}.json`)
            .then(response => response.json())
            .then(json => {
                setCategories(json);
                const checked = Object.keys(json).reduce((acc, category) => {
                    acc[category] = { average: true, allSubcategories: false };
                    return acc;
                }, {});
                setCheckedCategories(checked);

            });

        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [date]);

    useEffect(() => {
        if (Object.keys(categories).length === 0) {
            return;
        }
        if (searchParams.toString() === '') {
            return;
        } 

        const anyCatParams = Array.from(searchParams.keys()).some(key => Object.keys(categories).includes(key));

        // Parse URL parameters after categories are set
        const updatedCategories = Object.keys(categories).reduce((acc, category) => {
            acc[category] = { average: !anyCatParams, allSubcategories: false };
            return acc;
        }, {});
        const updatedFilter = {};
        searchParams.forEach((value, category) => {

            if (category === 'q') {
                handleSearchChange(value);
                return;
            } else if (Object.keys(categories).includes(category)) {
                if (value.includes('a')) {
                    updatedCategories[category].average = true;
                }
                if (value.includes('s')) {
                    updatedCategories[category].allSubcategories = true;
                }
            } else {
                updatedFilter[category] = value.split(',');
            }
        });

        setCheckedCategories(updatedCategories);
        handleFilter(updatedFilter);
        updateSorting(updatedCategories);
    }, [categories, searchParams]);

    useEffect(() => {
        if (Object.keys(checkedCategories).length === 0) {
            return;
        }
        
        // Add the URL update to reflect the checkbox state
        updateURL(checkedCategories, filter);
    }, [checkedCategories]);

    useEffect(() => {
        if (Object.keys(filter).length === 0) {
            return;
        }
        updateURL(checkedCategories, filter);
    }, [checkedCategories, filter]);

    const handleCheckboxChange = (clickedCategory, type) => {

        // Preserve the original logic for handling checkboxes
        const updatedCategories = { ...checkedCategories };

        updatedCategories[clickedCategory][type] = !checkedCategories[clickedCategory][type];

        

        // If 'average' for a category is checked, uncheck 'allSubcategories' for all other categories
        if (type === 'average') {
            Object.keys(updatedCategories).forEach(category => {
                if (category === clickedCategory) {
                    return;
                }
                updatedCategories[category].allSubcategories = false;
            });
        }

        // If 'allSubcategories' for a category is checked, uncheck everything for all other categories
        if (type === 'allSubcategories') {
            Object.keys(updatedCategories).forEach(category => {
                if (category !== clickedCategory) {
                    updatedCategories[category].average = false;
                    updatedCategories[category].allSubcategories = false;
                } else if (updatedCategories[category].allSubcategories) {
                    updatedCategories[category].average = true;
                }
            });
        }

        // Default behavior when no checkboxes are active
        const noCheckboxIsActive = !Object.values(updatedCategories).some(cat => cat.average || cat.allSubcategories);
        if (noCheckboxIsActive) {
            Object.keys(updatedCategories).forEach(category => {
                updatedCategories[category].average = true;
            });
        }

        updateSorting(updatedCategories, clickedCategory, type);

        setCheckedCategories(updatedCategories);

    };

    useEffect(() => {
        if (data && modelLinks) {
            for (const row of data) {
                if (!(row.model in modelLinks)) {
                    console.warn('missing link for model', row.model);
                }
            }
        }
    }, [data, modelLinks]);

    const updateSorting = (newCheckedCategories) => {

        if (sortField === 'model' || sortField === 'organization') {
            return;
        }

        let newSortField = sortField;
        const newNumCheckedCategories = Object.values(newCheckedCategories).filter(cat => cat.average || cat.allSubcategories).length;

        let sortFieldCategory = '';
        let wereSortingByCategory = false;
        let wereSortingBySubcategory = false;
        if (sortField.endsWith('Average')) {
            sortFieldCategory = sortField.split(' Average')[0];
            wereSortingByCategory = true;
        } else {
            sortFieldCategory = Object.keys(categories).find(category => categories[category].includes(sortField));
            wereSortingBySubcategory = true;
        }

        if (sortField === 'ga' || (wereSortingByCategory && !newCheckedCategories[sortFieldCategory].average) || (wereSortingBySubcategory && !newCheckedCategories[sortFieldCategory].allSubcategories)) {
            if (newNumCheckedCategories === 1) {
                // if there is only one category checked, sort by that category
                const checkedCategory = Object.keys(newCheckedCategories).find(cat => newCheckedCategories[cat].average || newCheckedCategories[cat].allSubcategories);
                newSortField = `${checkedCategory.charAt(0).toUpperCase() + checkedCategory.slice(1)} Average`;
            } else {
                // if there are multiple categories checked, sort by global average
                newSortField = 'ga';
            }
        }


        handleSorting(newSortField, sortOrder);
    }
    
    

    const handleSortingChange = (accessor) => {
        const order = accessor === sortField && sortOrder === "desc" ? "asc" : "desc";
        handleSorting(accessor, order);
    };

    const handleSearchChange = (value) => {
        handleSearch(value);
        const newParams = new URLSearchParams(searchParams);
        if (value !== "") {
            newParams.set('q', value);
        } else {
            newParams.delete('q');
        }
        setSearchParams(prev => newParams);
    }

    const handleFilterChange = (filter) => {
        if (filter.length === 0) {
            updateURL(checkedCategories, {});
        }
        handleFilter({organization: filter.map(f => f.value)});
    }
    
    // Utility to compute class for sorting
    const getSortClass = (accessor) => {
        return sortField === accessor ? (sortOrder === "asc" ? "up" : "down") : "default";
    };

    const numCheckedCategories = Object.values(checkedCategories).filter(cat => cat.average || cat.allSubcategories).length;

    const modelProviders = Array.from(new Set(data.map(row => modelLinks[row.model]?.organization ?? 'Unknown'))).sort();

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
            <div className="other-controls">
                <input type="checkbox" checked={showProvider} onChange={() => setShowProvider(!showProvider)} id="showProvider" />
                <label htmlFor="showProvider" style={{marginLeft: '0.5rem'}}>Show Organization</label>
                <button onClick={() => {setCheckedCategories(Object.keys(checkedCategories).reduce((acc, category) => {acc[category] = {average: true, allSubcategories: false}; return acc;}, {})); handleFilter({}); handleSearch(''); updateURL(checkedCategories, filter); handleSorting('ga', 'desc');}} className="clear-filters-button">Clear Filters</button>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
            </div>
            <div className="filter-bar">
                <Select
                    isMulti
                    placeholder="Filter by organization..."
                    options={modelProviders.map(organization => ({label: organization, value: organization}))}
                    onChange={handleFilterChange}
                    styles={{
                        control: (styles) => ({
                            ...styles,
                            width: '100%',
                            borderColor: '#000000'
                        }),
                        menu: (styles) => ({
                            ...styles,
                            width: '100%',
                            zIndex: 1000
                        })
                    }}
                    value={filter && filter.organization ? filter.organization.map(p => ({label: p, value: p})) : []}
                />
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
                                {showProvider && <th
                                    className={`sticky-col organization-col ${getSortClass("organization")}`}
                                    onClick={() => handleSortingChange("organization")}>
                                    Organization</th>}
                                {numCheckedCategories > 1 && <th
                                    className={`sticky-col globalAverage-col ${getSortClass("ga")}`}
                                    onClick={() => handleSortingChange("ga")}>
                                    Global Average</th>}
                                {Object.entries(checkedCategories).flatMap(([category, checks]) => {
                                    const res = [];
                                    if (checks.average) {
                                        res.push(`${category} Average`);
                                    }
                                    if (checks.allSubcategories) {
                                        categories[category].forEach(subCat => res.push(subCat));
                                    }
                                    return res;

                                }).map((header, index) => (
                                    <th
                                        key={index}
                                        onClick={() => handleSortingChange(header)}
                                        className={getSortClass(header)}>
                                        {header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((row, index) => 
                                <tr key={index}>
                                    <td className="sticky-col model-col">
                                        <a href={modelLinks[row.model]?.url ?? '#'} target="_blank" rel="noopener noreferrer">
                                            {row.model}
                                        </a>
                                    </td>
                                    {showProvider && <td className="sticky-col organization-col">{modelLinks[row.model]?.organization ?? 'Unknown'}</td>}
                                    {numCheckedCategories > 1 && <td className="sticky-col globalAverage-col">{getGlobalAverage(row, checkedCategories, categories)}</td>}
                                    {Object.entries(checkedCategories).flatMap(([category, checks]) => {
                                        const res = [];
                                        if (checks.average) {
                                            res.push(calculateAverage(row, categories[category]).toFixed(2));
                                        }
                                        if (checks.allSubcategories) {
                                            categories[category].forEach(subCat => res.push(row[subCat] == null ? '-' : parseInt(row[subCat]) === row[subCat] ? row[subCat] : row[subCat].toFixed(2)));
                                        }
                                        return res;
                                    }).map((cell, idx) => <td key={idx}>{cell}</td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CSVTable;
