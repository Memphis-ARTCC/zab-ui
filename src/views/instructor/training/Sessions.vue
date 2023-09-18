<template>
	<div class="card">
	</div>
	<Completed />
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import Completed from './Completed.vue';

export default {
	name: 'UpcomingSessions',
	title: 'Training Sessions',
	data() {
		return {
			sessions: null
		};
	},
	components: {
		Completed
	},
	async mounted() {
		await this.getSessions();

		M.Modal.init(document.querySelectorAll('.modal'), {
			preventScrolling: false
		});
		M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
			margin: 0
		});
	},
	methods: {
		async getSessions() {
			try {
				const { data } = await zabApi.get(`/training/session/open`);
				this.sessions = data.data;
			} catch(e) {
				console.log(e);
			}
		},
		formatDateTime(value) {
			const d = new Date(value);
			return d.toLocaleString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC', hour12: false});
		},
	}
};
</script>

<style scoped lang="scss">
.no_sessions {
	font-style: italic;
	margin-top: -1em;
	padding: 0 1em 1em 1em;
}

.modal_title {
	font-size: 1.8em;
	margin-bottom: .5em;
}

.session_list {
	min-width: 500px;
}

.modal_session {
	.row {
		.input-field p {
			line-break: normal;
			hyphens: auto;
			margin: .33em 0 0 0;
		}
	}
}
</style>