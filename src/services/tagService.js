import { TAG_URL } from './constant';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class TagService {
    async getTags() {
        const response = await fetch(TAG_URL, { headers });
        const result = await response.json();

        return result;
    }
}

export default new TagService();
