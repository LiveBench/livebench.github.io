import React, { useState, useEffect } from 'react';

const Checkboxes = ({ categories, checkedCategories, handleCheckboxChange }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Define a function to handle window resize
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {screenWidth > 1315 && (
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
            )}
        </div>
    );
};

export default Checkboxes;