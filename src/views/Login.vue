<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const phone = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users", {
      //params là 1 option trong axios dùng để truyền tham số vào URL khi gửi request
      params: {
        phone: phone.value,
        password: password.value,
      },
    });
    if (res.status === 200 && res.data.length > 0) {
      const user = res.data[0];
      // console.log(user);
      // console.log(user.role);
      if (user.role === "admin") {
        localStorage.setItem("users", JSON.stringify(user));
        router.push("/admin");
      } else if (user.role === "kitchen") {
        localStorage.setItem("users", JSON.stringify(user));
        router.push("/kitchen");
      } else {
        // stringify: dữ liệu trả về được chuyển từ object sang chuỗi
        localStorage.setItem("users", JSON.stringify(user));
        router.push("/menu");
      }
    } else {
      alert("Thông tin đăng nhập không hợp lệ");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập", error);
    alert("Đăng nhập không thành công");
  }
};

onMounted(() => {
  const user = localStorage.getItem("users");
  if (user) {
    router.push("/menu");
  }
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center uppercase">Đăng nhập</h2>
      <div class="space-y-4">
        <input
          type="text"
          v-model="phone"
          placeholder="Nhập số điện thoại"
          class="w-full p-2 border rounded"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Nhập mật khẩu"
          class="w-full p-2 border rounded"
        />
        <button
          @click="handleLogin"
          class="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          Đăng nhập
        </button>
        <p class="text-center">
          Bạn chưa có tài khoản?
          <router-link to="/register" class="text-blue-500 hover:underline"
            >Đăng ký</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
