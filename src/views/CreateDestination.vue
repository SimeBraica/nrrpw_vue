<template>
    <div class="create-destination">
        <h1>Create New Destination</h1>
        <form @submit.prevent="createDestination">
            <div>
                <label for="city">City:</label>
                <input v-model="city" type="text" id="city" required />
            </div>
            <div>
                <label for="country">Country:</label>
                <input v-model="country" type="text" id="country" required />
            </div>
            <div>
                <label for="fromDate">From Date:</label>
                <input v-model="fromDate" type="date" id="fromDate" required />
            </div>
            <div>
                <label for="toDate">To Date:</label>
                <input v-model="toDate" type="date" id="toDate" required />
            </div>
            <div>
                <label for="price">Price:</label>
                <input v-model="price" type="number" id="price" required />
            </div>
            <button type="submit" class="submit-button">Create</button>
        </form>
    </div>
</template>

<script>
import { db } from "../assets/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

export default {
    name: "CreateDestination",
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        return { userStore, router };
    },
    data() {
        return {
            city: "",
            country: "",
            fromDate: "",
            toDate: "",
            price: null,
        };
    },
    methods: {
        async createDestination() {
            const destinationsRef = collection(db, `users/${this.userStore.userId}/my-destinations`);
            const docRef = await addDoc(destinationsRef, {
                city: this.city,
                country: this.country,
                fromDate: new Date(this.fromDate),
                toDate: new Date(this.toDate),
                price: this.price,
            });

            const newDestination = {
                id: docRef.id,
                city: this.city,
                country: this.country,
                fromDate: new Date(this.fromDate),
                toDate: new Date(this.toDate),
                price: this.price,
            };

            // Redirect with alert query parameter
            this.router.push({ 
                name: "destinations", 
                query: { 
                    alert: JSON.stringify({
                        message: `Destination added: ${this.city}, ${this.country}`,
                        details: newDestination
                    }) 
                } 
            });
        }
    },
    mounted() {
        const userId = this.userStore.userId;
        if (userId === '') {
            this.router.push('/');
            return;
        }
    }
}
</script>
<style>
.create-destination {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 300px;
}

label {
    font-weight: bold;
}

input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.submit-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>