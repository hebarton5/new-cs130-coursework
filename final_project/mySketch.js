
function setup() {
	let canvas =createCanvas(1500, 600, WEBGL);
	canvas.parent('sketch-container');
}
let size = 0
function draw() {
background(181, 178, 232);
frameRate(30);
push();
fill(139, 216, 148, 100);
stroke(74, 75, 74, 20);
blob(-5, -5, 20+size);
blob(-10, 0, 45+size);
blob(5, 10, 30+size);
blob(15, 9, 30+size);
blob(-15, -10, 60+size);
blob(15, -10, 60+size);	
blob(-20, -10, 45+size);
blob(20, 20, 50+size);
pop();
head();
}

function mouseWheel(){
	size -= (event.delta/20);
	if ((size < -120) ||( size > 200)){
		size = 0}
}
	
function head(){
	stroke(123, 125, 124, 20);
	fill(184, 241, 156, 100);
	sphere(100+size);
	stroke(107, 255, 176);
	fill(0, 255, 1181, 100);
	push();
	translate(-25, 0, -size);
//	ellipsoid(size/4, size/7, size/5, 15, 15);
	pop();
	push();
	translate(25, 0, -size);
	//ellipsoid(size/4, size/7, size/5, 15, 15);
	pop(); 
}

function blob(x, y, d){
	rotateX(millis()/2000);
	rotateY(millis()/2000);
	push();
	for(let m=0; m<20; m=m+1){
		for (let j=0; j<5; j=j+1){
	translate(x, y);
	rotate(radians(d));
sphere(20);
		}}
	pop();
}