const toggle = document.querySelector('#toggle');
const video = document.querySelector('#video');
const player = document.querySelector('.player');
const progress = document.querySelector('.progress-juice');
const volume = document.querySelector('#volume');
const expand = document.querySelector('#expand');
const volumeicon = document.querySelector('#volume-icon');

toggle.addEventListener('click', videoPlayPause);
video.addEventListener('click', videoPlayPause);

function videoPlayPause() {
  const status = video.paused ? 'play' : 'pause';
  video[status]();
}

video.addEventListener('play', UpdateToggle);
video.addEventListener('pause', UpdateToggle);
video.addEventListener('timeupdate', UpdateProgress);
volume.addEventListener('change', ChangeVolume);
expand.addEventListener('click', openFullScreen);

function UpdateToggle() {
  const icon = video.paused ? '►' : '❚❚';
  toggle.textContent = icon;
  ChangeVolume();
}

function UpdateProgress() {
  const percent = (100 * video.currentTime) / video.duration;
  progress.style.width = percent + '%';
}

function ChangeVolume() {
  video.volume = volume.value / 100;
  if (volume.value >= 50) {
    volumeicon.className = 'fas fa-volume-up';
  } else if (volume.value > 1 && volume.value < 50) {
    volumeicon.className = 'fas fa-volume-down';
  } else {
    volumeicon.className = 'fas fa-volume-mute';
  }
}

function openFullScreen() {
  if (expand.className == 'fa fa-expand expand') {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      /* IE11 */
      player.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
}

// player.addEventListener('change', changeExpand);

// function changeExpand() {
//   console.log('player width changed');
//   if (screen.innerWidth == player.width) {
//     expand.className = 'fas fa-compress expand';
//   } else {
//     expand.className = 'fa fa-expand expand';
//   }
// }

///// Fullscreen olduğunu anlamak için observer ile playerin widthini takip ettim
const myObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.contentRect.width == window.innerWidth) {
      expand.className = 'fas fa-compress expand';
    } else {
      expand.className = 'fa fa-expand expand';
    }
  });
});

myObserver.observe(player);
