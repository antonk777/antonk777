let player

const searchParams = new URLSearchParams(location.search)

const playlistID = searchParams.get('playlist') ?? 'PL06hpjkz4PZmlpqUvvmBEG4v24JFimEyg'

function createIframe() {
  const el = document.createElement('iframe')
  el.id = 'player'
  el.src = `https://www.youtube.com/embed/videoseries?listType=playlist&list=${playlistID}&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`

  document.body.appendChild(el)

  return el
}

function onYouTubeIframeAPIReady() {
  // console.log('onYouTubeIframeAPIReady()')

  const iframeEl = createIframe()

  player = new YT.Player(iframeEl, {
    playerVars: {
      list: playlistID,
      listType: 'playlist',
      controls: 0,
      mute: 0,
      rel: 0,
      iv_load_policy: 3
    },
    events: {
      onReady: onPlayerReady,
      // onStateChange: onStateChange,
      onError: onPlayerError
    }
  })
}

function onPlayerReady(event) {
  // console.log('onPlayerReady():', event)

  player.setShuffle(true)
  player.playVideoAt(0)
  // player.loadModule('captions')
}

function onStateChange(event) {
  console.log(
    'onPlayerStateChange():',
    event,
    YT.PlayerState
  );
}

function onPlayerError(event) {
  console.warn('onPlayerError():', event)
  player.nextVideo()
}
