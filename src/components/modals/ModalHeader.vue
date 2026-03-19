<script setup lang="ts">
import { computed, inject } from 'vue';
import { useApp } from '../../composables/useApp';
import { ModalHeaderActionsSlotKey, ModalHeaderSlotKey } from '../../composables/modalSlots';
import type { Slot } from 'vue';

const props = defineProps<{
  title: string;
  icon: any;
}>();

const app = useApp();
const injectedHeaderSlot = inject<Slot | null>(ModalHeaderSlotKey, null);
const injectedActionsSlot = inject<Slot | null>(ModalHeaderActionsSlotKey, null);
const slotProps = computed(() => ({
  title: props.title,
  icon: props.icon,
  modal: app.modal,
  app,
}));

const headerSlotComponent = computed(() => {
  if (!injectedHeaderSlot) {
    return null;
  }
  return {
    render() {
      return injectedHeaderSlot(slotProps.value);
    },
  };
});

const headerActionsComponent = computed(() => {
  if (!injectedActionsSlot) {
    return null;
  }
  return {
    render() {
      return injectedActionsSlot(slotProps.value);
    },
  };
});
</script>

<template>
  <component
    :is="headerSlotComponent"
    v-if="headerSlotComponent"
  />
  <div v-else class="vuefinder__modal-header">
    <div class="vuefinder__modal-header__content">
      <div class="vuefinder__modal-header__icon-container">
        <component :is="icon" class="vuefinder__modal-header__icon"></component>
      </div>
      <div id="modal-title" class="vuefinder__modal-header__title">{{ title }}</div>
    </div>
    <div
      v-if="headerActionsComponent"
      class="vuefinder__modal-header__actions"
    >
      <component :is="headerActionsComponent" />
    </div>
  </div>
</template>
