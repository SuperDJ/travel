export default {
	getRandomImage(  context, q ) {
		const key = '8061014-3041347b399a40caf453735b5';
		const url = `https://pixabay.com/api/?key=${key}&q=${q.replace(/ /g, '+')}&image_type=photo&safesearch=true&orientation=horizontal&category=travel&per_page=200`;
		fetch(url)
			.then((response) => {return response.json()})
			.then((result) => {
				return result.hits[random(1, 200)].webformatURL;
			});

		function random(min, max) {
			Math.floor((Math.random() * min) + max )
		}
	},

	getContinents( context ) {
		fetch('/api/continents')
			.then(response => {
				return response.json()
			})
			.then(response => {
				context.commit('setContinents', response)
			});
	}
}