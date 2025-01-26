<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Email</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../assets/firebase.js";
import { useUserStore } from "../stores/userStore"; 

const router = useRouter();
const username = ref<string>('');
const password = ref<string>('');
const userStore = useUserStore(); 

const handleSubmit = async () => {
  try {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('email', '==', username.value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return;
    }

    let userFound = false;
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.password === password.value) {
        userFound = true;
        userStore.setUserId(doc.id); 
        router.push('/my-destinations');
      }
    });
    
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
</script>
