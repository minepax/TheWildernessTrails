import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const myWixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: import.meta.env.VITE_WIX_CLIENT_ID,
    }),
});

export default async function fetchArticles({collection, count, categoryName, slug} = {}) {
    let response = await myWixClient.items.query(collection);

    if (categoryName) {
        response = response.eq('category', categoryName);
    }

    if (slug) {
        response = response.eq('slug', slug);
    }

    if(count != null) {
        response = response.limit(count);
    }

    const articles = await response.find();
    return articles.items;
}