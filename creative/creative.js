// Initial reference
let container = document.querySelector(".container");
let createPageBtn = document.getElementById("create");  
let clearPageBtn = document.getElementById("clear");
let colorBtn = document.getElementById("choose-color"); 
let eraseBtn = document.getElementById("delete-btn");
let createArtBtn = document.getElementById("paint-btn");
let gridWidth = document.getElementById("w-range"); 
let gridHeight = document.getElementById("h-range"); 
let widthValue = document.getElementById("w-value");
let heightValue = document.getElementById("h-value"); 

// Events object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
    },

    touch: {
        down: "touchstart", 
        move: "touchmove",
        up: "touchend", 
    },
};

let deviceType = "";
let draw = false;
let erase = false;

// Detect touch device
const isTouch = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } 
    catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouch();

// Create drawing page
createPageBtn.addEventListener("click", () => {
    container.innerHTML = ""; // Initial container value is empty
    let count = 0; // Container for unique IDs

    // Create row
    for (let i = 0; i < gridHeight.value; i++) { 
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");

        // Create columns
        for (let j = 0; j < gridWidth.value; j++) { 
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                col.style.backgroundColor = erase ? "transparent" : colorBtn.value;
            });

            col.addEventListener(events[deviceType].move, (e) => {
                if (!draw) return;

                let x = !isTouch() ? e.clientX : e.touches[0].clientX;
                let y = !isTouch() ? e.clientY : e.touches[0].clientY;
                let elements = document.elementsFromPoint(x, y);

                for (let element of elements) {
                    if (element.classList.contains("gridCol")) {
                        element.style.backgroundColor = erase ? "transparent" : colorBtn.value;
                        break;
                    }
                }
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
});

function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol"); 

    gridColumns.forEach((element) => { 
        if (elementId == element.id) {
            element.style.backgroundColor = erase ? "transparent" : colorBtn.value;
        }
    });
}

// Clear grid

clearPageBtn.addEventListener("click", () =>{
    container.innerHTML="";
});

//Erase

eraseBtn.addEventListener("click",() => {
    erase = true;
});

//Paint
createArtBtn.addEventListener("click", () => {
    erase = false;
});

// gGrid width and height

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});


gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});


window.onload = () => {
    gridWidth.value = 1;
    gridHeight.value = 1;
    widthValue.innerHTML = "01";
    heightValue.innerHTML = "01";
};

