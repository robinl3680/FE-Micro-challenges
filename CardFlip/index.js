
let uniqueNum = [];
let randomNumToGuess;
let correctDiv;
let innerContainers = document.querySelectorAll('.inner-container');
let score = 0;
let attempt = 0;
document.querySelector('.main').style.pointerEvents = 'none';
createRandom();
function createRandom(from=false) {
	uniqueNum = [];
	let allDiv = document.querySelectorAll('.inner');
  for(let i = 0; i < allDiv.length; i++) {
    const randomNum = Math.floor(Math.random() * 50);
  	if(uniqueNum.indexOf(randomNum) === -1) {
    	allDiv[i].innerHTML = randomNum;
      uniqueNum.push(randomNum);
    } else {
    	while(true) {
      	const randomNum = Math.floor(Math.random() * 50);
        if(uniqueNum.indexOf(randomNum) === -1) {
        	allDiv[i].innerHTML = randomNum;
      		uniqueNum.push(randomNum);
          break;
        }
      }
    }
  }
 flipCards(from);
}
function flipCards(from=false) {
  let interval = 5000;
  if(from) {
  	interval = 0;
  }
	setTimeout(() => {
    for(let i = 0 ; i < innerContainers.length; i++) {
      innerContainers[i].classList.add('container-fliped');
      innerContainers[i].classList.remove('container-nonfliped');
      if(from) {
        innerContainers[i].children[0].style.backgroundColor = 'white';
        innerContainers[i].classList.add('container-nonfliped');
        innerContainers[i].classList.remove('container-fliped');
         setTimeout(() => {
          innerContainers[i].classList.add('container-fliped');
          innerContainers[i].classList.remove('container-nonfliped');
          const randomIdx = Math.floor(Math.random() * 6);
          randomNumToGuess = uniqueNum[randomIdx];
          correctDiv = innerContainers[randomIdx];
          document.querySelector('.guess-box').innerHTML = randomNumToGuess;
          document.querySelector('.main').style.pointerEvents = '';
         }, 5000);
      }
    }
    if(!from) {
    	const randomIdx = Math.floor(Math.random() * 6);
      randomNumToGuess = uniqueNum[randomIdx];
      correctDiv = innerContainers[randomIdx];
      document.querySelector('.guess-box').innerHTML = randomNumToGuess;
      document.querySelector('.main').style.pointerEvents = '';
    } else {
    	document.querySelector('.guess-box').innerHTML = '';
    }
	}, interval);
}

function flip(evt) {
	let style;
  let message;
  attempt += 1;
	if(+evt.target.parentNode.children[0].innerHTML === randomNumToGuess) {
  	style = 'green';
    message = 'Guessed right 🤩'
    score += 1;
  } else {
  	style = 'red';
    message = 'Guessed wrong 😑'
  }
  evt.target.parentNode.classList.add('container-nonfliped');
  evt.target.parentNode.classList.remove('container-fliped');
  evt.target.parentNode.children[0].style.backgroundColor = style;
  document.querySelector('.guess-box').innerHTML = message;
  correctDiv.children[0].style.backgroundColor = 'green';
  correctDiv.classList.add('container-nonfliped');
  correctDiv.classList.remove('container-fliped');
  document.querySelector('.score').children[0].innerHTML = score;
  document.querySelector('.score').children[1].innerHTML = attempt;
  document.querySelector('.main').style.pointerEvents = 'none';
  setTimeout(() => {
  	createRandom(true);
  }, 5000);
}