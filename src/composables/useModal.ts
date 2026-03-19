import { ref, shallowRef } from 'vue';
import type { ConfigStore } from '../stores/config';

export default function useModal(config: ConfigStore) {
  const type = shallowRef<any>(null);
  const visible = ref(false);
  const data = ref<any>();
  const editMode = ref(false);
  const fullScreen = ref(false);

  const open = (modal: any, payload: any = null) => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = 'hidden';
    }
    visible.value = true;
    type.value = modal;
    data.value = payload;
    fullScreen.value = false;
  };

  const close = () => {
    if (!config.get('fullScreen')) {
      document.querySelector('body')!.style.overflow = '';
    }
    visible.value = false;
    type.value = null;
    fullScreen.value = false;
  };

  const setEditMode = (mode: boolean) => {
    editMode.value = mode;
  };

  const setFullScreen = (mode: boolean) => {
    fullScreen.value = mode;
  };

  const toggleFullscreen = () => {
    fullScreen.value = !fullScreen.value;
  };

  return {
    visible,
    type,
    data,
    open,
    close,
    setEditMode,
    editMode,
    fullScreen,
    setFullScreen,
    toggleFullscreen,
  };
}
