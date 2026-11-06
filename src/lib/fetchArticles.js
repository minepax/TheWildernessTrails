import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: import.meta.env.WIX_CLIENT_ID,
        clientSecret: import.meta.env.WIX_CLIENT_SECRET,
    }),
});

/**
 * Fetches articles from the Wix CMS with optional filtering.
 * @param {Object} options
 * @param {string} options.collection - The name of the Wix collection.
 * @param {number} [options.count] - The maximum number of items to return.
 * @param {string} [options.categoryName] - Filter by category.
 * @param {string} [options.slug] - Filter by specific slug.
 * @returns {Promise<Array>} - Returns an array of articles.
 */

export default async function fetchArticles ({ collection, count = 10, categoryName, slug } = {}) {
    try {
        let query = wixClient.items.query(collection);

        if (categoryName) query = query.eq('category', categoryName);
        if (slug) query = query.eq('slug', slug);
        if (count !== undefined && count !== null) query = query.limit(count);

        const result = await query.find();
        return result.items || [];

    } catch (error) {
        console.error('Error fetching articles from Wix:', error);
        throw new Error(`Failed to fetch articles: ${error.message}`);
    }
}