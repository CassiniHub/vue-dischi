function init() {

    new Vue ({
        el: '#app',

        data: {
            albums: [],
            genres: [],
            selectedGenre: 'All'
        },

        methods: {
            getGenres: function (arrayAlbums) {
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
                
                // function compare(a, b) {
                //     if (a.year < b.year) {
                //         return -1;
                //     }
                //     if (a.year > b.year) {
                //         return 1;
                //     }
                //     return 0;
                // }
                // return filteredAlbums.sort(compare);
                return filteredAlbums;
            },

            sortAlbumsByDate: function () {
                function compare(a, b) {
                    if (a.year < b.year) {
                        return -1;
                    }
                    if (a.year > b.year) {
                        return 1;
                    }
                    return 0;
                }

                return this.filteredAlbums.sort(compare);
            }
        },

        mounted: function () {
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(response => {
                this.albums = response.data.response;
                this.getGenres(this.albums);
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', init);