<script setup>
import { ref, watch } from "vue";

const props = defineProps(["pageRange", "totalPages", "fetchData"]);
const emit = defineEmits(["fetchData"]);
const { totalPages, pageRange } = props;

console.log("init totalPages", totalPages);

const currentPage = ref(1);
const start = ref(1);
const end = ref(pageRange);

const handleNextPage = () => {
  currentPage.value++;
};
const handlePrevPage = () => {
  currentPage.value--;
};

const handleChangePage = (page) => {
  console.log("handleChangePage:", page);

  currentPage.value = page;
};

watch(currentPage, () => {
  emit("fetchData", currentPage.value);
  console.log("watch currentPage", currentPage.value);

  if (currentPage.value % pageRange === 1) {
    console.log("update start");
    start.value = currentPage.value;
  }

  if (currentPage.value % pageRange === 0) {
    start.value = currentPage.value - pageRange + 1;
  }
});

watch(start, () => {
  console.log("start change:");
  console.log("start:", start.value);
  console.log("totalPages:", totalPages);
  console.log("pageRange:", pageRange);
  if (start.value + pageRange - 1 > totalPages) {
    end.value = totalPages - start.value + 1;
  } else {
    end.value = pageRange;
  }
});
watch(end, () => {
  console.log("end:", end.value);
});
</script>

<template>
  <div class="page-container">
    <button
      type="button"
      :disabled="currentPage === 1"
      v-on:click="handlePrevPage"
    >
      <div><i class="fa-solid fa-angle-left"></i></div>
    </button>

    <button
      type="button"
      v-for="i in Array.from({ length: end }, (v, idx) => idx + start)"
      :key="i"
      v-on:click="handleChangePage(i)"
      class="page-item"
      :class="{ active: currentPage === i }"
    >
      {{ i }}
    </button>
    <button
      type="button"
      v-on:click="handleNextPage"
      :disabled="currentPage === totalPages"
    >
      <div>
        <i class="fa-solid fa-angle-right"></i>
        <!-- Icon ngôi sao -->
      </div>
    </button>
  </div>
</template>

<style>
i {
  color: #f9ab00; /* Màu trắng */
  font-size: 24px; /* Kích thước */
}
button {
  background: transparent;
  border: none;
  cursor: pointer;
}
.page-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.page-item {
  background: transparent;
  border: none;
  color: #fffefbe5;
  font-size: 16px;
  cursor: pointer;
  padding: 5px 10px;
}
.page-item.active {
  color: #f9ab00;
  font-weight: bold;

  text-decoration: underline;
}
</style>
