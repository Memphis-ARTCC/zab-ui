<template>
	<div>
		<div class="card home_intro">
			<div class="card-content">
				<span class="card-title">Welcome to Memphis ARTCC</span>
				<p>
					Welcome to the Memphis ARTCC. Memphis ARTCC is comprised of aviation enthusiasts from all around the world providing simulated Air Traffic Control services to pilots within our airspace using the VATSIM network. Memphis ARTCC includes most of Tennessee, Mississippi, and Arkansas.
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