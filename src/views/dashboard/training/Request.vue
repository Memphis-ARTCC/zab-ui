<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">New Training Request</span>
			<div class="loading_container">
				<Spinner />
			</div>
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import { mapState } from 'vuex';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default {
	name: 'RequestTraining',
	title: 'Request Training',
	data() {
		return {
			request: {
				milestone: '',
				remarks: '',
				submitter: ''
			},
			milestones: null,
			makingRequest: false
		};
	},
	async mounted() {
		window.location.href = "https://memphisartcc.setmore.com"
	}
};
</script>