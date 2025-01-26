<template>
    <div class="logout">
      <h2>Logging Out...</h2>
      <p>You will be redirected shortly...</p>
    </div>
  </template>
  
  <script>
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useUserStore } from "../stores/userStore";
  
  export default {
    name: "Logout",
    setup() {
      const router = useRouter();
      const userStore = useUserStore();
  
      onMounted(() => {
        userStore.resetStore();
          setTimeout(() => {
          router.push("/");
        }, 1000);
      });
  
      return {};
    },
  };
  </script>
  
  <style scoped>
  .logout {
    text-align: center;
    margin-top: 50px;
  }
  
  h2 {
    font-size: 2rem;
    color: #333;
  }
  
  p {
    font-size: 1rem;
    color: #777;
  }
  </style>
  