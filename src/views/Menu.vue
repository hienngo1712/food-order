<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Khai báo biến reactive để lưu danh sách món ăn từ API
const menuItems = ref([]);
//Hàm lấy ds menu từ json-server
const fetchMenu = async () => {
  // Dùng try catch để kiểm soát lỗi
  try {
    const res = await axios.get("http://localhost:3000/menu");
    menuItems.value = res.data; // Gán dữ liệu từ res.data lấy được từ json-server vào menuItems
  } catch (error) {
    console.error("Lấy menu bị lỗi", error);
  }
};
// Thêm món ăn vào giỏ hàng
// item là tham số đầu vào dùng để gán món ăn cần thêm vào giỏ hàng
const addToCart = async (item) => {
  try {
    //Kiểm tra xem món ăn đã tồn tại trong giỏ hàng hay chưa dựa theo id
    const res = await axios.get(`http://localhost:3000/cart?id=${item.id}`);
    // Nếu món ăn đã có trong cửa hàng rồi thì data trả về có phần tử
    if (res.data.length > 0) {
      //Lấy món ăn đầu tiên đã có từ mảng rồi gán vào existingItem
      const existingItem = res.data[0];
      //Tăng số lượng món ăn thêm 1, nếu chưa có quantity thì mặc định là 1
      existingItem.quantity = (existingItem.quantity || 0) + 1;
      //Gửi resquest Put để cập nhật số lượng món ăn trong cart trên json-server
      await axios.put(
        `http://localhost:3000/cart/${existingItem.id}`,
        existingItem
      );
    } else {
      //Nếu món ăn chưa có trong giỏ hàng thì thêm mới với quantity = 1
      const newItem = { ...item, quantity: 1 }; // ...item dùng để copy toàn bộ thuộc tính của object item -> newItem
      //Gửi request để thêm món ăn mới vào giỏ hàng trên json-server
      await axios.post("http://localhost:3000/cart", newItem);
    }
  } catch (error) {
    console.error("Thêm vào giỏ hàng bị lỗi", error);
    alert("Thêm vào giỏ hàng thất bại");
  }
};

//Gọi fetchMenu sau khi component được gắn (mounted) vào DOM

onMounted(fetchMenu);
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center uppercase">Menu</h2>
    <div class="flex justify-center text-xl">
      <button
        class="bg-cyan-500 text-white px-4 py-2 mb-6 rounded-full hover:bg-cyan-600"
      >
        <router-link to="/menu-management">Thêm/Sửa Menu</router-link>
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="bg-white p-4 mb-2 rounded-2xl shadow-lg"
      >
        <div class="flex justify-center items-center">
          <img
            :src="`/images/${item.img}`"
            class="h-90 w-120 object-cover object-center rounded-2xl"
          />
        </div>

        <h3 class="text-lg font-semibold text-center">{{ item.name }}</h3>
        <p class="text-gray-600 text-center">{{ item.des }}</p>
        <p class="text-green-600 font-bold text-right">{{ item.price }}đ</p>
        <div class="flex justify-center">
          <button
            @click="addToCart(item)"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
