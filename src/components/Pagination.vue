<script setup>
import { ref, watch, computed } from "vue";
// Get props from the parent component
const props = defineProps({
  pageRange: Number,
  totalPages: Number,
});
// Defines events that can be emitted to the parent component
const emit = defineEmits(["fetchData"]);
// Extracts values from props
const { totalPages, pageRange } = props;

console.log("init totalPages", totalPages);

const currentPage = ref(1);
const start = ref(1);
// Computes the end of the page range based on totalPages and pageRange
const end = computed(() => {
  let result = pageRange;
  if (start.value + pageRange - 1 > totalPages) {
    result = totalPages - start.value + 1;
  }
  return result;
});
// Function for the next page
const handleNextPage = () => {
  currentPage.value++;
};
// Function for the previous page
const handlePrevPage = () => {
  currentPage.value--;
};
// Function when change the page
const handleChangePage = (page) => {
  console.log("handleChangePage:", page);

  currentPage.value = page;
};
// Watches changes in currentPage and updates start when needed
watch(currentPage, () => {
  emit("fetchData", currentPage.value);
  console.log("watch currentPage", currentPage.value);

  // Update the start value if the current page is the first in a new range
  if (currentPage.value % pageRange === 1) {
    console.log("update start");
    start.value = currentPage.value;
  }

  // If the current page is the last in a range, move start back
  if (currentPage.value % pageRange === 0) {
    start.value = currentPage.value - pageRange + 1;
  }
});

// Watches changes in start and adjusts the end of the pagination range
watch(start, () => {
  if (start.value + pageRange - 1 > totalPages) {
    end.value = totalPages - start.value + 1;
  } else {
    end.value = pageRange;
  }
});
</script>

<template>
  <div class="page-container">
    <!-- Button for previous page -->
    <button
      type="button"
      :disabled="currentPage === 1"
      v-on:click="handlePrevPage"
    >
      <div><i class="fa-solid fa-angle-left"></i></div>
    </button>
    <!-- Uses `v-for` to create an array from `start` to `end` and iterate over it.
      Each button has a unique `key` based on its index. 
      Clicking a button triggers `handleChangePage(i)`, updating the current page.
      The `active` class is applied if `currentPage` matches the button number.-->
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
    <!-- Button for the next page -->
    <button
      type="button"
      v-on:click="handleNextPage"
      :disabled="currentPage === totalPages"
    >
      <div>
        <i class="fa-solid fa-angle-right"></i>
      </div>
    </button>
  </div>
</template>

<style>
/* icon */
i {
  color: #f9ab00;
  font-size: 24px;
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
