<script setup lang="ts">
import { ref } from 'vue'

const visibleService = ref(false)
</script>

<template>
  <dialog>
    <form method="dialog">
      <p>
        <label>Favorite animal:
          <select>
            <option value="default">Choose…</option>
            <option>Brine shrimp</option>
            <option>Red panda</option>
            <option>Spider monkey</option>
          </select>
        </label>
      </p>
      <div>
        <button value="cancel">
          Cancel
        </button>
        <button
          id="confirmBtn"
          value="default"
        >
          Confirm
        </button>
      </div>
    </form>
  </dialog>
  <button
    class="mpl-btn ml-5 icon icon-jurassic_import-basicdata"
    @click="visibleService = true"
  />
</template>
