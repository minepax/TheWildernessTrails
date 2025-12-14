export function formatCategoryName(categoryName) {
    if (!categoryName) return '';
    const withSpaces = categoryName.replace(/-/g, ' ');
    return withSpaces.split(' ')
        .map(word => {
            if (!word) return '';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}