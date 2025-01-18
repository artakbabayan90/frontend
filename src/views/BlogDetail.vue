<template>
  <div v-if="blog">
    <h1>{{ blog.title }}</h1>
    <p>{{ blog.content }}</p>
    <p><strong>By:</strong> {{ blog.user.name }}</p>
    <img v-if="blog.image" :src="'http://localhost:8000/storage/' + blog.image" alt="Blog Image" />
    <router-link :to="'/blog/' + blog.id + '/edit'" v-if="isOwner">Edit</router-link>
    <button @click="deleteBlog" v-if="isOwner">Delete</button>
  </div>
</template>

<script>
import { useBlogStore } from '../stores/blog';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const blogStore = useBlogStore();
    const route = useRoute();
    const router = useRouter();

    const blog = blogStore.blog;
    const isOwner = blog && blog.user_id === JSON.parse(localStorage.getItem('user')).id;

    const deleteBlog = async () => {
      await blogStore.deleteBlog(route.params.id);
      router.push('/');
    };

    blogStore.fetchBlog(route.params.id);

    return { blog, deleteBlog, isOwner };
  },
};
</script>
