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
        .then(tracks => {
            document.querySelector('#tracks').innerHTML =  '';
            let i = 0;
            for(const track of tracks) {
            const template = 
            `<section class="track preview" data-index='${i}' data-preview-track="${track.preview_url}" onclick='playTrack(event)' 
            img data-src="${track.album.image_url}" data-name = "${track.name}" data-artist="${track.artist.name}";>
            <img src="${track.album.image_url}"/>
            <i class="fas play-track fa-play" aria-hidden="true"></i>
            <div class="label">
                <h3>"${track.name}" </h3>
                <p>
                    "${track.artist.name}"
                </p>
            </div>
        </section>`
        document.querySelector('#tracks').innerHTML += template;
        i += 1; 
        console.log(track);  
    if (`${track.preview_url}` === null) {
        document.querySelector('#tracks').innerHTML = "No Songs Found" 
    }
} 
})
};
const playTrack = (ev) => {
    console.log(ev);
    const sourceElement = ev.currentTarget;
    console.log(sourceElement);
    const idx = Number(sourceElement.dataset.index);
    document.querySelector('#track').src = sourceElement.dataset.previewTrack; 
    document.querySelector('.track-item').innerHTML ='';
    console.log(sourceElement.dataset.artist);
    document.querySelector('.track-item').innerHTML +=  `
    <img src="${sourceElement.dataset.src}"/>
    <i class="fas play-track fa-play" aria-hidden="true"></i>
    <div class="label">
        <h3>"${sourceElement.dataset.name}" </h3>
        <p>
            "${sourceElement.dataset.artist}"
        </p>
    </div>
    </section>`
    audioPlayer.setAudioFile(sourceElement.dataset.previewTrack);      
    audioPlayer.play();
}


const getAlbums = (term) => {
    let url = baseURL + `?type=album&q=${term}`;
    console.log(url);
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            document.querySelector('#albums').innerHTML = ''; 
            for(const album of data) {
                const template = 
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
            document.querySelector('#albums').innerHTML +=  template 
            if (`${album.id}` === null) {
                document.querySelector('#albums').innerHTML = "No Albums Found" 
            }    
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
        if (`${artist.id}` === null) {
            document.querySelector('#artist').innerHTML = "No Artists Found" 
        }     
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