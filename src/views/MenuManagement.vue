<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
//Tạo biến mới để lưu ds menu từ API
const menus = ref([]);
//Tạo object newMenu mới chứa info menu mới or đang edit
const newMenu = reactive({
  name: "",
  price: "",
  des: "",
  img: "",
});
//Lưu lại id của menu đang edit nếu có
const editingMenuID = ref(null);
const fetchMenu = async () => {
  try {
    const res = await axios.get("http://localhost:3000/menu");
    menus.value = res.data;
  } catch (error) {
    console.error("Lấy dữ liệu từ menu bị lỗi: ", error);
    alert("Lấy dữ liệu từ menu thất bại");
  }
};

onMounted(fetchMenu);
const handleAddOrUpdateMenu = async () => {
  try {
    // Nếu có editingMenuID -> đang edit menu
    if (editingMenuID.value) {
      //Gửi PUT request để cập nhật info menu
      await axios.put(
        `http://localhost:3000/menu/${editingMenuID.value}`,
        newMenu
      );
      //Xóa ID sau khi cập nhật xong
      editingMenuID.value = null;
    } else {
      //Nếu không phải thì thêm mới món ăn vào menu
      await axios.post("http://localhost:3000/menu", newMenu);
    }
    //Reset form về trạng thái ban đầu
    newMenu.name = "";
    newMenu.price = "";
    newMenu.des = "";
    newMenu.img = "";
    fetchMenu();
  } catch (error) {
    console.error("Thêm/Cập nhật món ăn bị lỗi", error);
  }
};
//Hàm thực hiện khi ấn vào nút edit menu: đổ dữ liệu vào form và lưu ID
const editMenu = (menu) => {
  newMenu.name = menu.name;
  newMenu.price = menu.price;
  newMenu.des = menu.des;
  newMenu.img = menu.img;
  editingMenuID.value = menu.id;
};

//Xoá menu theo id
const deleteMenu = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/menu/${id}`);
    fetchMenu();
  } catch (error) {
    console.error("Xóa menu bị lỗi: ", error);
    alert("Xóa menu thất bại");
  }
};

const handleFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    newMenu.img = file.name;
    console.log("File đã chọn:", file);
  }
};
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center uppercase">
      Quản lý món ăn
    </h2>
    <div class="max-w-3xl mx-auto">
      <div class="space-y-4">
        <input
          type="text"
          v-model="newMenu.name"
          placeholder="Tên món ăn/đồ uống"
          class="w-full p-2 rounded border"
        />
        <input
          type="number"
          v-model="newMenu.price"
          placeholder="Giá"
          class="w-full p-2 rounded border"
        />
        <textarea
          rows="5"
          cols="50"
          v-model="newMenu.des"
          placeholder="Mô tả"
          class="w-full p-2 rounded border"
        ></textarea>
        <input
          type="file"
          @change="handleFile"
          placeholder="Chọn hình ảnh"
          class="w-full p-2 rounded border text-center"
        />
        <button
          @click="handleAddOrUpdateMenu"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {{ editingMenuID ? "Cập nhật món ăn" : "Thêm món ăn" }}
        </button>
      </div>
    </div>
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-6 text-center">Danh sách Menu</h3>
      <table class="w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Tên món ăn</th>
            <th class="p-2 border">Giá(đ)</th>
            <th class="p-2 border">Mô tả</th>
            <th class="p-2 border">Hình ảnh</th>
            <th class="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="menu in menus" :key="menu.id" class="text-center">
            <td class="p-2 border">{{ menu.name }}</td>
            <td class="p-2 border">{{ menu.price }}</td>
            <td class="p-2 border">{{ menu.des }}</td>
            <td class="p-2 border">
              <div class="flex justify-center items-center">
                <img
                  :src="`/images/${menu.img}`"
                  class="h-45 w-60 object-cover object-center rounded-2xl"
                />
              </div>
            </td>
            <td class="p-2 border">
              <button
                @click="editMenu(menu)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Cập nhật
              </button>
              <button
                @click="deleteMenu(menu.id)"
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
