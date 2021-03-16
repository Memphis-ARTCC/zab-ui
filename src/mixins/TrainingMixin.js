import {zabApi} from '@/helpers/axios.js';

export const TrainingMixin = {
	methods: {
		getPastSessionsMixin(id) {
			return zabApi.get(`/training/request/past/${id}`).then(response => response.data.data).catch((err) => console.log(err));
		},
		getUpcomingSessionsMixin(id) {
			return zabApi.get(`/training/request/upcoming/${id}`).then(response => response.data.data).catch((err) => console.log(err));
		},
		getTrainingMilestonesMixin(id) {
			return zabApi.get(`/training/milestones/${id}`).then(response => response.data).catch((err) => console.log(err));
		}
	}
};