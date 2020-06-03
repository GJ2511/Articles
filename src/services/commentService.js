import { ARTICLE_URL } from './constant';
import AuthService from './authService';

const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class CommentService {
    async getComments(slug) {
        const loggedInUser = AuthService.getLoggedInUser();

        const requestHeaders = {
            ...headers,
            ...(loggedInUser && { Authorization: `Token ${loggedInUser.token}` }),
        };

        const response = await fetch(`${ARTICLE_URL}/${slug}/comments`, { headers: requestHeaders });
        const result = await response.json();

        return result;
    }

    async addComment({ slug, payload }) {
        const response = await fetch(`${ARTICLE_URL}/${slug}/comments`, {
            method: 'POST',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
            body: JSON.stringify({ comment: { body: payload } }),
        });
        const result = await response.json();

        return result;
    }

    async deleteComment({ slug, commentId }) {
        const response = await fetch(`${ARTICLE_URL}/${slug}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
        });
        const result = await response.json();

        return result;
    }
}

export default new CommentService();
