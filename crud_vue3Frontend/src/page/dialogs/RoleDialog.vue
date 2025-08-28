<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50"
  >
    <div class="relative bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
      <h3 class="text-xl font-bold mb-4">Manage Roles</h3>

      <table class="table-auto w-full text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Role Name</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id" class="border-t">
            <td class="px-4 py-2">{{ role.role_name }}</td>
            <td class="px-4 py-2">{{ role.role_name }}</td>
            <td class="px-4 py-2">{{ role.description }}</td>
            <td class="px-4 py-2">
              <button
                @click="editRole(role)"
                class="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                @click="deleteRole(role.id)"
                class="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4">
        <button
          @click="addRole"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Role
        </button>
      </div>

      <div class="mt-6 text-right">
        <button
          @click="$emit('close')"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { loadRoleData } from "../../api/roleData";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close", "saveRoles", "addRole", "editRole", "deleteRole"],

  setup(props, { emit }) {
    const roles = ref<{ id: number; role_name: string; description: string }[]>(
      []
    );

    const fetchRoles = async () => {
      try {
        const res = await loadRoleData();
        roles.value = res.data; 
      } catch (error) {
        console.error("Error loading roles:", error);
      }
    };

    watch(
      () => props.isOpen,
      (newVal) => {
        if (newVal) {
          fetchRoles();
        }
      }
    );

    const editRole = (role: { id: number; role_name: string; description: string }) => {
      emit("editRole", role);
    };

    const deleteRole = (roleId: number) => {
      emit("deleteRole", roleId);
    };

    const addRole = () => {
      emit("addRole");
    };

    return {
      roles,
      editRole,
      deleteRole,
      addRole,
    };
  },
});
</script>
