<template>
  <div>
    <h1>Blogs</h1>
    <button @click="navigateToCreate">Create Blog</button>
    <div v-for="blog in blogs" :key="blog.id" class="blog-card">
      <h2>{{ blog.title }}</h2>
      <p>{{ blog.content }}</p>
      <p><strong>By:</strong> {{ blog.user.name }}</p>
      <router-link :to="'/blog/' + blog.id">Read More</router-link>
    </div>
    <div class="pagination">
      <button @click="fetchBlogs(pagination.current_page - 1)" :disabled="pagination.current_page <= 1">Previous</button>
      <span>Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>
      <button @click="fetchBlogs(pagination.current_page + 1)" :disabled="pagination.current_page >= pagination.last_page">Next</button>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from '../stores/blog';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const blogStore = useBlogStore();
    const { blogs, pagination, fetchBlogs } = blogStore;
    const router = useRouter();

    const navigateToCreate = () => {
      router.push('/blog/create');
    };

    onMounted(() => {
      fetchBlogs();
    });

    return { blogs, pagination, fetchBlogs, navigateToCreate };
  },
};
</script>
