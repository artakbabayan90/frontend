<template>
  <div>
    <h1>{{ isEditing ? 'Edit Blog' : 'Create Blog' }}</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="form.title" placeholder="Title" required />
      <textarea v-model="form.content" placeholder="Content" required></textarea>
      <input type="file" @change="handleFileChange" />
      <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useBlogStore } from '../stores/blog';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const blogStore = useBlogStore();
    const route = useRoute();
    const router = useRouter();
    const form = ref({ title: '', content: '', image: null });
    const isEditing = ref(false);

    const handleFileChange = (event) => {
      form.value.image = event.target.files[0];
    };

    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('title', form.value.title);
      formData.append('content', form.value.content);
      if (form.value.image) formData.append('image', form.value.image);

      if (isEditing.value) {
        await blogStore.updateBlog(route.params.id, formData);
      } else {
        await blogStore.createBlog(formData);
      }

      router.push('/');
    };

    onMounted(() => {
      if (route.params.id) {
        isEditing.value = true;
        blogStore.fetchBlog(route.params.id).then(() => {
          form.value = { ...blogStore.blog, image: null };
        });
      }
    });

    return { form, isEditing, handleFileChange, handleSubmit };
  },
};
</script>
