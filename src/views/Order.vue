<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orderItems = ref([]);
const fetchOrder = async () => {
  try {
    const res = await axios.get("http://localhost:3000/order");
    orderItems.value = res.data;
  } catch (error) {
    console.error("Lấy dữ liệu từ giỏ hàng bị lỗi", error);
  }
};

onMounted(fetchOrder);
const removeFromOrder = async (id) => {
  try {
    // Gửi yêu cầu DELETE đến endpoint /cart/:id
    await axios.delete(`http://localhost:3000/order/${id}`);
    //Sau khi xóa xong gọi lại fetch để update list cart
    fetchOrder();
  } catch (error) {
    console.error("Xóa dữ liệu từ giỏ hàng bị lỗi", error);
    alert("Xóa giỏ hàng thất bại");
  }
};

const updateOrderStatus = async (order) => {
  try {
    await axios.patch(`http://localhost:3000/order/${order.id}`, {
      status: order.status,
    });
    // Có thể fetch lại danh sách đơn hàng nếu cần
  } catch (error) {
    alert("Cập nhật trạng thái thất bại");
  }
};
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center">Đơn hàng</h2>
    <div class="max-w-4xl mx-auto rounded-lg">
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-200 text-gray-700 text-center">
            <th class="p-2 border">Mã đơn hàng</th>
            <th class="p-2 border">Danh sách món ăn</th>
            <th class="p-2 border">Trạng thái</th>
            <th class="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderItems" :key="order.id">
            <!-- Mã đơn hàng -->
            <td class="p-2 border font-medium text-gray-800 text-center">
              {{ order.id }}
            </td>

            <!-- Danh sách món ăn lồng bảng -->
            <td class="p-0 border-collapse">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-2 border w-1/2">Tên món</th>
                    <th class="p-2 border w-1/2">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in order.products"
                    :key="item.id"
                    class="hover:bg-gray-50 text-center"
                  >
                    <td class="p-2 border w-1/2">{{ item.name }}</td>
                    <td class="p-2 border w-1/2">{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </td>

            <!-- Trạng thái -->
            <td class="p-2 border text-center font-semibold">
              <!-- {{ order.status }} -->
              <select
                v-model="order.status"
                @change="updateOrderStatus(order)"
                class="border rounded px-2 py-1 text-center"
              >
                <option class="" value="Chờ xác nhận">Chờ xác nhận</option>
                <option class="" value="Đang chế biến">Đang chế biến</option>
                <option class="" value="Đã bị hủy">Đã bị hủy</option>
                <option class="" value="Đã giao">Đã giao</option>
              </select>
            </td>
            <td class="p-2 border text-center">
              <button
                @click="removeFromOrder(order.id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
