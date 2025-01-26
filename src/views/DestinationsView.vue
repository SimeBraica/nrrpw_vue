<template>
  <create-destination @destination-created="handleDestinationCreated" />
    <div class="about">
    <h1>Destinations</h1>
    <button @click="goToCreateDestination" class="create-button">Create New Destination</button>
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Country</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Price</th>
          <th>Time Until Start</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(destination, index) in destinations" :key="index">
          <td>
            <div v-if="editingIndex !== index">
              {{ destination.city }}
              <button @click="startEditing(index)" class="edit-button">Edit</button>
            </div>
            <input 
              v-else 
              v-model="editedCity" 
              @blur="saveEdit(index)" 
              @keyup.enter="saveEdit(index)"
              class="edit-input"
            />
          </td>
          <td>{{ destination.country }}</td>
          <td>{{ new Date(destination.fromDate.seconds * 1000).toLocaleDateString() }}</td>
          <td>{{ new Date(destination.toDate.seconds * 1000).toLocaleDateString() }}</td>
          <td>{{ destination.price }}</td>
          <td>{{ timeUntilStart(destination.fromDate) }}</td>
          <td>
            <button @click="goToDestinationDetails(destination)" class="view-button">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed  } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { db } from "../assets/firebase.js";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router'

const userStore = useUserStore();
const router = useRouter();  
const destinations = ref([]);
const editingIndex = ref(-1);
const editedCity = ref('');
const emit = defineEmits(['destination-created']);
const route = useRoute()
const alertMessage = ref(null)


const handleDestinationCreated = (newDestination) => {
  alert(newDestination.message);
  destinations.value.push(newDestination.details);
};

onMounted(async () => {
  if (route.query.alert) {
    const alertData = JSON.parse(route.query.alert)
    alert(alertData.message)
  }
  const userId = userStore.userId;
  
  if (userId === '') {
    router.push('/');  
    return;
  }
  const destinationsRef = collection(db, `users/${userId}/my-destinations`);
  const querySnapshot = await getDocs(destinationsRef);
  destinations.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});

const goToCreateDestination = () => {
  router.push({ name: "create-destination" });
};

const goToDestinationDetails = (destination) => {
  router.push({
    name: "destination-details",
    params: { id: destination.id },
    query: { data: JSON.stringify(destination) },
  });
};

const timeUntilStart = computed(() => (fromDate) => {
  const now = new Date();
  const startDate = new Date(fromDate.seconds * 1000);
  const diffMs = startDate - now;
  if (diffMs <= 0) return "Started";
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
});

const startEditing = (index) => {
  editingIndex.value = index;
  editedCity.value = destinations.value[index].city;
};

const saveEdit = async (index) => {
  if (editedCity.value.trim() === '') {
    editingIndex.value = -1;
    return;
  }

  try {
    destinations.value[index].city = editedCity.value;
    const userId = userStore.userId;
    const destinationDocRef = doc(db, `users/${userId}/my-destinations`, destinations.value[index].id);
    await updateDoc(destinationDocRef, {
      city: editedCity.value
    });
    editingIndex.value = -1;
  } catch (error) {
    console.error("Error updating destination:", error);
  }
};
</script>

<style scoped>
.about {
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}
.create-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 4px;
}
.create-button:hover {
  background-color: #0056b3;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
thead {
  background-color: #f4f4f4;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  font-weight: bold;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
.view-button {
  background-color: #4e5de6;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
}
.view-button:hover {
  background-color: #3b65ec;
}
.edit-button {
  background: none;
  border: 1px solid black;
  cursor: pointer;
  margin-left: 5px;
  color: #0056b3;
}
.edit-input {
  width: 100%;
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>