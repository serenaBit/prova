import Vue from 'vue';
import './style.scss'
import genres from './util/genres.js'

new Vue({
	el: '#app',
	components: {
	'movie-list': {
		template: `<div id="movie-list">
						<div class="movie" v-for="movie in movies"> {{ movie.title }} </div>
					</div>`,
		data:function() {
			return {
				movies: [
					{
						title: 'Pulp Fiction'
					},
					{
						title: 'Home Alone'
					},
					{
						title: 'Gli incredibili'
					}
				]	
			}
			
		}
	},
	'movie-filter':{
		data(){
			return{
				genres
			}
		},
		template: `<div id="movie-filter">
						<h2>Filter results</h2>
						<div class="filter-group">
							<check-filter v-for="genre in genres" v-bind:title="genre"></check-filter>
						</div>
						
					</div>`,
		components: {
			'check-filter': {
				data() {
					return{
						checked: false
					}
				},
				props: ['title'],
				template: `<div class="check-filter" v-on:click="checked = !checked">
								<span	class="checkbox"></span>
								<span	class="checkfilter-title"> {{ title }}</span>
							</div>`
			}
		}

		}
	}
})