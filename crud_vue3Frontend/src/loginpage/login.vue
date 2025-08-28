<template>
    <div class="login-container">
        <h2>Login</h2>
        <div style="display: flex; flex-direction: column; gap: 10px; justify-content: center;">
            <input type="text" placeholder="Username" v-model="username" required @input="validateInput('username')" @keyup.enter="handleLogin"/>
            <input type="password" placeholder="Password" v-model="password" required @input="validateInput('password')" @keyup.enter="handleLogin" maxlength="8"/>
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
                <input type="password" placeholder="Password" v-model="registerData.nominatedPassword" maxlength="8"/>
                <input type="password" placeholder="Confirm Password" v-model="registerData.confirmPassword" maxlength="8"/>
                <select v-model="registerData.selectedRoleObject" >
                    <option v-for="role in roles" :key="role.id" :value="role">{{ role.role_name }}</option>
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
  import { fetchRoleAssigned } from '../condition/roleCondition/roleCon'
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Login',
    setup() {
        const username = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const isLoading = ref(false);
        const router = useRouter();
    
        const showRegistrationDialog = ref(false);
        const registerData = ref({
            fullname: '',
            email: '',
            nominatedPassword: '',
            confirmPassword: '',
            // selectedRole: ''
            selectedRoleObject: null as any
        });

        const roles = ref([]);
    
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
                const test = fetchAssigned.data;
                roles.value = test.filter(r => r.id && r.role_name); 
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
            alert("Password and Confirm Password do not match. Please try again.");
            return;
            }
    
            const result = await registrationAPI(registerData.value);
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
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
  }
  
  .error {
    color: red;
  }
  
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dialog {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 300px;
  }
  
  .dialog h3 {
    margin-top: 0;
  }
  
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .dialog-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>
  