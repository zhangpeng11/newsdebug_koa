let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

function onYouTubeIframeAPIReady() {
    // debugger
    let checkDomStatus = setInterval(()=>{
        if(window.mounted){
            player = new YT.Player('player', {
                playerVars: {
                    'iv_load_policy': 3,
                    'cc_load_policy': 0,
                    'rel': 0,
                    'autoplay': 0,
                    'playsinline': 1,
                    'modestbranding': 1
                },
                events: {
                    onReady:  onPlayerReady
                }
            })
            clearInterval(checkDomStatus)
        }
    },0)
}

function onPlayerReady () {
    player.loadVideoById({
        'videoId': document.getElementById("player").getAttribute("videoid")
    });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
window.onPlayerReady = onPlayerReady

export default player
