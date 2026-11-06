import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: import.meta.env.WIX_CLIENT_ID,
        clientSecret: import.meta.env.WIX_CLIENT_SECRET,
    }),
});

export default async function fetchArticles ({ collection, count = 10, categoryName, slug } = {}) {
    try {
        let query = wixClient.items.query(collection);

        if (categoryName) {
            query = query.eq('category', categoryName);
        }

        if (slug) {
            query = query.eq('slug', slug);
        }

        if (count !== undefined && count !== null) {
            query = query.limit(count);
        }

        const result = await query.find();
        return result.items || [];

    } catch (error) {
        console.error('Error fetching articles from Wix:', error);
        throw new Error(`Failed to fetch articles: ${error.message}`);
    }
}