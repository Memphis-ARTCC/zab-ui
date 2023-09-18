import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import M from '@materializecss/materialize'; // Temporary fix until I figure out why I can't import a (custom) minified file directly
import '@materializecss/materialize/sass/materialize.scss';

import dates from './helpers/dates.js';
import toasts from './helpers/toasts.js';

import Spinner from './components/Spinner.vue';

const app = createApp(App)
	.use(store)
	.use(router)
	.mixin({
		methods: {
			...dates,
			...toasts
		}
	})
	.mixin({
		created() {
			const { title } = this.$options;
			if(title) {
				document.title = `${(typeof title === 'function') ? title.call(this) : title} | Memphis ARTCC`;
			}
		},
		methods: {
			setTitle(title) {
				document.title = `${(typeof title === 'function') ? title.call(this) : title} | Memphis ARTCC`;
			}
		}
	})
	.mixin({
		data() {
			return {
				footerTime: null
			};
		},
		created() {
			setInterval(() => {
				this.footerTime = `${this.dtFull(new Date())}z`;
			}, 1000);
		}
	})
	.component('Spinner', Spinner);

app.mount('#app');