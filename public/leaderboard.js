var leaderboard = new Vue({
    el: '#leaderboard',
    data: {
        items: [],
    },
    methods: {
        async getGames() {
			try {
				let res = await axios.get("/api/games");
				this.items = res.data;
				return true;
			} catch (error) {
				console.log(error);
			}
        },
        async deleteGame(item) {
			try {
				console.log(item._id)
				let response = await axios.delete("/api/games/" + item._id);
				//this.getGames();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
    },
    computed: {
        shortenedItems: function() {
            if (this.items.length > 10) {
                var item;
                var index = 0;
                while (this.items.length > 10) {
                    item = this.items[index];
                    this.deleteGame(item);
                    this.items.shift();
                    index++;
                }
                var shortenedItemsArray = this.items;
                return shortenedItemsArray;
            } else {
                var shortenedItemsArray = this.items;
                return shortenedItemsArray;
            }
        }
    },
    created() {
      this.getGames();
    },
  
  });
