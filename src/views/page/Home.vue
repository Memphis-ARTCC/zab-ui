<template>
	<div>
		<div class="card home_intro">
			<div class="card-content">
				<span class="card-title">Welcome to Memphis ARTCC</span>
				<p>
					Welcome to the Virtual Memphis ARTCC! The Virtual Memphis ARTCC is a thriving community comprised of aviation enthusiasts from around the world providing simulated Air Traffic Control services to pilots using the VATSIM network. As the virtual representation of the real world Memphis ARTCC, our controllers control with authenticity and professionalism, closely duplicating real world procedures within our airspace, while also maintaining the fun that embodies the VATSIM network. Our airspace includes most of Tennessee, Mississippi, and Arkansas, with its centerpiece being the busiest cargo airport in the continental United States.
				</p>
				<div class="visit" v-if="!user.isLoggedIn || (!user.data.vis && !user.data.isMem)">
					<p>
						If you would like to become a visitor, please click the button below.
					</p>
					<router-link to="/controllers/visit" class="btn btn-waves">Become a Visitor</router-link>
				</div>
			</div>
		</div>
		<EventSummary />
		<NewsSummary />
		<WeatherInfo />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import WeatherInfo from '../partial/WeatherInfo.vue';
import NewsSummary from '../partial/NewsSummary.vue';
import EventSummary from '../partial/EventSummary.vue';

export default {
	title: "Home",
	components: {
		NewsSummary,
		WeatherInfo,
		EventSummary
	},
	computed: {
		...mapState('user', [
			'user'
		])
	}
};
</script>

<style scoped lang="scss">
.visit {
	margin-top: 1em;
	text-align: center;

	p {
		text-align: left;
	}

	.btn {
		margin-top: 1em;
	}
}
</style>