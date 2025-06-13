<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const userData = reactive({
  name: "",
  phone: "",
  password: "",
});

const handleRegister = async () => {
  try {
    const payload = {
      ...userData,
      role: "user", // Mặc định role là user
    };
    const response = await axios.post("http://localhost:3000/users", payload);
    localStorage.setItem("user", JSON.stringify(response.data));
    router.push("/menu");
  } catch (error) {
    console.error("Đăng ký bị lỗi:", error);
    alert("Đăng ký thất bại");
  }
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center uppercase">Đăng ký</h2>
      <div class="space-y-4">
        <input
          v-model="userData.name"
          type="text"
          placeholder="Nhập tên người dùng"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="userData.phone"
          type="text"
          placeholder="Nhập số điện thoại"
          class="w-full p-2 border rounded"
        />
        <input
          v-model="userData.password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="w-full p-2 border rounded"
        />
        <button
          @click="handleRegister"
          class="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          Đăng ký
        </button>
        <p class="text-center">
          Bạn đã có tài khoản rồi?
          <router-link to="/login" class="text-blue-500">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
