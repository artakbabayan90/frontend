import { defineStore } from 'pinia';
import axios from 'axios';

export const useBlogStore = defineStore('blog', {
    state: () => ({
        blogs: [],
        blog: null,
        pagination: {
            current_page: 1,
            last_page: 1,
        },
    }),
    actions: {
        async fetchBlogs(page = 1) {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/blogs?page=${page}`);
                this.blogs = response.data.data;
                this.pagination = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                };
            } catch (error) {
                console.error('Failed to fetch blogs:', error.response?.data || error.message);
            }
        },
        async fetchBlog(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/blogs/${id}`);
                this.blog = response.data;
            } catch (error) {
                console.error('Failed to fetch blog:', error.response?.data || error.message);
            }
        },
        async createBlog(formData) {
            try {
                await axios.post('http://127.0.0.1:8001/api/blogs', formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Blog created successfully!');
            } catch (error) {
                console.error('Failed to create blog:', error.response?.data || error.message);
            }
        },
        async updateBlog(id, formData) {
            try {
                await axios.put(`http://127.0.0.1:8001/api/blogs/${id}`, formData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Blog updated successfully!');
            } catch (error) {
                console.error('Failed to update blog:', error.response?.data || error.message);
            }
        },
        async deleteBlog(id) {
            try {
                await axios.delete(`http://127.0.0.1:8001/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                alert('Blog deleted successfully!');
                this.fetchBlogs(); // Refresh the blog list
            } catch (error) {
                console.error('Failed to delete blog:', error.response?.data || error.message);
            }
        },
    },
});
