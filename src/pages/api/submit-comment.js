import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
    modules: { items },
    auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID,
        clientSecret: process.env.WIX_CLIENT_SECRET,
    }),
});

export const POST = async ({ request }) => {
    try {
        const commentData = await request.json();

        const { title, comment, articleSlug } = commentData;
        if (!title || !comment || !articleSlug) {
            return new Response(JSON.stringify({
                message: 'Missing required fields: title, comment, and articleSlug are required.'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const itemToSave = {
            title,
            comment,
            articleSlug,
        };

        const savedItem = await wixClient.items.insert('user-comments', itemToSave);

        return new Response(JSON.stringify({
            message: 'Comment submitted successfully.',
            id: savedItem._id
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Wix Submission Error:', error);

        const status = error.status || 500;
        return new Response(JSON.stringify({
            message: status === 500 ? 'Internal server error.' : error.message,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};