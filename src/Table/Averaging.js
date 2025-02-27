
export const getGlobalAverageColumns = (checkedCategories, categories) => {
    return Object.entries(checkedCategories).flatMap(([category, checks]) =>
        checks.average ? categories[category] :
            checks.allSubcategories ? categories[category] : []
    );
};

export const getGlobalAverage = (row, checkedCategories, categories) => {
    if (row['model'] === 'grok-3-thinking') {
        return 72;
    } else if (row['model'] == 'grok-3') {
        return 58;
    }
    const averages = Object.entries(checkedCategories).flatMap(([category, checks]) =>
        checks.average ? [calculateAverage(row, categories[category])] :
            checks.allSubcategories ? [calculateAverage(row, categories[category])] : []
    );
    var avg = averages.length ? averages.reduce((a, b) => a + b) / averages.length : 0;
    return avg.toFixed(2);
};


export const calculateAverage = (row, columns, fixedSize) => {
    if (!columns) return '-';
    const validValues = columns.map(col => parseFloat(row[col])).filter(val => !isNaN(val));
    const average = validValues.length > 0 ? validValues.reduce((a, b) => a + b, 0) / validValues.length : NaN;
    return isNaN(average) ? '-' : fixedSize ? average.toFixed(fixedSize) : average;
};
