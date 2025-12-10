import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const myWixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID,
    }),
});

export default async function fetchArticles({collection, count} = {}) {
    let response = await myWixClient.items.query(collection);

    if(count != null) {
        response = response.limit(count);
    }

    const articles = await response.find();
    return articles.items;
}