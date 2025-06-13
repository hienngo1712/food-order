<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(JSON.parse(localStorage.getItem("users")));
const isAuthenticated = computed(() => !!user.value);
const currentRole = computed(() => user.value?.role);

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
        <router-link
          v-if="currentRole !== 'admin' && currentRole !== 'kitchen'"
          to="/menu"
          class="hover:underline"
          >Menu</router-link
        >
        <router-link
          v-if="currentRole !== 'admin' && currentRole !== 'kitchen'"
          to="/cart"
          class="hover:underline"
          >Cart</router-link
        >
        <router-link
          v-if="isAuthenticated && currentRole === 'admin'"
          to="/admin/user-management"
          class="hover:underline"
          >Users Management</router-link
        >
        <router-link
          v-if="
            isAuthenticated &&
            (currentRole === 'admin' || currentRole === 'kitchen')
          "
          :to="
            currentRole === 'admin'
              ? '/admin/menu-management'
              : '/kitchen/menu-management'
          "
          class="hover:underline"
          >Menu Management</router-link
        >
        <router-link
          v-if="
            isAuthenticated &&
            (currentRole === 'admin' || currentRole === 'kitchen')
          "
          :to="currentRole === 'admin' ? '/admin/order' : '/kitchen/order'"
          class="hover:underline"
          >Order</router-link
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
