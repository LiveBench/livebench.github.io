// src/Table/CSVTable.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import { calculateAverage, getGlobalAverage } from './Averaging';
import { useTable } from "./SortTable";
import { getModelInfo, getVariantGroup } from './modelLinks';
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
    const [showApiName, setShowApiName] = useState(false);
    const [showReasoners, setShowReasoners] = useState(true);
    const [showOpenWeights, setShowOpenWeights] = useState(false);
    const [showVariants, setShowVariants] = useState(false);

    const updateURL = (checkedCategories, newFilter, newSortField = null, newSortOrder = null, newShowProvider = null, newShowApiName = null, newShowReasoners = null, newShowOpenWeights = null, newShowVariants = null, newSearchQuery = null) => {
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

        const effectiveSearchQuery = newSearchQuery !== null ? newSearchQuery : searchQuery;
        if (effectiveSearchQuery && effectiveSearchQuery !== '') {
            params.set('q', effectiveSearchQuery);
        }

        // Add sort parameters
        const effectiveSortField = newSortField !== null ? newSortField : sortField;
        const effectiveSortOrder = newSortOrder !== null ? newSortOrder : sortOrder;
        if (effectiveSortField && effectiveSortField !== 'ga') {
            params.set('sort', effectiveSortField);
        }
        if (effectiveSortOrder && effectiveSortOrder !== 'desc') {
            params.set('order', effectiveSortOrder);
        }

        // Add display toggle parameters (only if not default values)
        const effectiveShowProvider = newShowProvider !== null ? newShowProvider : showProvider;
        const effectiveShowApiName = newShowApiName !== null ? newShowApiName : showApiName;
        const effectiveShowReasoners = newShowReasoners !== null ? newShowReasoners : showReasoners;
        const effectiveShowOpenWeights = newShowOpenWeights !== null ? newShowOpenWeights : showOpenWeights;
        const effectiveShowVariants = newShowVariants !== null ? newShowVariants : showVariants;
        
        if (!effectiveShowProvider) params.set('provider', 'false');
        if (effectiveShowApiName) params.set('api', 'true');
        if (!effectiveShowReasoners) params.set('reasoners', 'false');
        if (effectiveShowOpenWeights) params.set('openweight', 'true');
        if (effectiveShowVariants) params.set('variants', 'true');

        if (allAverages && !anySubcategories) {
            const newParams = new URLSearchParams();
            if (effectiveSearchQuery && effectiveSearchQuery !== '') {
                newParams.set('q', effectiveSearchQuery);
            }
            if (Object.keys(newFilter).length > 0) {
                Object.keys(newFilter).forEach(key => {
                    newFilter[key].length > 0 && newParams.append(key, newFilter[key].join(','));
                });
            }
            // Add sort parameters even when all averages
            if (effectiveSortField && effectiveSortField !== 'ga') {
                newParams.set('sort', effectiveSortField);
            }
            if (effectiveSortOrder && effectiveSortOrder !== 'desc') {
                newParams.set('order', effectiveSortOrder);
            }
            // Add display toggles even when all averages
            if (!effectiveShowProvider) newParams.set('provider', 'false');
            if (effectiveShowApiName) newParams.set('api', 'true');
            if (!effectiveShowReasoners) newParams.set('reasoners', 'false');
            if (effectiveShowOpenWeights) newParams.set('openweight', 'true');
            if (effectiveShowVariants) newParams.set('variants', 'true');
            setSearchParams(newParams);
            return;
        }

        setSearchParams(params);
    };


    // Define columns as a memoized array
    const columns = useMemo(() => {
        let res = [
            { label: "Model", accessor: "model", sortable: true, visible: true },
            { label: "CTA", accessor: "cta", sortable: true, visible: false },
            { label: "JoinMap", accessor: "tablejoin", sortable: true, visible: false },
            { label: "Table Reformat", accessor: "tablereformat", sortable: true, visible: false },
            { label: "AIME", accessor: "AIME", sortable: true, visible: false },
            { label: "AMC", accessor: "AMC", sortable: true, visible: false },
            { label: "Spatial", accessor: "spatial", sortable: true, visible: false },
            { label: "AMPS_Hard", accessor: "AMPS_Hard", sortable: true, visible: false },
            { label: "Zebra Puzzle", accessor: "zebra_puzzle", sortable: true, visible: false },
            { label: "SMC", accessor: "smc", sortable: true, visible: true },
            { label: "IMO", accessor: "imo", sortable: true, visible: true },
            { label: "Connections", accessor: "connections", sortable: true, visible: true },
            { label: "Plot Unscrambling", accessor: "plot_unscrambling", sortable: true, visible: true },
            { label: "Typo Fixing", accessor: "typos", sortable: true, visible: true },
            { label: "Paraphrase", accessor: "paraphrase", sortable: true, visible: true },
            { label: "Simplify", accessor: "simplify", sortable: true, visible: true },
            { label: "Story Generation", accessor: "story_generation", sortable: true, visible: true },
            { label: "Summarize", accessor: "summarize", sortable: true, visible: true },
            { label: "Global Average", accessor: "ga", sortable: true, visible: true, sortbyOrder: "desc" },
            { label: "Reasoning", accessor: "average_reasoning", sortable: true, visible: true },
            { label: "Coding", accessor: "average_coding", sortable: true, visible: true },
            { label: "Data Analysis", accessor: "average_data_analysis", sortable: true, visible: true },
            { label: "Language", accessor: "average_language", sortable: true, visible: true },
            { label: "IF", accessor: "average_instruction_following", sortable: true, visible: true },
            { label: "Mathematics", accessor: "average_math", sortable: true, visible: true }
        ];

        if (dateStr > '2024-11-25') {
            res.push({ label: "web_of_lies_v2", accessor: "web_of_lies_v2", sortable: true, visible: false })
        } else {
            res.push({ label: "web_of_lies_v3", accessor: "web_of_lies_v3", sortable: true, visible: false })
        }

        if (dateStr >= '2025-11-25') {
            res.push({ label: "Theory of Mind", accessor: "theory_of_mind", sortable: true, visible: true });
        }

        return res;
    }, [dateStr]);

    const [sortedData, handleSorting, handleSearch, handleFilter, sortField, sortOrder, searchQuery, filter] = useTable(data, columns, checkedCategories, categories, 'model', getModelInfo);

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
        searchParams.forEach((value, key) => {

            if (key === 'q') {
                handleSearchChange(value);
                return;
            } else if (key === 'sort') {
                // Sort parameter will be handled after categories are set
                return;
            } else if (key === 'order') {
                // Sort order will be handled with sort field
                return;
            } else if (key === 'provider') {
                setShowProvider(value === 'true');
                return;
            } else if (key === 'api') {
                setShowApiName(value === 'true');
                return;
            } else if (key === 'reasoners') {
                setShowReasoners(value === 'true');
                return;
            } else if (key === 'openweight') {
                setShowOpenWeights(value === 'true');
                return;
            } else if (key === 'variants') {
                setShowVariants(value === 'true');
                return;
            } else if (Object.keys(categories).includes(key)) {
                if (value.includes('a')) {
                    updatedCategories[key].average = true;
                }
                if (value.includes('s')) {
                    updatedCategories[key].allSubcategories = true;
                }
            } else {
                updatedFilter[key] = value.split(',');
            }
        });

        setCheckedCategories(updatedCategories);
        handleFilter(updatedFilter);
        
        // Handle sort parameters
        if (searchParams.has('sort')) {
            const sortFieldFromUrl = searchParams.get('sort');
            const sortOrderFromUrl = searchParams.get('order') || 'desc';
            handleSorting(sortFieldFromUrl, sortOrderFromUrl);
        } else {
            updateSorting(updatedCategories);
        }
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

    useEffect(() => {
        if (Object.keys(checkedCategories).length === 0) {
            return;
        }
        updateURL(checkedCategories, filter);
    }, [showProvider, showApiName, showReasoners, showOpenWeights, showVariants]);

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
        if (data) {
            for (const row of data) {
                if (!getModelInfo(row.model)) {
                    console.warn('missing link for model', row.model);
                }
            }
        }
    }, [data]);

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
        updateURL(checkedCategories, filter, accessor, order);
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

    const handleResetFilters = () => {
        // Reset categories to all averages
        const defaultCategories = Object.keys(checkedCategories).reduce((acc, category) => {
            acc[category] = {average: true, allSubcategories: false};
            return acc;
        }, {});
        
        // Set all state to defaults
        setCheckedCategories(defaultCategories);
        handleFilter({});
        handleSearch('');
        handleSorting('ga', 'desc');
        setShowProvider(true);
        setShowApiName(false);
        setShowReasoners(true);
        setShowOpenWeights(false);
        setShowVariants(false);
        
        // Update URL with default values (including empty search)
        updateURL(defaultCategories, {}, 'ga', 'desc', true, false, true, false, false, '');
    }

    // Utility to compute class for sorting
    const getSortClass = (accessor) => {
        return sortField === accessor ? (sortOrder === "asc" ? "up" : "down") : "default";
    };

    const numCheckedCategories = Object.values(checkedCategories).filter(cat => cat.average || cat.allSubcategories).length;

    const modelProviders = Array.from(new Set(data.map(row => getModelInfo(row.model)?.organization ?? 'Unknown'))).sort();

    // Create a map to identify models with duplicate display names
    const displayNameCounts = useMemo(() => {
        const counts = {};
        data.forEach(row => {
            const displayName = getModelInfo(row.model)?.displayName;
            if (displayName) {
                counts[displayName] = (counts[displayName] || 0) + 1;
            }
        });
        return counts;
    }, [data]);

    const computeVariantScore = useCallback((row) => {
        if (!row) {
            return -Infinity;
        }
        if (!sortField || sortField === 'ga' || sortField === 'model' || sortField === 'organization') {
            const avg = parseFloat(getGlobalAverage(row, checkedCategories, categories));
            return isNaN(avg) ? -Infinity : avg;
        }
        if (sortField.endsWith(' Average')) {
            const categoryName = sortField.replace(' Average', '');
            const categoryColumns = categories[categoryName];
            const avg = calculateAverage(row, categoryColumns);
            const num = typeof avg === 'number' ? avg : parseFloat(avg);
            return isNaN(num) ? -Infinity : num;
        }
        const numericValue = typeof row[sortField] === 'number' ? row[sortField] : parseFloat(row[sortField]);
        return isNaN(numericValue) ? -Infinity : numericValue;
    }, [sortField, checkedCategories, categories]);

    const filteredRows = useMemo(() => {
        return sortedData.filter(row => {
            const info = getModelInfo(row.model);
            if (!info) {
                return false;
            }
            if (!showReasoners && info.reasoner) {
                return false;
            }
            if (showOpenWeights && !info.openweight) {
                return false;
            }
            return true;
        });
    }, [sortedData, showReasoners, showOpenWeights]);

    const displayedData = useMemo(() => {
        if (showVariants) {
            return filteredRows;
        }
        const bestByGroup = new Map();
        filteredRows.forEach(row => {
            const info = getModelInfo(row.model);
            if (!info) {
                return;
            }
            const group = getVariantGroup(row.model);
            const groupKey = group?.baseName ?? row.model;
            const score = computeVariantScore(row);
            const current = bestByGroup.get(groupKey);
            if (current === undefined || score > current.score) {
                bestByGroup.set(groupKey, { row, score });
            }
        });
        return Array.from(bestByGroup.values()).map(entry => entry.row);
    }, [filteredRows, showVariants, computeVariantScore]);

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
                <label style={{whiteSpace: 'nowrap'}}>
                    <input type="checkbox" checked={showProvider} onChange={() => setShowProvider(!showProvider)} id="showProvider" />
                    <span style={{marginLeft: '0.5rem'}}>Show Organization</span>
                </label>
                <label style={{whiteSpace: 'nowrap', marginLeft: '1rem'}}>
                    <input type="checkbox" checked={showApiName} onChange={() => setShowApiName(!showApiName)} id="showApiName" />
                    <span style={{marginLeft: '0.5rem'}}>Show API Name</span>
                </label>
                <label style={{whiteSpace: 'nowrap', marginLeft: '1rem'}}>
                    <input type="checkbox" checked={showReasoners} onChange={() => setShowReasoners(!showReasoners)} id="showReasoners" />
                    <span style={{marginLeft: '0.5rem'}}>Show Reasoning Models</span>
                </label>
                <label style={{whiteSpace: 'nowrap', marginLeft: '1rem'}}>
                    <input type="checkbox" checked={showOpenWeights} onChange={() => setShowOpenWeights(!showOpenWeights)} id="showOpenWeights" />
                    <span style={{marginLeft: '0.5rem'}}>Show Open Weight Models Only</span>
                </label>
                <label style={{whiteSpace: 'nowrap', marginLeft: '1rem'}}>
                    <input type="checkbox" checked={showVariants} onChange={() => setShowVariants(!showVariants)} id="showVariants" />
                    <span style={{marginLeft: '0.5rem'}}>Show Model Effort Variants</span>
                </label>
                <button onClick={handleResetFilters} className="clear-filters-button">Clear Filters</button>
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
                            {displayedData.map((row, index) => {
                                const info = getModelInfo(row.model);
                                if (!info) {
                                    return null;
                                }
                                const displayName = showApiName ? row.model : (() => {
                                    const name = info?.displayName ?? row.model;
                                    const version = info?.version;
                                    if (!showApiName && displayNameCounts[name] > 1 && version !== undefined) {
                                        return `${name} (${version})`;
                                    }
                                    return name;
                                })();

                                return (
                                    <tr key={index}>
                                        <td className="sticky-col model-col">
                                            <a href={info?.url ?? '#'} target={info?.url ? "_blank" : ""} rel="noopener noreferrer">
                                                {displayName}
                                            </a>
                                            {info.note && <><br/><small>{info.note}</small></>}
                                        </td>
                                        {showProvider && <td className="sticky-col organization-col">{info?.organization ?? ''}</td>}
                                        {numCheckedCategories > 1 && <td className="sticky-col globalAverage-col">{getGlobalAverage(row, checkedCategories, categories)}</td>}
                                        {Object.entries(checkedCategories).flatMap(([category, checks]) => {
                                            const res = [];
                                            if (checks.average) {
                                                res.push(calculateAverage(row, categories[category], 2));
                                            }
                                            if (checks.allSubcategories) {
                                                categories[category].forEach(subCat => res.push(row[subCat] == null ? '-' : parseInt(row[subCat]) === row[subCat] ? row[subCat] : row[subCat]));
                                            }
                                            return res;
                                        }).map((cell, idx) => <td key={idx}>{cell}</td>)}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CSVTable;
