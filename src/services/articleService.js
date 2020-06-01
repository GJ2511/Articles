import { ARTICLE_URL } from './constant';
import AuthService from './authService';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class ArticleService {
    async getArticles(params = {}) {
        const loggedInUser = AuthService.getLoggedInUser();
        let url = `${ARTICLE_URL}?`;

        for (const param in params) {
            url += `${param}=${params[param]}&`;
        }

        const requestHeaders = {
            ...headers,
            ...(loggedInUser && { Authorization: `Token ${loggedInUser.token}` }),
        };

        const response = await fetch(url, { headers: requestHeaders });
        const result = await response.json();

        return result;
    }

    async createArticle(payload) {
        const response = await fetch(ARTICLE_URL, {
            method: 'POST',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
            body: JSON.stringify({ article: payload }),
        });
        const result = await response.json();

        return result;
    }

    async updateArticle({ values, slug }) {
        let url = `${ARTICLE_URL}/${slug}`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
            body: JSON.stringify({ article: values }),
        });
        const result = await response.json();

        return result;
    }

    async getArticle(slug) {
        let url = `${ARTICLE_URL}/${slug}`;

        const response = await fetch(url, { headers });
        const result = await response.json();

        return result;
    }

    async markArticleFav(slug) {
        let url = `${ARTICLE_URL}/${slug}/favorite`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
        });
        const result = await response.json();

        return result;
    }

    async unmarkArticleFav(slug) {
        let url = `${ARTICLE_URL}/${slug}/favorite`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: { ...headers, Authorization: `Token ${AuthService.getLoggedInUser().token}` },
        });
        const result = await response.json();

        return result;
    }
}

export default new ArticleService();
