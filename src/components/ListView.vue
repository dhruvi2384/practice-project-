<script setup lang="ts">
import { RouterLink } from "vue-router";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
const response = ref([]);
const searchFilters = ref();
async function getListing() {
  try {
    const res = await axios.get("http://localhost:3000/student");
    response.value = res.data; // Store the data in the response ref
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function removeListing(myid) {
  await axios.delete("http://localhost:3000/student/" + myid);
  getListing();
}
watch(searchFilters , async(newVal)=>{
  console.log(newVal,'newval');
  const search = await axios.get(`http://localhost:3000/student?lname=${newVal}`);
  response.value = search.data
  console.log('search: ', search);
})

onMounted(() => {
  getListing();
});
</script>

<template>
  <div class="student_listing">
    <div class="button_sec flex">
      <input
        type="text"
        placeholder="Search"
        class="me-auto search_input"
        v-model="searchFilters"
      />
      <router-link :to="{ name: 'addList' }">
        <button class="bg-[#172554] text-white p-2 rounded-md">
          Add Student
        </button>
      </router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in response" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.fname }} {{ item.lname }}</td>
          <td>{{ item.email }}</td>
          <td class="flex gap-2">
            <router-link :to="{ name: 'addList', query: { id: item?.id } }"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16.293 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 00-.293.707V15a1 1 0 001 1h2a1 1 0 00.707-.293l9-9a1 1 0 000-1.414l-2.293-2.293zM15 4a1 1 0 011 1v2h2a1 1 0 01.707 1.707l-2.293 2.293a1 1 0 01-1.414 0l-2.293-2.293A1 1 0 0115 6V4z"
                />
              </svg>
            </router-link>
            <router-link
              :to="{ name: 'viewStudent', query: { listId: item?.id } }"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.5c-4.5 0-8.5 3.5-8.5 7s4 7 8.5 7 8.5-3.5 8.5-7-4-7-8.5-7zM12 10.5a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </router-link>
            <button @click="removeListing(item.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L6 6M6 6L4.5 4.5M6 6L7.5 4.5M6 6L9 6M14 18L14 6M14 6L12.5 4.5M14 6L15.5 4.5M14 6L17 6M19 6L16 6M9 6V4a2 2 0 00-2-2H7a2 2 0 00-2 2v2M9 6h6m4 0H9m0 0H7m12 0V4a2 2 0 00-2-2h-2a2 2 0 00-2 2v2M5 6h14M5 6L4.5 4.5M19 6L19.5 4.5"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
