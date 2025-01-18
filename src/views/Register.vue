<template>
  <div class="auth-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div>
        <label for="password_confirmation">Confirm Password:</label>
        <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            required
        />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link>.</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });

    const register = () => {
      authStore.register(form.value);
    };

    return { form, register };
  },
};
</script>
