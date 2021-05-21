const makeBigger = () => {
   alert('make bigger!');
   document.querySelector("p").style.fontSize = "3em"
};

const makeSmaller = () => {
   alert('make smaller!');
   document.querySelector("p").style.fontSize = "0.8em"
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;

