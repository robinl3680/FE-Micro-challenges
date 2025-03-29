const drag = document.getElementById('drag');
const resizableDiv = document.getElementById('div');
let prevX;
let divWidth;

function changewidth(evt) {    
  	const diff = evt.x - prevX;
    document.body.style.cursor = 'col-resize';
    resizableDiv.style.width = +divWidth  + diff + 'px';
}

drag.addEventListener('mousedown', (e) => {
	prevX = e.x;
  console.log('Prev x: ', prevX);
  divWidth = resizableDiv.getBoundingClientRect().width;
  document.addEventListener('mousemove', throttleMouseMove);
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', throttleMouseMove);
    document.body.style.cursor = '';
	})
});

function throtlle(callback, time) {
	let flag = true;
  return function(evt) {
  	if(flag) {
    	flag = false;
      callback(evt);
      setTimeout(()=> flag = true, time);
    }
  }
}


var throttleMouseMove = throtlle(changewidth, 100);