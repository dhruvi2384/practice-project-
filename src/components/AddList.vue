<script lang="ts" setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
const studentName = ref();
const stuMail = ref();
const router = useRouter();
const route = useRoute();
const getId = ref(route.query.id);
console.log(getId.value, "id");
// function for add and edit
async function sendData(event: Event) {
  event.preventDefault();
  if (!route.query.id) {
    try {
      await axios.post("http://localhost:3000/student", {
        lname: studentName.value,
        email: stuMail.value,
      });

      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  } else {
    try {
      await axios.put("http://localhost:3000/student/" + getId.value,{
        lname: studentName.value,
        email: stuMail.value,
      });
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  }
}
// edit
async function fillData() {
  try {
    const getData = await axios.get(
      `http://localhost:3000/student?id=${getId.value}`
    );
    studentName.value = getData.data[0].lname;
    stuMail.value = getData.data[0].email;
  } catch (error) {
    console.log("hello");
  }
}
onMounted(async () => {
  await fillData();
});
</script>

<template>
  <div class="mt-10 pl-4">
    <router-link :to="{ name: 'list' }">
      <button
        class="py-2 px-4 bg-[#172554] text-white font-bold rounded-lg focus:outline-none focus[#172554] focus:[#172554]"
      >
        Back
      </button>
    </router-link>
  </div>
  <form
    id="studentForm"
    class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-20"
    @submit="sendData"
  >
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
        >Name:</label
      >
      <input
        type="text"
        id="name"
        required
        v-model="studentName"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
        >Email:</label
      >
      <input
        type="email"
        id="email"
        required
        v-model="stuMail"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      type="submit"
      id="submitBtn"
      class="w-full py-2 px-4 bg-[#172554] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
</template>
