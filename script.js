// script.js

// Variables to track user stats
let player = {
    health: 100,
    inventory: []
  };
  
  // Define the story structure with steps and variable effects
  const story = {
    start: {
      text: "You wake up in a dark forest. There are two paths ahead. Which one will you take?",
      choices: [
        { text: "Take the left path", next: "leftPath" },
        { text: "Take the right path", next: "rightPath" }
      ],
      background: "forest-bg.jpg"
    },
    leftPath: {
      text: "You encounter a friendly traveler who offers you a health potion. Do you accept it?",
      choices: [
        { text: "Yes, take the potion", next: "acceptPotion", effect: () => (player.health += 20) },
        { text: "No, refuse the potion", next: "refusePotion" }
      ],
      background: "village-bg.jpg"
    },
    rightPath: {
      text: "You come across a river with a broken bridge. What will you do?",
      choices: [
        { text: "Try to swim across", next: "swim", effect: () => (player.health -= 30) },
        { text: "Search for another way", next: "search" }
      ],
      background: "river-bg.jpg"
    },
    acceptPotion: {
      text: "You feel rejuvenated! The traveler also gives you a map. Do you follow the map or explore on your own?",
      choices: [
        { text: "Follow the map", next: "mapPath", effect: () => player.inventory.push("map") },
        { text: "Explore on your own", next: "exploreAlone" }
      ],
      background: "camp-bg.jpg"
    },
    refusePotion: {
      text: "The traveler shrugs and leaves. You feel a bit uneasy but continue on your way.",
      choices: [
        { text: "Head deeper into the forest", next: "deeperForest" },
        { text: "Return to the start", next: "start" }
      ],
      background: "forest-bg.jpg"
    },
    swim: {
      text: "You swim across but lose some health. On the other side, you find a treasure chest. Open it?",
      choices: [
        { text: "Yes, open it", next: "treasure", effect: () => player.inventory.push("gold") },
        { text: "No, leave it", next: "leaveTreasure" }
      ],
      background: "river-bg.jpg"
    },
    search: {
      text: "You find a safer way around but it takes longer. You arrive at a strange cave. Enter the cave?",
      choices: [
        { text: "Yes, enter the cave", next: "cave" },
        { text: "No, stay outside", next: "outsideCave" }
      ],
      background: "cave-bg.jpg"
    },
    treasure: {
      text: "The chest contains gold! You feel accomplished.",
      choices: [],
      background: "treasure-bg.jpg"
    },
    leaveTreasure: {
      text: "You leave the chest and continue your journey. However, you feel like you missed an opportunity.",
      choices: [],
      background: "forest-bg.jpg"
    },
    cave: {
      text: "Inside the cave, you find an ancient sword. Take it?",
      choices: [
        { text: "Yes, take the sword", next: "swordPath", effect: () => player.inventory.push("sword") },
        { text: "No, leave it", next: "leaveCave" }
      ],
      background: "cave-bg.jpg"
    },
    outsideCave: {
      text: "You stay outside and eventually find a way out of the forest. You win!",
      choices: [],
      background: "victory-bg.jpg"
    },
    swordPath: {
      text: "With the sword in hand, you face your destiny and become a hero! You win!",
      choices: [],
      background: "victory-bg.jpg"
    },
    leaveCave: {
      text: "You leave the cave and continue your journey. You eventually find safety. You win!",
      choices: [],
      background: "victory-bg.jpg"
    }
  };
  
  // Reference to HTML elements
  const storyText = document.getElementById("story-text");
  const choicesContainer = document.getElementById("choices-container");
  
  // Update player stats on screen
  function updateStats() {
    const statsContainer = document.getElementById("stats");
    statsContainer.innerHTML = `
      <p><strong>Health:</strong> ${player.health}</p>
      <p><strong>Inventory:</strong> ${player.inventory.join(", ") || "None"}</p>
    `;
  }
  
  // Change background image
  function updateBackground(background) {
    document.body.style.backgroundImage = `url(${background})`;
  }
  
  // Start the game
  let currentStep = "start";
  function updateStory(step) {
    currentStep = step;
    const scene = story[step];
  
    // Update story text
    storyText.textContent = scene.text;
  
    // Update background
    updateBackground(scene.background);
  
    // Clear previous choices
    choicesContainer.innerHTML = "";
  
    // Update stats
    updateStats();
  
    // Display choices
    scene.choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.onclick = () => {
        if (choice.effect) choice.effect(); // Apply choice effect if it exists
        updateStory(choice.next);
      };
      choicesContainer.appendChild(button);
    });
  }
  
  // Initialize the game
  updateStory(currentStep);
  