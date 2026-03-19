import type { Slot } from 'vue';

export type ModalHeaderSlot = Slot | undefined;

export const ModalHeaderSlotKey = Symbol('VueFinderModalHeaderSlot');
export const ModalHeaderActionsSlotKey = Symbol('VueFinderModalHeaderActionsSlot');
