// Team Cards

const teamCard = document.getElementsByClassName('c-teamCard');

for (var i = 0; i < teamCard.length; i++) {
    let svg = teamCard[i].getElementsByClassName('c-teamCard__bubbleTip')[0];
    let tip = svg.children[0];
  
    // Randomly set the bubble tip position
    bubbleTipPosition( svg, tip );
  
    // Set the bubble tip position according to cursor position
    // within the team card container
    teamCard[i].onmousemove = function(e) { 
        let bounding = this.getBoundingClientRect();
        let x = (e.pageX - bounding['left']) / this.offsetWidth * 100;
        bubbleTipPosition( svg, tip, x );
    }
}

function bubbleTipPosition( svg, tip, offsetX ) {
  // Use random balue if offsetX is not defined
  
  if (offsetX === undefined) {
    offsetX = Math.floor(Math.random() * 100);
  }
  
  let posX = offsetX;
  let bubbleTip = (72 / 100) * (100 - posX);

  svg.setAttribute('style', 'left: '+ posX + '%');
  tip.setAttribute('points', '24,0 48,0 '+ bubbleTip +',32');
  
}

// Filter

var elem = document.querySelector('.employees');
var iso = new Isotope( elem, {
  // options
  itemSelector: '.col-10',
  layoutMode: 'fitRows'
});

const filter = document.getElementById('filter');

filter.addEventListener('change', function(e) {
  let value = this.value;
  
  iso.arrange({ filter: value });
});


// Audio Player

const audioPlayer = document.getElementById('player');
const audioButtons = document.getElementsByClassName('c-audioToggle');


for (var i = 0; i < audioButtons.length; i++) {
	audioButtons[i].addEventListener('click', function(e) {
		let audioSrc = this.getAttribute('data-audio');
		let currentlyPlaying = document.querySelectorAll('.isPlaying');

		if ( audioSrc !== audioPlayer.getAttribute('src') ) {

			// Remove 'isPlaying' class from currently active audio toggle
			if ( currentlyPlaying.length != 0 ) {
				currentlyPlaying[0].classList.remove('isPlaying');
			}

      // Start new audio
			this.classList.add('isPlaying');
			audioPlayer.setAttribute('src', audioSrc);
			audioPlayer.play();
		} else {
			// Same audiofile selected
			if ( !audioPlayer.paused ) {
				audioPlayer.pause();
				this.classList.remove('isPlaying');
			} else {
				audioPlayer.play();
				this.classList.add('isPlaying');
			}
		}
	});
}

audioPlayer.addEventListener('ended', function(e) {
	document.querySelectorAll('[data-audio="' + this.getAttribute('src') + '"]')[0].classList.remove('isPlaying');
});