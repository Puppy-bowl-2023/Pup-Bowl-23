const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2305-FTB-ET-WEB-PT`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        // console.log(result)
        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};


const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const result = await response.json();
        const playerElement = player.createElement("div");
        playerElement.classList.add("playerId")
        playerElement.innerHTML = `<h4>${playerId.name}</h4> <p>${playerId.instructions}</p>`;
        playerContainer.appendChild(playerElement);
        if (result.error) throw result.error;
        console.log(result)
        return result.player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try { 
          const response = await fetch(`${APIURL}/players`, {
            method: "POST",
            body: JSON.stringify(playerObj),
            headers: {
                "Content-Type": "application/json",
            }
          })
          const player = await response.json();
          console.log(player);
          fetchAllPlayers();
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/players/${playerId}`); {
            method: "DELETE"
        };
        const player = await response.json();
        fetchAllPlayers()
        //reload window
        window.location.reload()
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        if (!playerList || playerList.length === 0) {
            playerContainer.innerHTML = "<h3>no players found</h3>"
            return
        }
        playerContainer.innerHTML = ""
        playerList.map((player) => {
            const playerElement = document.createElement("div")
            playerElement.classList.add("player-card")
            playerElement.innerHTML = `
            <p>${player.name}</p>
            <p>${player.breed}</p>
            <p>${player.status}</p>
            <img src="${player.imgaeURL}" alt="${player.name}">
            <button class="delete-button" data-id="${player.id}">Delete</button>
            <button class="detail-button" data-id="${player.id}">Details</button>
            `;

            playerContainer.appendChild(playerElement)
            let deleteButtons = [...document.getElementsByClassName('delete-button')];
            deleteButtons.forEach(button => {
                button.addEventListener("click", async () => {
                    const player = await fetchSinglePlayer(button.dataset.id);
                    renderSinglePlayer(player);
                })
            })
                removePlayer(player.Id)
            })
            let detailButtons = [...document.getElementsByClassName('detail-button')];
            detailButtons.forEach(button => {
            button.addEventListener('click', async () => {
            const player = await fetchSinglePlayer(button.dataset.id);
            renderSinglePlayer(player);
        });
    });
            
          


    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    };
};



//  * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
//  * fetches all players from the database, and renders them to the DOM.
 
 const renderNewPlayerForm = () => {
     try {
         const form = document.getElementById("new-player-form");
         form.addEventListener("submit", async (event) => {
             event.preventDefault();
             const playerName = form.querySelector("#player-name").value;
             const playerBreed = form.querySelector("#player-breed").value;
             const playerAge = form.querySelector("#player-age").value;
             const playerPosition = form.querySelector("#player-position").value;
             const playerTeam = form.querySelector("#player-team").value;
             const playerObj = {
                 name: playerName,
                 breed: playerBreed,
                 age: playerAge, 
                 position: playerPosition,
                 team: playerTeam,
             }
         });
     } catch (err) {
         console.error('Uh oh, trouble rendering the new player form!', err);
     };
 };

const init = async () => {
    
    const players = await fetchAllPlayers();
    // console.log(players)
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();