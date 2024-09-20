<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="relative">
      <!-- Ensure the image fits within the screen while keeping its aspect ratio -->
      <img :src="imageSrc" draggable="false" alt="Modal Image" class="object-contain max-h-[90vh] max-w-[90vw]" />
      <button
        class="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
        @click="closeModal"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    imageSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:isVisible', false);
    }
  }
};
</script>

<style scoped>
/* Optional custom styles */
</style>
