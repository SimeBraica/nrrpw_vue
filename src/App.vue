<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
 <header class="sticky-nav">
   <div class="wrapper">
     <nav>
       <RouterLink to="/" class="nav-link">Login</RouterLink>
       <RouterLink to="/my-destinations" class="nav-link">My destinations</RouterLink>
       <RouterLink to="/create-destination" class="nav-link">Add a new destination</RouterLink>
       <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
     </nav>
   </div>
 </header>
 <RouterView />
</template>

<style scoped>
.sticky-nav {
 position: sticky;
 top: 0;
 z-index: 100;
 background-color: black;
 width: 100%;
}

nav {
 display: flex;
 justify-content: center;
 align-items: center;
 padding: 15px;
 gap: 20px;
}

.nav-link {
 color: white;
 text-decoration: none;
 padding: 8px 15px;
 border-radius: 5px;
 transition: background-color 0.3s ease;
}

.nav-link:hover {
 background-color: rgba(255, 255, 255, 0.2);
}

body, html{
  margin: 0;
  padding: 0

}
</style>