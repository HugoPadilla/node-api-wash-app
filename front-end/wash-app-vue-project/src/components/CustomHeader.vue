<script setup>

const props = defineProps({
  title: String,
  subtitle: String
});

</script>

<template>
  <div class="custom-header">
    <img
        @click="$emit('toggle')"
        class="custom-header__menu"
        src="../assets/icon/menu.svg"
        alt=""
    />

    <div class="custom-header__container-title">
      <h5>{{ title }}</h5>
      <h6>{{ subtitle }}</h6>
    </div>

    <img
        class="custom-header__notify"
        src="../assets/icon/icon-bell.png"
        alt=""
    />
    <img
        clas="custom-header__profile"
        src="../assets/img-profile.png"
        alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.custom-header {
  display: flex;
  align-items: center;
  padding: 0.3rem 2rem;
  background-color: var(--color-surface);
  border: 1px solid #d4e2f3;
}

.custom-header__container-title {
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
}

.custom-header__notify {
  background-color: var(--color-surface-variant);
  margin: 0 1rem;
  padding: 12px;
  border-radius: 50%;
}
</style>
