import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: import.meta.env.WIX_CLIENT_ID,
        clientSecret: import.meta.env.WIX_CLIENT_SECRET,
    }),
});

// export default async function fetchArticles({collection, count, categoryName, slug} = {}) {
//     let response = await wixClient.items.query(collection);

//     if (categoryName) {
//         response = response.eq('category', categoryName);
//     }

//     if (slug) {
//         response = response.eq('slug', slug);
//     }

//     if(count != null) {
//         response = response.limit(count);
//     }

//     const articles = await response.find();
//     return articles.items;
// }

/**
 * Fetches articles from the Wix CMS with optional filtering.
 * @param {Object} options
 * @param {string} options.collection - The name of the Wix collection.
 * @param {number} [options.count] - The maximum number of items to return.
 * @param {string} [options.categoryName] - Filter by category.
 * @param {string} [options.slug] - Filter by specific slug.
 * @returns {Promise<Array>} - Returns an array of articles.
 */
export default async function fetchArticles({
    collection,
    count = 10, // Default count to avoid fetching too much data
    categoryName,
    slug
} = {}) {
    try {
        // Start the query
        let query = wixClient.items.query(collection);

        // 2. Dynamic Filtering
        if (categoryName) {
            query = query.eq('category', categoryName);
        }

        if (slug) {
            query = query.eq('slug', slug);
        }

        // 3. Apply limit
        if (count !== undefined && count !== null) {
            query = query.limit(count);
        }

        const result = await query.find();

        // 4. Ensure we always return an array
        return result.items || [];

    } catch (error) {
        console.error('Error fetching articles from Wix:', error);
        // Rethrow or handle based on your needs (e.g., return empty array or a custom error)
        throw new Error(`Failed to fetch articles: ${error.message}`);
    }
}