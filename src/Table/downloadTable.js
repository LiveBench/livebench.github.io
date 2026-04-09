import Papa from 'papaparse';
import { getModelInfo } from './modelLinks';

const numericAverage = (row, columns) => {
    if (!columns) return null;
    const validValues = columns.map(col => parseFloat(row[col])).filter(val => !isNaN(val));
    if (validValues.length === 0) return null;
    return Math.round((validValues.reduce((a, b) => a + b, 0) / validValues.length) * 100) / 100;
};

const numericGlobalAverage = (row, checkedCategories, categories) => {
    if (row['model'] === 'grok-3-thinking') return 72;
    if (row['model'] === 'grok-3') return 58;
    const averages = Object.entries(checkedCategories).flatMap(([category, checks]) =>
        (checks.average || checks.allSubcategories) ? [numericAverage(row, categories[category])] : []
    ).filter(v => v !== null);
    if (averages.length === 0) return null;
    return Math.round((averages.reduce((a, b) => a + b, 0) / averages.length) * 100) / 100;
};

export const buildCurrentViewData = (displayedData, checkedCategories, categories, { showProvider, showApiName, displayNameCounts }) => {
    const numCheckedCategories = Object.values(checkedCategories).filter(cat => cat.average || cat.allSubcategories).length;
    return displayedData.map(row => {
        const info = getModelInfo(row.model);

        const displayName = showApiName ? row.model : (() => {
            const name = info?.displayName ?? row.model;
            const version = info?.version;
            if (displayNameCounts[name] > 1 && version !== undefined) {
                return `${name} (${version})`;
            }
            return name;
        })();

        const obj = { Model: displayName };

        if (showProvider) {
            obj['Organization'] = info?.organization ?? '';
        }

        if (numCheckedCategories > 1) {
            obj['Global Average'] = numericGlobalAverage(row, checkedCategories, categories);
        }

        Object.entries(checkedCategories).forEach(([category, checks]) => {
            if (checks.average) {
                obj[`${category} Average`] = numericAverage(row, categories[category]);
            }
            if (checks.allSubcategories) {
                categories[category].forEach(subCat => {
                    const val = parseFloat(row[subCat]);
                    obj[subCat] = isNaN(val) ? null : val;
                });
            }
        });

        return obj;
    });
};

export const buildFullData = (data, categories) => {
    return data.map(row => {
        const info = getModelInfo(row.model);

        const allChecked = Object.keys(categories).reduce((acc, cat) => {
            acc[cat] = { average: true, allSubcategories: false };
            return acc;
        }, {});

        const obj = {
            Model: info?.displayName ?? row.model,
            'API Name': row.model,
            Organization: info?.organization ?? '',
            'Global Average': numericGlobalAverage(row, allChecked, categories),
        };

        Object.entries(categories).forEach(([category, columns]) => {
            obj[`${category} Average`] = numericAverage(row, columns);
            columns.forEach(col => {
                const val = parseFloat(row[col]);
                obj[col] = isNaN(val) ? null : val;
            });
        });

        return obj;
    });
};

const triggerDownload = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 200);
};

export const downloadCSV = (rows, filename) => {
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    triggerDownload(blob, filename);
};

export const downloadJSON = (rows, filename) => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    triggerDownload(blob, filename);
};

export const downloadExcel = async (rows, filename) => {
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LiveBench');
    XLSX.writeFile(wb, filename);
};
