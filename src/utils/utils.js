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

export function resolveImageURL(image) {
    if (image) {
        const fullURL = 'https://static.wixstatic.com/media/' + image.split('/')[3];
        return fullURL;
    } else {
        return null;
    }
}

// export function resolveImageURL(image, width = 1200) {
//     if (image) {
//         const mediaId = image.split('/')[3];
//         // Wix Image API format: https://static.wixstatic.com/media/{mediaId}/v1/fill/w_{width},h_{height},q_80,enc_auto/image.webp
//         // We can omit height to maintain aspect ratio
//         return `https://static.wixstatic.com/media/${mediaId}/v1/fill/w_${width},q_80,enc_auto/image.webp`;
//     } else {
//         return null;
//     }
// }