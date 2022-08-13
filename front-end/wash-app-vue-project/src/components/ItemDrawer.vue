<script>
export default {
    props: {
        isSelected: false,
        label: "",
        icon: "",
    },
};
</script>

<template>
    <div class="drawer-item drawer-item--selected">
        <img :src="'/' + icon" alt="" class="drawer-item__icon" />
        <p class="drawer-item__label">{{ label }}</p>
    </div>
</template>

<style lang="scss" scoped>
.drawer-item {
  cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--color-on-background);
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 5px;
}

.drawer-item--selected {
    background-color: var(--color-accent);
    color: white;
}

.drawer-item__icon {
    width: 24px;
    height: 24px;
    margin-right: 0.7rem;
    color: aqua;
}

.drawer-item__label {
    text-decoration: none !important;
    color: white;
    padding: 0;
    margin: 0;
    text-align: center;
}
</style>
