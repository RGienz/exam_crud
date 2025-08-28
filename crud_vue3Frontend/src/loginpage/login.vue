<template>
    <div class="login-container">
        <h2>Login</h2>
        <div style="display: flex; flex-direction: column; gap: 10px; justify-content: center;">
            <input
                type="text"
                placeholder="Username"
                v-model="username"
                required
                @input="validateInput('username')"
                @keyup.enter="handleLogin"
            />
            <input
                type="password"
                placeholder="Password"
                v-model="password"
                required
                @input="validateInput('password')"
                @keyup.enter="handleLogin"
                maxlength="8"
            />
            <button type="button" @click="handleLogin" :disabled="isLoading">
                <span v-if="isLoading">Logging in...</span>
                <span v-else>Login</span>
            </button>

            <button type="button" @click="displaySelectionRole">Register</button>
        </div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div v-if="showRegistrationDialog" class="dialog-overlay">
        <div class="dialog">
            <h3>Register New User</h3>
            <div class="dialog-content">
                <input type="text" placeholder="Full Name" v-model="registerData.fullname" />
                <input type="email" placeholder="Email" v-model="registerData.email" />
                <input
                    type="password"
                    placeholder="Password"
                    v-model="registerData.nominatedPassword"
                    maxlength="8"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    v-model="registerData.confirmPassword"
                    maxlength="8"
                />
                <select v-model="registerData.selectedRoleObject">
                    <option v-for="role in roles" :key="role.id" :value="role">
                    {{ role.role_name }}
                    </option>
                </select>
            </div>
            <div class="dialog-buttons">
                <button @click="handleRegistration">Save Register</button>
                <button @click="showRegistrationDialog = false">Cancel</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { handleLogin } from '../condition/loginCondition/loginCon';
import { registrationAPI } from '../condition/registerCondition/registerCon';
import { fetchRoleAssigned } from '../condition/roleCondition/roleCon';
import { useRouter } from 'vue-router';

interface Role {
    id: number;
    role_name: string;
    description?: string;
    }

interface RegisterData {
    fullname: string;
    email: string;
    nominatedPassword: string;
    confirmPassword: string;
    selectedRoleObject: Role | null;
}

export default defineComponent({
    name: 'Login',
    setup() {
        const username = ref<string>('');
        const password = ref<string>('');
        const errorMessage = ref<string>('');
        const isLoading = ref<boolean>(false);
        const router = useRouter();

        const showRegistrationDialog = ref<boolean>(false);
        const registerData = ref<RegisterData>({
            fullname: '',
            email: '',
            nominatedPassword: '',
            confirmPassword: '',
            selectedRoleObject: null,
        });

        const roles = ref<Role[]>([]);

        onMounted(() => {
            
        });

        const validateInput = (field: 'username' | 'password') => {
            const allowedCharacters = /^[a-zA-Z0-9\s]*$/;
            if (field === 'username') {
                const value = username.value;
                if (!allowedCharacters.test(value)) {
                username.value = value.replace(/[^a-zA-Z0-9.@\s]/g, '');
                }
            } else if (field === 'password') {
                const value = password.value;
                if (!allowedCharacters.test(value)) {
                password.value = value.replace(/[^a-zA-Z0-9\s]/g, '');
                }
            }
        };

        const displaySelectionRole = async () => {
            showRegistrationDialog.value = true;
            await loadRoles();
        };

        const loadRoles = async () => {
            try {
                const fetchAssigned = await fetchRoleAssigned();
                const test = fetchAssigned.data as Role[];
                roles.value = test.filter((r) => r.id && r.role_name);
            } catch (error) {
                console.error(error);
            }
        };

        const login = async () => {
            errorMessage.value = '';
            isLoading.value = true;

            const result = await handleLogin(username.value, password.value);
            isLoading.value = false;

            if (result.success) {
                username.value = '';
                password.value = '';
                router.push({ name: 'Homepage' });
            } else {
                errorMessage.value = result.message;
            }
        };

        const handleRegistration = async () => {
            if (registerData.value.nominatedPassword !== registerData.value.confirmPassword) {
                alert('Password and Confirm Password do not match. Please try again.');
                return;
            }

            await registrationAPI(registerData.value);
        };

        return {
            username,
            password,
            errorMessage,
            isLoading,
            handleLogin: login,
            validateInput,
            showRegistrationDialog,
            registerData,
            handleRegistration,
            displaySelectionRole,
            roles,
        };
    },
});
</script>

<style scoped>
/* Fullscreen background */
.login-container {
  max-width: 420px;
  margin: 80px auto;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;
}

/* Headings */
.login-container h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  letter-spacing: 1px;
}

/* Input fields */
.login-container input,
.login-container select {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #ddd;
  outline: none;
  transition: 0.3s;
  font-size: 14px;
}

.login-container input:focus,
.login-container select:focus {
  border-color: #6c63ff;
  box-shadow: 0 0 6px rgba(108, 99, 255, 0.4);
}

/* Buttons */
.login-container button {
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
  font-size: 15px;
  font-weight: 500;
}

.login-container button:first-of-type {
  background: linear-gradient(135deg, #6c63ff, #4a47a3);
  color: white;
}

.login-container button:first-of-type:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #7a73ff, #5b56c3);
}

.login-container button:nth-of-type(2) {
  background: transparent;
  color: #6c63ff;
  border: 1px solid #6c63ff;
}

.login-container button:nth-of-type(2):hover {
  background: #6c63ff;
  color: white;
}

/* Error message */
.error {
  color: #e63946;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
}

/* Dialog Overlay */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

/* Dialog Box */
.dialog {
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
  width: 340px;
  animation: scaleUp 0.4s ease;
}

/* Dialog Title */
.dialog h3 {
  margin: 0 0 15px 0;
  font-size: 1.4rem;
  color: #444;
  font-weight: 600;
}

/* Dialog Inputs */
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

/* Dialog Buttons */
.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-buttons button {
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s;
}

.dialog-buttons button:first-of-type {
  background: #6c63ff;
  color: white;
}

.dialog-buttons button:first-of-type:hover {
  background: #5750d6;
}

.dialog-buttons button:last-of-type {
  background: #eee;
}

.dialog-buttons button:last-of-type:hover {
  background: #ddd;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
</style>

