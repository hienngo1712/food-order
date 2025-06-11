<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import router from "../router/router";
const cartItems = ref([]);

// Lấy dữ liệu từ giỏ hàng
const fetchCart = async () => {
  try {
    // Gửi yêu cầu GET đến endpoint /cart (json-server)
    const res = await axios.get("http://localhost:3000/cart");
    cartItems.value = res.data;
  } catch (error) {
    console.error("Lấy dữ liệu từ giỏ hàng bị lỗi", error);
  }
};

// Xóa dữ liệu từ giỏ hàng theo id
const removeFromCart = async (id) => {
  try {
    // Gửi yêu cầu DELETE đến endpoint /cart/:id
    await axios.delete(`http://localhost:3000/cart/${id}`);
    //Sau khi xóa xong gọi lại fetch để update list cart
    fetchCart();
  } catch (error) {
    console.error("Xóa dữ liệu từ giỏ hàng bị lỗi", error);
    alert("Xóa giỏ hàng thất bại");
  }
};

//Tạo biên tính tổng tiền, tự động cập nhật khi cartItems thay đổi
const total = computed(() => {
  // reduce là hàm trong JS dùng để tính tổng tiền bằng cách duyệt qua từng item trong mảng
  return cartItems.value.reduce(
    //Duyệt qua từng item bằng công thức price-quantity
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0 // Giá trị khởi tạo của total = 0
  );
});
const orderItems = async () => {
  const status = ref("Chờ xác nhận");

  const newOrder = { products: cartItems.value, status: status.value };
  try {
    //Gửi đơn hàng mới vào order
    await axios.post("http://localhost:3000/order", newOrder);
    //Xóa toàn bộ cart
    for (const item in cartItems.value) {
      await axios.delete(`http://localhost:3000/cart/${item.id}`);
    }
    cartItems.value = "";
    router.push("/order");
  } catch (error) {
    console.error("Lỗi khi xác nhận đơn hàng");
  }
};
onMounted(fetchCart);
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center">Giỏ hàng</h2>
    <div
      v-if="cartItems.length === 0"
      class="text-center text-xl text-gray-600"
    >
      Giỏ hàng của bạn trống
    </div>
    <div v-else class="max-w-4xl mx-auto rounded-lg">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Tên món</th>
            <th class="p-2 border">Số lượng</th>
            <th class="p-2 border">Giá</th>
            <th class="p-2 border">Tổng tiền</th>
            <th class="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in cartItems"
            :key="item.id"
            class="border-collapse text-center"
          >
            <td class="p-2 border">{{ item.name }}</td>
            <td class="p-2 border">{{ item.quantity }}</td>
            <td class="p-2 border">{{ item.price }}</td>
            <td class="p-2 border">{{ item.quantity * item.price }}</td>
            <td class="p-2 border">
              <button
                @click="removeFromCart(item.id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="mt-4 text-2xl font-bold text-right mr-5">Total: {{ total }}đ</p>
      <div class="text-right text-xl mt-5 mr-2">
        <button
          @click="orderItems"
          class="bg-cyan-500 text-white px-2 py-1 rounded hover:bg-cyan-600"
        >
          Xác nhận đơn hàng
        </button>
      </div>
    </div>
  </div>
</template>
