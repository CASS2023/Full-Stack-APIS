window.addEventListener('DOMContentLoaded', (event) => {
  const videoPlayer = document.getElementById('video-player');
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const volumeUpBtn = document.getElementById('volume-up-btn');
  const volumeDownBtn = document.getElementById('volume-down-btn');
  const fileInput = document.getElementById('file-input');
  const fileLabel = document.getElementById('file-label');
  const selectedFile = document.getElementById('selected-file');
  const loadingOverlay = document.getElementById('loading-overlay');
  const loadingModal = document.getElementById('loading-modal');
  const acceptBtn = document.getElementById('accept-btn');

  playBtn.addEventListener('click', playVideo);
  pauseBtn.addEventListener('click', pauseVideo);
  volumeUpBtn.addEventListener('click', increaseVolume);
  volumeDownBtn.addEventListener('click', decreaseVolume);
  fileInput.addEventListener('change', handleFileSelection);
  acceptBtn.addEventListener('click', acceptLoading);

  videoPlayer.addEventListener('loadeddata', hideLoadingOverlay);
  videoPlayer.addEventListener('error', handleVideoError);

  function playVideo() {
    videoPlayer.play();
  }

  function pauseVideo() {
    videoPlayer.pause();
  }

  function increaseVolume() {
    if (videoPlayer.volume < 1) {
      videoPlayer.volume += 0.1;
    }
  }

  function decreaseVolume() {
    if (videoPlayer.volume > 0) {
      videoPlayer.volume -= 0.1;
    }
  }

  function showLoadingOverlay() {
    loadingOverlay.style.display = 'flex';
  }

  function hideLoadingOverlay() {
    loadingOverlay.style.display = 'none';
  }

  function handleVideoError() {
    videoPlayer.style.display = 'none';
    loadingOverlay.textContent = 'Error al cargar el video.';
    loadingOverlay.style.display = 'flex';
  }

  function handleFileSelection(event) {
    const file = event.target.files[0];
    const videoType = /video.*/;

    if (file.type.match(videoType)) {
      selectedFile.textContent = file.name;
      showLoadingOverlay();
      setTimeout(function() {
        loadingModal.style.display = 'flex';
      }, 2000);
    } else {
      videoPlayer.style.display = 'none';
      selectedFile.textContent = '';
      loadingOverlay.textContent = 'Tipo de archivo no válido.';
      loadingOverlay.style.display = 'flex';
    }
  }

  function acceptLoading() {
    loadingModal.style.display = 'none';
    const file = fileInput.files[0];
    const fileURL = URL.createObjectURL(file);
    videoPlayer.src = fileURL;
    videoPlayer.style.display = 'block';
    hideLoadingOverlay();
  }
});
