<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Current Weather</span>
			<p>The runways listed here are suggestions. If there is a controller online, they may be using different runways than those listed here. Please always check with the controller's ATIS prior to planning your runways.</p>
		</div>
		<div class="table_overflow_wrapper" v-if="numStationsLoaded === Object.keys(stations).length" >
			<table class="striped compact">
				<thead>
					<tr>
						<th>Airport</th>
						<th>Wind</th>
						<th>Conditions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="station in stations" :key="station.icao">
						<td><span class="hide-on-med-and-down">{{ station.fullName }} <strong>({{ station.icao }})</strong></span><span class="hide-on-large-only">{{ station.icao }}</span></td>
						<td>{{ formatWind(station) }}</td>
						<td><div class="airport_conditions" v-html="getConditions(station)"></div></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="card-content loading" v-else>
			<Spinner />
		</div>
	</div>
</template>

<script>
import { zabApi } from '@/helpers/axios.js';
import parse from 'metar-parser';

export default {
	data() {
		return {
			icao: ['KMEM', 'KBNA', 'KLIT', 'KHSV', 'KJAN'],
			stations: {
				KMEM: {
					icao: "KMEM",
					fullName: "Memphis International Airport",
					metar: null,
					parsedMetar: null,
				},
				KBNA: {
					icao: "KBNA",
					fullName: "Nashville International Airport",
					metar: null,
					parsedMetar: null,
				},
				KLIT: {
					icao: "KLIT",
					fullName: "Bill and Hillary Clinton National Airport",
					metar: null,
					parsedMetar: null,
				},
				KHSV: {
					icao: "KHSV",
					fullName: "Huntsville International Airport-Carl T Jones Field",
					metar: null,
					parsedMetar: null,
				},
				KJAN: {
					icao: "KJAN",
					fullName: "Jackson-Medgar Wiley Evers International Airport",
					metar: null,
					parsedMetar: null,
				}
			},
			numStationsLoaded: 0
		};
	},
	async mounted() {
		await this.getWeatherForAirports();
	},
	methods: {
		async getWeatherForAirports() {
			for (const station of this.icao) {
				try {
					console.log(`Getting weather for ${station}`)
					const { data } = await zabApi.get(`/ids/stations/${station}`);
					console.log(data);
					this.stations[station].metar = data.metar;
					this.stations[station].parsedMetar = parse(data.metar);
					console.log(this.stations[station]);
					this.numStationsLoaded++;
				}
				catch (error) {
					console.error(error);
				}
			}
		},
		formatWind(station) {
			if(station.parsedMetar.wind.speedKt < 4) return 'Calm';
			else if(!('speedKt' in station.parsedMetar.wind)) return 'Unknown';
			const paddedWind = `0${station.parsedMetar.wind.direction}`.slice(-3);
			return `${paddedWind}@${station.parsedMetar.wind.speedKt}${(station.parsedMetar.wind.gust?`G${station.parsedMetar.wind.gust}`:'')}`;
		},
		getConditions(station) {
			return (station.parsedMetar.visibility.miles > 3) ? `<i class="material-icons weather_icon">wb_sunny</i>VFR` : `<i class="material-icons weather_icon">wb_cloudy</i>IFR`;
		}
	}
};
</script>

<style scoped lang="scss">
.airport_conditions {
	display: inline-flex;
	align-items: center;
	height: 33px;

	&::v-deep(i) {
		margin-right: 5px;
	}
}
.loading {
	text-align: center;
}

.progress {
	max-width: 500px;
	margin: 0 auto;
}

.table_overflow_wrapper {
	width: 100%;
	overflow-x: auto;
}

.weather_icon {
	padding-top: 1em;
}

tbody tr {
	transition: background-color .3s ease;
	&:hover {
		background-color: #eaeaea!important;
	}
}
</style>