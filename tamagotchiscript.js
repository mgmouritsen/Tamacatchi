const sliders = document.querySelectorAll('.eachSlider');
updateAllSliders()

function updateAllSliders() {

    // Make sure no value goes beyond 100 or below 0
    if (document.getElementById("Happiness").value < 0) {
        document.getElementById("Happiness").value = 0;
    } else if (document.getElementById("Happiness").value > 100) {
        document.getElementById("Happiness").value = 100;
    }

    if (document.getElementById("Hunger").value < 0) {
        document.getElementById("Hunger").value = 0;
    } else if (document.getElementById("Hunger").value > 100) {
        document.getElementById("Hunger").value = 100;
    }

    if (document.getElementById("Boredom").value < 0) {
        document.getElementById("Boredom").value = 0;
    } else if (document.getElementById("Boredom").value > 100) {
        document.getElementById("Boredom").value = 100;
    }

    // Update sliders color and value
    const updateSliderColor = (slider) => {
        const value = parseFloat(slider.value);
        const max = parseFloat(slider.max);
        const percentage = (value / max) * 100;

        slider.style.setProperty('--value', `${percentage}%`);
        slider.style.background = `linear-gradient(to right, #555 0%, #555 ${percentage}%, #d3d3d3 ${percentage}%, #d3d3d3 100%)`;
    };

    sliders.forEach(slider => {
        updateSliderColor(slider);
        slider.disabled = true;
    });
}

// Update image according to happiness level
function updateMood() {
    if (document.getElementById("Happiness").value < 50) {
        document.getElementById("happy").src = "Icons/Sad.png"
    } else {
        document.getElementById("happy").src = "Icons/Happy.png"
    }
}

let foodIsRunning = false;
let eatingCounter = 0;

function buttonA() {
    if (foodIsRunning) return;
    if (document.getElementById("Happiness").value <= 0) return;

    // Increase boredom by 50% if eatingCounter > 2
    eatingCounter = eatingCounter + 1;
    if (eatingCounter > 2) {
        let newBoredom = Number(document.getElementById("Boredom").value) + 50;
        document.getElementById("Boredom").value = newBoredom;
        updateAllSliders();
    }

    // Eating animation
    let index = 150;
    foodIsRunning = true;

    const interval = setInterval(() => { // Reduce opacity with 1% every 7th ms
        document.getElementById("eatingApple").style.opacity = index / 100;

        index--;

        if (index <= -50) {
            clearInterval(interval);
            foodIsRunning = false;
        }
    }, 7);

    // Decrase happiness by 10% when eating
    let newHappiness = Number(document.getElementById("Happiness").value) - 10;
    document.getElementById("Happiness").value = newHappiness;
    updateAllSliders();

    // Decrase hunger by eating
    let foodIcons = document.getElementById("apple")
    if (document.getElementById("Hunger").value <= 0) {
        return
    }

    if (foodIcons.src.includes("Icons/apple.png")) {
        let newHunger = Number(document.getElementById("Hunger").value) - 10;
        document.getElementById("Hunger").value = newHunger;
        // console.log(newHunger);
        updateAllSliders();

    } else if (foodIcons.src.includes("Icons/cookie.png")) {
        let newHunger = Number(document.getElementById("Hunger").value) - 20;
        document.getElementById("Hunger").value = newHunger;
        // console.log(newHunger);
        updateAllSliders();

    } else if (foodIcons.src.includes("Icons/sandwich.png")) {
        let newHunger = Number(document.getElementById("Hunger").value) - 40;
        document.getElementById("Hunger").value = newHunger;
        // console.log(newHunger);
        updateAllSliders();

    }
    
    updateMood();

}

let playingCounter = 0;
let playIsRunning = false;

function buttonB() {
    if (playIsRunning) return;

    eatingCounter = 0; // Reset eating counter
    playingCounter = playingCounter + 1;

    if (playingCounter > 3) {
        let newHappiness = Number(document.getElementById("Happiness").value) + 20;
        document.getElementById("Happiness").value = newHappiness;
    } else {
        let newHappiness = Number(document.getElementById("Happiness").value) + 5;
        document.getElementById("Happiness").value = newHappiness;
    }

    let newHunger = Number(document.getElementById("Hunger").value) + 10;
    document.getElementById("Hunger").value = newHunger;

    let newBoredom = Number(document.getElementById("Boredom").value) - 10;
    document.getElementById("Boredom").value = newBoredom;

    updateAllSliders();

    // Show playing image for 1500ms
    let index = 100;
    playIsRunning = true;
    const interval = setInterval(() => {
        document.getElementById("happy").src = "Icons/Playing.png";

        index--;

        if (index <= 0) {
            clearInterval(interval);
            playIsRunning = false;
            updateMood();
        }
    }, 15);
}

// Select food
function buttonC() {
    let foodIcons = document.getElementById("apple")
    if (foodIcons.src.includes("Icons/apple.png")) {
        document.getElementById("apple").src = "Icons/cookie.png"
        document.getElementById("eatingApple").src = "Icons/cookie.png"
    } else if (foodIcons.src.includes("Icons/cookie.png")) {
        document.getElementById("apple").src = "Icons/sandwich.png"
        document.getElementById("eatingApple").src = "Icons/sandwich.png"
    } else {
        document.getElementById("apple").src = "Icons/apple.png"
        document.getElementById("eatingApple").src = "Icons/apple.png"
    }
}

// Test slider values
function testValues() {
    console.log("Happiness: " + document.getElementById("Happiness").value);
    console.log("Hunger: " + document.getElementById("Hunger").value);
    console.log("Boredom: " + document.getElementById("Boredom").value);
    console.log("Eating Counter: " + eatingCounter);
    console.log("Playing Counter: " + playingCounter);
}