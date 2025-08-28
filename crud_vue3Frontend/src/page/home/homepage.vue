<template>
  <div>
    <h1>Welcome to the Homepage</h1>

    <div v-if="user" class="mb-6">
      <p><strong>Full Name:</strong> {{ user.full_name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Assigned Role ID:</strong> {{ user.role_id }}</p>
    </div>

    <div>
      <h2 class="text-lg font-semibold mb-2">User Table</h2>
      <table class="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-400 px-4 py-2">Full Name</th>
            <th class="border border-gray-400 px-4 py-2">Email</th>
            <th class="border border-gray-400 px-4 py-2">Role</th>
            <th class="border border-gray-400 px-4 py-2">Description</th>
            <th class="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableDataList" :key="item.id">
            <td class="border border-gray-400 px-4 py-2">{{ item.full_name }}</td>
            <td class="border border-gray-400 px-4 py-2">{{ item.email }}</td>
            <td class="border border-gray-400 px-4 py-2">{{ item.role_name }}</td>
            <td class="border border-gray-400 px-4 py-2">{{ item.description }}</td>
            <td class="border border-gray-400 px-4 py-2 space-x-2">
              <button 
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                @click="editUser(item)"
              >
                Edit
              </button>
              <button 
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                @click="deleteUser(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button 
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          @click="logout"
        >
          Logout
        </button>
        
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "../../stores/userStore";
import { fetchTableData } from "../../condition/homepageTableCondition/tableCon";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const tableDataList = ref<any[]>([]);

    const logout = () => {
      userStore.logout();
      location.reload();
    };

    const tableData = async () => {
      try {
        const display = await fetchTableData();
        tableDataList.value = display;
        console.log("Table Data:", tableDataList.value);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    const editUser = (user: any) => {
      console.log("Edit user:", user);
    };

    const deleteUser = (id: number) => {
      console.log("Delete user id:", id);
    };

    tableData();

    return {
      user: userStore.getUser,
      logout,
      tableDataList,
      tableData,
      editUser,
      deleteUser
    };
  },
});
</script>
