import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('http://127.0.0.1:8001/api/login', credentials);
                this.token = response.data.token;
                this.user = response.data.user;
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                router.push('/');
            } catch (error) {
                alert('Login failed: ' + error.response.data.error);
            }
        },

        async register(details) {
            try {
                await axios.post('http://127.0.0.1:8001/api/register', details);
                alert('Registered successfully! Check your email for verification.');
                router.push('/login');
            } catch (error) {
                alert('Registration failed: ' + error.response.data.error);
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            alert('Logged out successfully!');
        },
    },
});
