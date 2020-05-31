import { ARTICLE_URL } from './constant';
import AuthService from './authService';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class ArticleService {
    async getArticles(params = {}) {
        let url = `${ARTICLE_URL}?`;

        for (const param in params) {
            url += `${param}=${params[param]}&`;
        }

        const response = await fetch(url, { headers });
        const result = await response.json();

        return result;
    }

    async createArticle(payload) {
        const response = await fetch(ARTICLE_URL, {
            method: 'POST',
            headers: { ...headers, Authorization: `TOKEN ${AuthService.getLoggedInUser().token}` },
            body: JSON.stringify({ article: payload }),
        });
        const result = await response.json();

        return result;
    }
}

export default new ArticleService();
