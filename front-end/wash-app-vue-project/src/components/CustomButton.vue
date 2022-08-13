<script>

export default {
  props: {
    label: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    },
    isDisable: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}

</script>

<template>
  <button
      class="custom-button"
      :disabled="isDisable"
      :class="{ 'custom-button--hover': !isDisable , 'custom-button--disabled': isDisable }"
  >
    <p v-if="!isLoading" class="custom-button__label">{{ label }}</p>
    <div v-if="isLoading" class="loader"></div>
  </button>
</template>

<style lang="scss">
.custom-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 12px 32px;
  border-radius: 5px;
  transition: all ease-in-out 200ms;

  &--disabled {
    background-color: var(--color-surface-variant);
  }

  &--hover:hover {
    scale: 102%;
    background-color: var(--color-accent);
  }

  &__label {
    color: white;
    font-size: 1rem;
    padding: 0;
    margin: 0;
  }

  .loader {
    border: 0.4rem solid var(--color-surface-variant);
    border-top: 0.4rem solid var(--color-on-accent);
    border-radius: 50%;
    width: .7rem;
    height: .7rem;
    animation: spin 500ms cubic-bezier(.5,.1,.9,.33) infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
