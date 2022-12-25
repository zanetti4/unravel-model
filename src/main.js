import { createApp } from 'vue';
import { Switch } from 'view-ui-plus';
import App from './App.vue';
import 'view-ui-plus/dist/styles/viewuiplus.css';

const app = createApp(App);

app.component('Switch', Switch)
	.mount('#app');
