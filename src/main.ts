import mixpanel from 'mixpanel-browser';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/styles.css';

export const BASE_URL =
  window.location.hostname === 'localhost' ? './scribbles/' : './';

createApp(App).mount('#app');

// Initialize Mixpanel
// if it's running from localhost, don't track the page load
mixpanel.init('e82e613b6fdaf8a1239aa67e3e05d4d5');
if (window.location.hostname !== 'localhost') {
  console.warn('Mixpanel tracked the page load!');
} else {
  console.warn('Accessing from localhost; Mixpanel is disabled.');
}
