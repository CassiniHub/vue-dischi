function init() {

    new Vue ({
        el: '#app',

        data: {
            albums: [],
            selectedGenre: 'All'
        },

        methods: {
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
            },

            sortAlbumsByDate: function (arrayAlbums) {
                function compare(a, b) {
                    if (a.year < b.year) {
                        return -1;
                    }
                    if (a.year > b.year) {
                        return 1;
                    }
                    return 0;
                }
                return arrayAlbums.sort(compare);
            }
        },

        computed: {
            getGenres: function () {
                let albums = this.albums;
                const genres = [];

                for (let i = 0; i < albums.length; i++) {
                    const album = albums[i];

                    if (!genres.includes(album.genre)) {
                        genres.push(album.genre);
                    }
                }
                return genres;
            },

            filterAndSortAlbums: function () {
                return this.sortAlbumsByDate(this.filteredAlbums());
            }
        },

        mounted: function () {
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(response => {
                this.albums = response.data.response;
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', init);