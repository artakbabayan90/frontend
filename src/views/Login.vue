<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link>.</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const form = ref({ email: '', password: '' });

    const login = () => {
      authStore.login(form.value);
    };

    return { form, login };
  },
};
</script>
