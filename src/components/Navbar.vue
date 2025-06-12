<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const user = ref(localStorage.getItem("users"));
const router = useRouter();
const isAuthenticated = computed(() => {
  return !!user.value;
});

const logout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>
<template>
  <nav class="bg-blue-500 p-4 text-white">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <router-link to="/menu" class="text-xl font-bold"
        >Food Order App</router-link
      >
      <div class="space-x-4">
        <router-link to="/menu" class="hover:underline">Menu</router-link>
        <router-link to="/cart" class="hover:underline">Cart</router-link>
        <router-link
          v-if="isAuthenticated"
          to="/user-management"
          class="hover:underline"
          >Users</router-link
        >
        <router-link v-if="!isAuthenticated" to="/login" class="hover:underline"
          >Login</router-link
        >
        <router-link
          v-if="!isAuthenticated"
          to="/register"
          class="hover:underline"
          >Register</router-link
        >
        <button v-if="isAuthenticated" @click="logout" class="hover:underline">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
