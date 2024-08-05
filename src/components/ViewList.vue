<script lang="ts" setup>
import axios from "axios";
import { onMounted, ref } from "vue"
import { useRoute } from 'vue-router'

const response = ref([])
const route = useRoute()
const id = ref(route.query.listId)

async function getSingleData() {
  try {
    
    const res = await axios.get(`http://localhost:3000/student/${id.value}`);
    response.value = res.data;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  getSingleData();
});
</script>
<template>
  <div class="student_listing">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>

          <td>{{ response.id }}</td>
          <td>{{ response.fname }}  {{ response.lname }}</td>
          <td>{{ response.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
