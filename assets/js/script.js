function init() {

    new Vue ({
        el: '#app',

        data: {
            albums: [],
            genres: [],
            selectedGenre: 'All'
        },

        methods: {
            getAlbums: function (arrayAlbums) {
                for (let i = 0; i < arrayAlbums.length; i++) {
                    const album = arrayAlbums[i];

                    if (!this.genres.includes(album.genre)) {
                        this.genres.push(album.genre)
                    }
                }
            }
        },

        computed: {
            filteredAlbums: function () {
                const filteredAlbums = [];

                for (let i = 0; i < this.albums.length; i++) {
                    const album = this.albums[i];
                    
                    if (album.genre === this.selectedGenre) {
                        filteredAlbums.push(album);
                    } else if (this.selectedGenre === 'All') {
                        filteredAlbums.push(album);
                    }
                }
                return filteredAlbums;
            }
        },

        mounted: function () {
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(response => {
                this.albums = response.data.response;
                this.getAlbums(this.albums);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', init);