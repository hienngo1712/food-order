<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout.vue";

//Tạo biến reactive để lưu ds user từ API
const users = ref([]);
//Tạo object newUser mới chứa info user mới or đang edit
const newUser = reactive({
  name: "",
  phone: "",
  password: "",
  role: "",
});
//Lưu lại id của người user đang edit nếu có
const editingUserID = ref(null);
// Lấy danh sách người dùng
const fetchUser = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    users.value = res.data;
  } catch (error) {
    console.error("Lấy thông tin người dùng bị lỗi: ", error);
    alert("Lấy thông tin người dùng thất bại");
  }
};
onMounted(fetchUser);
const handleAddOrUpdateUser = async () => {
  try {
    // Nếu có edittingUserID -> đang chỉnh sửa user
    if (editingUserID.value) {
      await axios.put(
        //Gửi PUT request để cập nhật thông tin user
        `http://localhost:3000/users/${editingUserID.value}`,
        newUser
      );
      //Xóa ID sau khi cập nhật xong
      editingUserID.value = null;
    } else {
      // Nếu ko phải đang chỉnh sửa thì thêm mới user
      await axios.post("http://localhost:3000/users", newUser);
    }
    //Reset form về trạng thái ban đầu
    newUser.name = "";
    newUser.phone = "";
    newUser.password = "";
    newUser.role = "";

    //Load lại trang sau khi thêm/cập nhật
    fetchUser();
  } catch (error) {
    console.error("Thêm/Cập nhật bị lỗi", error);
    alert("Thêm/Cập nhật thất bại");
  }
};

//Hàm thực hiện khi bấm nút edit user: đổ dữ liệu user vào form và lưu ID
const editUser = (user) => {
  newUser.name = user.name;
  newUser.phone = user.phone;
  newUser.password = user.password;
  newUser.role = user.role;
  editingUserID.value = user.id;
};

//Xóa user theo ID
const deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchUser();
  } catch (error) {
    console.error("Xóa người dùng bị lỗi: ", error);
    alert("Xóa người dùng thất bại");
  }
};
</script>
<template>
  <div class="min-h-screen p-8 bg-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center uppercase">Quản lý User</h2>
    <div class="max-w-4xl mx-auto">
      <h3 class="text-xl font-semibold mb-4 text-center">Thêm/Sửa User</h3>
      <div class="space-y-4">
        <input
          type="text"
          v-model="newUser.name"
          placeholder="Tên người dùng"
          class="w-full p-2 border rounded"
        />
        <input
          type="text"
          v-model="newUser.phone"
          placeholder="Số điện thoại"
          class="w-full p-2 border rounded"
        />
        <input
          type="password"
          v-model="newUser.password"
          placeholder="Mật khẩu"
          class="w-full p-2 border rounded"
        />
        <select v-model="newUser.role" class="w-full p-2 border rounded">
          <option disabled value="">-- Chọn vai trò --</option>
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
          <option value="kitchen">Nhà bếp</option>
        </select>
        <button
          @click="handleAddOrUpdateUser"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {{ editingUserID ? "Cập nhật User" : "Thêm User" }}
        </button>
      </div>
    </div>
    <div class="mt-8">
      <h3 class="text-xl font-semibold mb-4 text-center">Danh sách User</h3>
      <table class="w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 border">Tên người dùng</th>
            <th class="p-2 border">Số điện thoại</th>
            <th class="p-2 border">Vai trò</th>
            <th class="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="text-center">
            <td class="p-2 border">{{ user.name }}</td>
            <td class="p-2 border">{{ user.phone }}</td>
            <td class="p-2 border">{{ user.role }}</td>
            <td class="p-2 border">
              <button
                @click="editUser(user)"
                class="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
              >
                Cập nhật
              </button>
              <button
                @click="deleteUser(user.id)"
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
