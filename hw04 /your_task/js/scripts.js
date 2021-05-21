const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=track&q=${term}&limit=5`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            for(const track of data) {
            document.querySelector('#tracks').innerHTML += 
            `<section class="track-item preview" data-preview-track="${track.preview_url}">
            <img src="${track.album.image_url}">
            <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h3>"${track.name} </h3>
                <p>
                    "${track.artist}"
                </p>
            </div>
        </section>`
        console.log(track);
            }
        })
};

const getAlbums = (term) => {
    let url = baseURL + `?type=album&q=${term}`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            for(const album of data) {
                document.querySelector('#albums').innerHTML += 
                `<section class="album-card" id="${album.id}">
                <div>
                    <img src="${album.image_url}">
                    <h3>${album.name}</h3>
                    <div class="footer">
                        <a href="${album.spotify_url}" target="_blank">
                            view on spotify
                        </a>
                    </div>
                </div>
            </section>`
            }
        })
};

const getArtist = (term) => {
    let url = baseURL + `?type=artist&q=${term}&limit=1`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(artist => {
            console.log(artist);
            document.querySelector('#artist').innerHTML =
            `<section class="artist-card" id='${artist[0].id}'>
            <div>
                <img src='${artist[0].image_url}'>
                <h3>'${artist[0].name}'</h3>
                <div class="footer">
                    <a href='${artist[0].spotify_url}' target="_blank">
                        view on spotify
                    </a>
                </div>
            </div>
        </section>`     
        });

}


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};