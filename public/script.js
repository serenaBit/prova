 var PRICE = 9.99;
 var LOAD_NUM = 10;
new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [ ],
		cart: [ 
		],
		results: [],
		newSearch: 'anime',
		lastSearch: '',
		loading: false,
		price: PRICE
	},
	computed: {
		noMoreItems: function(){
			return this.results.length === this.items.length && this.results.length > 0;
		}
	},
	methods: {
		appendItems: function() {
			if (this.items.length < this.results.length){
				var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
				this.items = this.items.concat(append);
			}
		},
		addItem: function(index){
			this.total += 9.9
			//if item is already in the cart, we have to increase the qty
			var item = this.items[index]
			var found = false;
			for (var i = this.cart.length - 1; i >= 0; i--) {
				if (this.cart[i].id === item.id) {
					found = true;
					this.cart[i].qty++;
					break;
				}
				else{

				}
			}
			if (!(found)) {
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: PRICE
				});	
			}
			

		},
		inc: function(item){
			item.qty++;
			this.total += PRICE;
		},
		dec: function(item){
			if (item.qty - 1 <= 0){
				for (var i = this.cart.length - 1; i >= 0; i--) {
					if( this.cart[i].id === item.id){
						this.cart.splice(i, 1);
						break;  
					}

				}
			}
			else{
				item.qty--;
				this.total -= PRICE;
			}
			
		},
		onSubmit: function(){
			if (this.newSearch.length) {
				//puliamo la lista
				this.items= []
				this.loading = true;
				//return a prpmise
				this.$http
					.get('/search/'.concat(this.newSearch))
					.then(function(res){
						this.loading = false;
						this.results = res.data;
						this.appendItems()
						this.lastSearch = this.newSearch;
					})	
			}
			
		}
	},
	filters: {
		currency: function(price){
			return '€'.concat(price.toFixed(2));
		}
	},
	mounted: function(){
		this.onSubmit();
		//alias
		var vueInstance = this;
		var elem = document.getElementById('product-list-bottom');
		var watcher = scrollMonitor.create(elem);
		watcher.enterViewport(function(){
			vueInstance.appendItems()
		})
	}
});



