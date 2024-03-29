// DOM Elements
const friendCountText = document.getElementById('friendCountText');
const friendCountDisplay = document.getElementById('friendCount');
const randomizeBtn = document.getElementById('randomizeBtn');
const confirmBtn = document.getElementById('confirmBtn');
const friendsInput = document.getElementById('friendsInput');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const outputDiv = document.getElementById('output');

// Event Listeners
randomizeBtn.addEventListener('click', handleRandomize);
confirmBtn.addEventListener('click', handleConfirm);
calculateBtn.addEventListener('click', handleCalculate);
resetBtn.addEventListener('click', handleReset);

// Functions
function handleRandomize() {
    // Clear previous inputs
    friendsInput.innerHTML = '';
    
    // Generate random number of friends (1-9)
    const randomFriendCount = Math.floor(Math.random() * 9) + 1;
    
    // Display the random number of friends
    friendCountDisplay.textContent = randomFriendCount;
    friendCountText.style.display = 'inline';

    // Enable confirm button
    confirmBtn.disabled = false;
}

function handleConfirm() {
    // Get the confirmed number of friends
    const confirmedFriendCount = parseInt(friendCountDisplay.textContent);
    
    // Generate input fields for each friend
    for (let i = 0; i < confirmedFriendCount; i++) {
        const friendDiv = document.createElement('div');
        friendDiv.classList.add('friendInput');
        friendDiv.innerHTML = `
            <label for="friendName${i}">Friend ${i + 1} Name:</label>
            <input type="text" id="friendName${i}" required>
            <label for="friendAge${i}">Age:</label>
            <input type="number" id="friendAge${i}" min="1" required>
        `;
        friendsInput.appendChild(friendDiv);
    }

    // Disable confirm button after confirming
    confirmBtn.disabled = true;
}

function handleCalculate() {
    // Get all friend inputs
    const friendInputs = document.querySelectorAll('.friendInput');
    const friendData = [];

    // Loop through each input to collect friend data
    friendInputs.forEach(friendInput => {
        const nameInput = friendInput.querySelector('input[type="text"]');
        const ageInput = friendInput.querySelector('input[type="number"]');
        friendData.push({
            name: nameInput.value.trim(),
            age: parseInt(ageInput.value)
        });
    });

    // Check if all friends' data is provided
    const allDataProvided = friendData.every(friend => friend.name && friend.age);

    // If data is incomplete, show an alert and stop calculation
    if (!allDataProvided) {
        alert('Please provide name and age for all friends.');
        return;
    }

    // Perform calculations
    const totalAge = friendData.reduce((acc, curr) => acc + curr.age, 0);
    const averageAge = totalAge / friendData.length;
    const minAgeFriend = friendData.reduce((min, curr) => curr.age < min.age ? curr : min, friendData[0]);
    const maxAgeFriend = friendData.reduce((max, curr) => curr.age > max.age ? curr : max, friendData[0]);

    // Display results
    outputDiv.innerHTML = `
        <div class="outputItem">Total Age of Friends: ${totalAge}</div>
        <div class="outputItem">Average Age of Friends: ${averageAge.toFixed(2)}</div>
        <div class="outputItem">Youngest Friend: ${minAgeFriend.name} (${minAgeFriend.age} years old)</div>
        <div class="outputItem">Oldest Friend: ${maxAgeFriend.name} (${maxAgeFriend.age} years old)</div>
    `;
}

function handleCalculate() {
    // Get all friend inputs
    const friendInputs = document.querySelectorAll('.friendInput');
    const friendData = [];

    // Loop through each input to collect friend data
    friendInputs.forEach(friendInput => {
        const nameInput = friendInput.querySelector('input[type="text"]');
        const ageInput = friendInput.querySelector('input[type="number"]');
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);

        // Display friend name and age
        friendData.push({ name, age });
        friendInput.innerHTML += `<div>Friend: ${name}, Age: ${age}</div>`;
    });

    // Check if all friends' data is provided
    const allDataProvided = friendData.every(friend => friend.name && friend.age);

    // If data is incomplete, show an alert and stop calculation
    if (!allDataProvided) {
        alert('Please provide name and age for all friends.');
        return;
    }

    // Perform calculations
    const totalAge = friendData.reduce((acc, curr) => acc + curr.age, 0);
    const averageAge = totalAge / friendData.length;
    const minAgeFriend = friendData.reduce((min, curr) => curr.age < min.age ? curr : min, friendData[0]);
    const maxAgeFriend = friendData.reduce((max, curr) => curr.age > max.age ? curr : max, friendData[0]);

    // Display results
    outputDiv.innerHTML = `
        <div class="outputItem">Total Age of Friends: ${totalAge}</div>
        <div class="outputItem">Average Age of Friends: ${averageAge.toFixed(2)}</div>
        <div class="outputItem">Youngest Friend: ${minAgeFriend.name} (${minAgeFriend.age} years old)</div>
        <div class="outputItem">Oldest Friend: ${maxAgeFriend.name} (${maxAgeFriend.age} years old)</div>
    `;
}

function handleReset() {
    // Clear all inputs and output
    friendCountText.style.display = 'none'; 
    friendCountDisplay.textContent = ''; 
    friendsInput.innerHTML = ''; 
    outputDiv.innerHTML = '';
    confirmBtn.disabled = true; 
}
