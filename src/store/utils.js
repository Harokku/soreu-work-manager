// This file contains utility functions that are used in the store
//

// This function is used to divide the issues into categories
export const dividePerCategory = (issues) => {
    const categories = {};
    issues.forEach((issue) => {
        if (!categories[issue.category]) {
        categories[issue.category] = [];
        }
        categories[issue.category].push(issue);
    });
    return categories;
}
