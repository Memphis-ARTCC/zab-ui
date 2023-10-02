<template>
	<div class="card">
		<div class="card-content">
			<div class="row row_no_margin">
				<div class="col s4">
					<a href="https://memphisartcc.setmore.com" target="_blank" class="btn center">Request Training</a>
				</div>
			</div>
		</div>
	</div>
	<PastSessions />
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import PastSessions from './Past.vue';

export default {
	name: 'TrainingDash',
	title: 'Training',
	data() {
		return {
			upcomingSessions: null
		};
	},
	components: {
		PastSessions
	},
	async mounted() {
		await this.getUpcomingSessions();
	},
	methods: {
		async getUpcomingSessions() {
			const { data } = await zabApi.get(`/training/request/upcoming`);
			this.upcomingSessions = data.data;
		}
	}

};
</script>

<style scoped lang="scss">
.no_sessions {
	padding: 0 1em 1em 1em;
	margin-top: -1em;
	font-style: italic;
}

table {
	min-width: 500px;
}

.session_wrapper {
	overflow: auto;
}

.session_list {
	min-width: 500px;
}

.session_list_row {
	tr {
		transition: background-color .3s ease;
		&:hover {
			background: #eaeaea;
		}
	}
}
</style>