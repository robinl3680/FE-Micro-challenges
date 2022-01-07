
let allStars = [];
createStar();
let rating = -1;
function createStar() {
	let parent = document.querySelector('.container');
	for(let i = 0 ; i < 5; i++) {
  	let div = document.createElement('div');
    div.classList.add('star');
    div.classList.add('star-empty');
    div.setAttribute('data-index', i);
    allStars.push(div);
    parent.appendChild(div);
  }
  parent.addEventListener('mouseover', onMouseOver);
  parent.addEventListener('mouseleave', onMouseLeave);
  parent.addEventListener('click', onClick);
}
function fillOrUnFillStar(count) {
	for(let i = 0; i <= count; i++) {
  	if(allStars[i]) {
    	allStars[i].classList.add('star-filled');
    	allStars[i].classList.remove('star-empty');
    }
  }
  for(let i = 4; i > count; i--) {
  	if(allStars[i]) {
    	allStars[i].classList.add('star-empty');
    	allStars[i].classList.remove('star-filled');
    }
  }
}

function onMouseOver(evt) {
	const index = evt.target.dataset.index;
  fillOrUnFillStar(+index);
}
function onMouseLeave(evt) {
	fillOrUnFillStar(rating);
}
function onClick(evt) {
	const index = evt.target.dataset.index;
  if(+index === rating) {
  	rating = -1;
    fillOrUnFillStar(rating);
  } else {
  	if(index !== undefined) {
  		rating = +index;
  	}
  }
  
}