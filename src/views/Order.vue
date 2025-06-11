<script setup>
import { ref, onMounted, computed, reactive } from "vue";
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
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center">Đơn hàng</h2>
    <div class="max-w-4xl mx-auto rounded-lg">
      <!-- <table class="w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Mã đơn hàng</th>
            <th class="p-2 border">Danh sách món ăn</th>
            <th class="p-2 border">Số lượng</th>
            <th class="p-2 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderItems" :key="order.id" class="text-center">
            <td class="p-2 border">{{ order.id }}</td>
            <td colspan="2">
              <table class="w-full">
                <tr
                  v-for="item in order.products"
                  :key="item.id"
                  class="text-center"
                >
                  <td class="p-2 border">{{ item.name }}</td>
                  <td class="p-2 border">{{ item.quantity }}</td>
                </tr>
              </table>
            </td>
            <td class="p-2 border">{{ order.status }}</td>
          </tr>
        </tbody>
      </table> -->
      <table class="w-full border-collapse text-sm">
        <thead>
          <tr class="bg-gray-200 text-gray-700 text-center">
            <th class="p-2 border">Mã đơn hàng</th>
            <th class="p-2 border">Danh sách món ăn</th>
            <th class="p-2 border">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderItems" :key="order.id" class="align-top">
            <!-- Mã đơn hàng -->
            <td class="p-2 border font-medium text-gray-800 text-center">
              {{ order.id }}
            </td>

            <!-- Danh sách món ăn lồng bảng -->
            <td class="p-0 border">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-2 border">Tên món</th>
                    <th class="p-2 border">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in order.products"
                    :key="item.id"
                    class="hover:bg-gray-50 text-center"
                  >
                    <td class="p-2 border">{{ item.name }}</td>
                    <td class="p-2 border">{{ item.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </td>

            <!-- Trạng thái -->
            <td class="p-2 border text-center font-semibold">
              {{ order.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
