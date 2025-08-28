<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Welcome to the Homepage</h1>

    <!-- Logged-in User Info -->
    <div v-if="user" class="bg-white rounded-2xl shadow-md p-4 mb-6 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Your Profile</h2>
      <div class="space-y-2">
        <p><span class="font-medium text-gray-600">Full Name:</span> {{ user.full_name }}</p>
        <p><span class="font-medium text-gray-600">Email:</span> {{ user.email }}</p>
        <p>
          <span class="font-medium text-gray-600">Assigned Role:</span>
          <span
            class="px-2 py-1 ml-2 rounded-full text-sm"
            :class="user.role_id === 1 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'"
          >
            {{ user.role_id === 1 ? 'User' : 'Admin' }}
          </span>
        </p>
      </div>
    </div>

    <!-- User Table (Role 1) -->
    <div v-if="user && user.role_id === 1">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">Your Account Details</h2>
      <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table class="table-auto w-full text-left">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="px-4 py-2">Full Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Role</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="currentUserData" class="hover:bg-gray-50 transition">
              <td class="border-t px-4 py-2">{{ currentUserData.full_name }}</td>
              <td class="border-t px-4 py-2">{{ currentUserData.email }}</td>
              <td class="border-t px-4 py-2">
                <span class="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {{ currentUserData.role_name }}
                </span>
              </td>
              <td class="border-t px-4 py-2">{{ currentUserData.description }}</td>
              <td class="border-t px-4 py-2 space-x-2">
                <button
                  class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 shadow-sm"
                  @click="editUser(currentUserData)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 shadow-sm"
                  @click="deleteUser(currentUserData.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Admin Table (Role 2) -->
    <div v-else-if="user && user.role_id === 2">
      <h2 class="text-lg font-semibold mb-3 text-gray-700">All Users</h2>
      <div class="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table class="table-auto w-full text-left">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="px-4 py-2">Full Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Role</th>
              <th class="px-4 py-2">Description</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in tableDataList"
              :key="item.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="border-t px-4 py-2">{{ item.full_name }}</td>
              <td class="border-t px-4 py-2">{{ item.email }}</td>
              <td class="border-t px-4 py-2">
                <span class="px-2 py-1 rounded-full text-sm"
                  :class="item.role_name === 'Admin' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'">
                  {{ item.role_name }}
                </span>
              </td>
              <td class="border-t px-4 py-2">{{ item.description }}</td>
              <td class="border-t px-4 py-2 space-x-2">
                <button
                  class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 shadow-sm"
                  @click="editUser(item)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 shadow-sm"
                  @click="deleteUser(item)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-6">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 shadow-md"
        @click="logout"
      >
        Logout
      </button>
    </div>

    <EditUserDialog
      :isOpen="isDialogOpen"
      :user="selectedUser"
      @close="isDialogOpen = false"
      @save="handleSave"
       @update-table="tableDataList = $event"
    />
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import { fetchTableData } from "../../condition/homepageTableCondition/tableCon";
import EditUserDialog from "../../page/dialogs/homeDialog.vue";
import { softDel } from "../..//condition/HomepageCondition/softDeleteCon";

interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
}

interface UserWithRole extends User {
  role_name: string;
  description: string;
}

export default defineComponent({
  components: { EditUserDialog },
  setup() {
    const userStore = useUserStore();
    const tableDataList = ref<UserWithRole[]>([]);
     const isDialogOpen = ref(false);
    const selectedUser = ref<User | null>(null);

    const logout = (): void => {
      userStore.logout();
      location.reload();
    };

    const editUser = (user: User) => {
      selectedUser.value = user;
      isDialogOpen.value = true;
    };

    const handleSave = (updatedUser: User) => {
      console.log("Updated User:", updatedUser);
      isDialogOpen.value = false;
    };

    const tableData = async (): Promise<void> => {
      try {
        const display: UserWithRole[] = await fetchTableData();
        tableDataList.value = display;
        console.log("Table Data:", tableDataList.value);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    const currentUserData = computed<UserWithRole | User | null>(() => {
      if (!userStore.getUser) return null;
      return (
        tableDataList.value.find(
          (item) =>
            item.full_name === userStore.getUser.full_name &&
            item.email === userStore.getUser.email
        ) || userStore.getUser
      );
    });

  const deleteUser = async (user: User) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${user.full_name}?`);
      if (!confirmed) return;

      try {
        const payload = {
          user_authorize_id: (user as any).user_authorize_id,
          roles_Con_id: (user as any).roles_Con_id,
          full_name: user.full_name,
          email: user.email,
          role_id: user.role_id,
        };

        console.log("Payload to API:", payload);

        const res = await softDel(payload);
        console.log("User soft deleted:", res.data);

        await tableData();
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
  };


    tableData();

    return {
      user: userStore.getUser as User,
      logout,
      tableDataList,
      currentUserData,
      tableData,
      editUser,
      deleteUser,
      isDialogOpen,
      selectedUser,
      handleSave,
    };
  },
});
</script>
