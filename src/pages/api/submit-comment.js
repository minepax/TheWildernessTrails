import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config();
}

export const POST = async ({ request }) => {
    try {
        const commentData = await request.json();

        if (!process.env.WIX_CLIENT_ID || !process.env.WIX_CLIENT_SECRET) {
            throw new Error("Missing Wix Client ID or Secret in environment variables.");
        }

        const wixClient = createClient({
            modules: { items },
            auth: OAuthStrategy({
                clientId: process.env.WIX_CLIENT_ID,
                clientSecret: process.env.WIX_CLIENT_SECRET,
            }),
        });

        const itemToSave = {
            title: commentData.title,
            comment: commentData.comment,
            articleSlug: commentData.articleSlug,
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
        
        
        return new Response(JSON.stringify({
            message: 'Failed to save comment to Wix CMS.',
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};