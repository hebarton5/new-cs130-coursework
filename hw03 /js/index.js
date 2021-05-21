/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg', 
    'images/daisy1.jpg' 
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" 
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();
let position = 0;

const featuredImage = (ev) => {
    const sourceElement = ev.currentTarget;
    position = parseInt(sourceElement.dataset.index);
    console.log("position:", position);
    document.querySelector(".featured_image").style.backgroundImage = sourceElement.style.backgroundImage;
}

const next = (ev) => {
    position += 1;
    if (position > 7){ position = 0};
    console.log('position', position);
    const nextElement = images[position];
    document.querySelector(".featured_image").style.backgroundImage = `url('${nextElement}')`;
}

const previous = (ev) => {
    position -= 1;
    if (position <0) {position = 7};
    console.log('position', position);
    const prevElement = images[position];
    document.querySelector(".featured_image").style.backgroundImage = `url('${prevElement}')`;
}

const imageElements = document.querySelectorAll('.image');
for (const sourceElement of imageElements) {
    sourceElement.onclick = featuredImage;
};


document.querySelector('.next').onclick = next;
document.querySelector('.prev').onclick = previous;
document.querySelector('.featured_image').onclick = next;