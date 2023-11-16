// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const API_KEY = 'AIzaSyDKQyLTSnw5lyfsrSoGstdHCMP2HGwhG9s';
const PLAYLIST_ID = 'PLT1rvk7Trkw6-eCetnOs60kLGdmcHhyj0';

function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
        .then(() => console.log('GAPI client loaded for API'));
}

function execute() {
    return gapi.client.youtube.playlistItems.list({
        'part': 'snippet',
        'playlistId': PLAYLIST_ID,
        'maxResults': 50, // Adjust as needed
    });
}

function playRandomVideo(videos) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideoId = videos[randomIndex].snippet.resourceId.videoId;
    const videoUrl = `https://www.youtube.com/watch?v=${randomVideoId}`;
    document.getElementById('video-player').src = videoUrl;
}

gapi.load('client', loadClient);

document.getElementById('next-btn').addEventListener('click', function() {
    execute()
        .then(response => playRandomVideo(response.result.items))
        .catch(error => console.error('Error loading playlist items', error));
});
