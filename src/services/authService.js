import { LOGIN_URL, USERS_URL } from './constant';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

class AuthService {
    async signin({ email, password }) {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ user: { email, password } }),
        });
        const result = await response.json();

        return result;
    }

    async signup(payload) {
        const response = await fetch(USERS_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({ user: payload }),
        });
        const result = await response.json();

        return result;
    }

    setLoggedInUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    signout() {
        localStorage.removeItem('user');
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();
