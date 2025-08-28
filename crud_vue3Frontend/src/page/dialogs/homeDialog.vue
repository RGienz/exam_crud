<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="closeDialog"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>

      <form @submit.prevent="saveChanges">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              v-model="localUser.full_name"
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              v-model="localUser.email"
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Role</label>
            <select
              v-model="localUser.role_id"
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="1">User</option>
              <option value="2">Admin</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              v-model="localUser.description"
              class="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            @click="closeDialog"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { updateTableValue } from '../../condition/HomepageCondition/homepageCon'

interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
  description?: string;
}

export default defineComponent({
  name: "EditUserDialog",
  props: {
    isOpen: { type: Boolean, required: true },
    user: { type: Object as PropType<User | null>, default: null },
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const localUser = ref<User>({
      id: 0,
      full_name: "",
      email: "",
      role_id: 1,
      description: "",
    });

    watch(
      () => props.user,
      (newUser) => {
        if (newUser) {
          localUser.value = { ...newUser };
        }
      },
      { immediate: true }
    );

    const closeDialog = () => {
      emit("close");
    };

    const saveChanges = async () => {
  try {
    await updateTableValue(localUser.value); 
    emit("save", localUser.value);           
    closeDialog();
    location.reload()
  } catch (error) {
    console.error("Error saving changes:", error);
  }
};


    return { localUser, closeDialog, saveChanges };
  },
});
</script>
