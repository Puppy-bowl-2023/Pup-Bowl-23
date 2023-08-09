// const playerContainer = document.getElementById('all-players-container');
// const newPlayerFormContainer = document.getElementById('new-player-form');
// // Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
// const cohortName = '2305-FTB-ET-WEB-PT';
// // Use the APIURL variable for fetch requests
// const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
// /**
//  * It fetches all players from the API and returns them
//  * @returns An array of objects.
//  */
// const fetchAllPlayers = async () => {
//     try {
//       const response = await fetch(
//         `${APIURL}players`
//       );
//       const result = await response.json();
//       return result?.data?.players;
//     } catch (err) {
//         console.error('Uh oh, trouble fetching players!', err);
//     }
// };
// const fetchSinglePlayer = async (playerId) => {
//     try {
//       const response = await fetch(
//         `${APIURL}players/${playerId}`
//       );
//       const result = await response.json();
//       return result?.data?.player;
//     } catch (err) {
//         console.error(`Oh no, trouble fetching player #${playerId}!`, err);
//     }
// };
// const addNewPlayer = async (playerObj) => {
//   // if(!['bench', 'field'].includes(playerObj.status)) {
//   //   playerObj.status = 'bench';
//   // }
//     try {
//       const response = await fetch(
//         `${APIURL}players`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name: playerObj.name,
//             breed: playerObj.breed,
//             status: playerObj.status,
//             imageUrl: playerObj.imageUrl
//           }),
//         }
//       );
//       const result = await response.json();
//       return result.data.newPlayer;
//     } catch (err) {
//         console.error('Oops, something went wrong with adding that player!', err);
//     }
// };
// const removePlayer = async (playerId) => {
//     try {
//       const response = await fetch(
//         `${APIURL}players/${playerId}`,
//         {
//           method: 'DELETE',
//         }
//       );
//       const result = await response.json();
//       return result;
//     } catch (err) {
//         console.error(
//             `Whoops, trouble removing player #${playerId} from the roster!`,
//             err
//         );
//     }
// };
// const seeDetails = async (playerId) => {
//   try {
//     const card = document.querySelector(`[player-id="${playerId}"]`);
//     const hasDetails = card.querySelector('.details');
//     if (card && !hasDetails) {
//       const player = await fetchSinglePlayer(playerId);
//       const details = document.createElement('div');
//       details.classList.add('details');
//       if (player.team?.name) {
//         const teamName = document.createElement('h4');
//         teamName.innerText = `Team: ${player.team.name}`;
//         details.appendChild(teamName);
//         if(player.team?.players?.length) {
//           const teamListContainer = document.createElement('ul');
//           player.team.players.forEach(p => {
//             const teamListItem = document.createElement('li');
//             teamListItem.innerText = p.name;
//             teamListContainer.appendChild(teamListItem);
//           });
//           details.appendChild(teamListContainer);
//         }
//       } else {
//         details.innerText = 'No additional details';
//       }
//       card.appendChild(details);
//     }
//   } catch (err) {
//     console.error(
//       `Whoops, trouble finding player #${playerId} on the roster!`,
//       err
//     );
//   }
// }
// const removePlayerCard = async (playerId) => {
//   const card = document.querySelector(`[player-id="${playerId}"]`);
//   if (card) {
//     const result = await removePlayer(playerId);
//     if (result?.success) {
//       card.parentNode.removeChild(card);
//     }
//   }
// }
// /**
//  * It takes an array of player objects, loops through them, and creates a string of HTML for each
//  * player, then adds that string to a larger string of HTML that represents all the players.
//  *
//  * Then it takes that larger string of HTML and adds it to the DOM.
//  *
//  * It also adds event listeners to the buttons in each player card.
//  *
//  * The event listeners are for the "See details" and "Remove from roster" buttons.
//  *
//  * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
//  * API to get the details for a single player.
//  *
//  * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
//  * the API to remove a player from the roster.
//  *
//  * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
//  * @param playerList - an array of player objects
//  * @returns the playerContainerHTML variable.
//  */
// const renderAllPlayers = (playerList) => {
//     try {
//          playerList.forEach(player => {
//           renderNewPlayerCard(player);
//         });
//     } catch (err) {
//         console.error('Uh oh, trouble rendering players!', err);
//     }
// };
// const renderNewPlayerCard = (player) => {
//   const card = document.createElement('div');
//   const title = document.createElement('h3');
//   const breed = document.createElement('span');
//   const status = document.createElement('span');
//   const image = document.createElement('img');
//   const actions = document.createElement('div');
//   const detailButton = document.createElement('button');
//   const removeButton = document.createElement('button');
//   card.classList.add('card');
//   card.setAttribute('player-id', player.id)
//   title.innerText = player.name;
//   breed.innerText = player.breed;
//   status.innerText = player.status;
//   status.classList.add('status-tag');
//   status.classList.add(player.status);
//   image.src = player.imageUrl;
//   image.alt = player.breed;
//   actions.classList.add('actions');
//   detailButton.classList.add('primary');
//   detailButton.innerText = 'See Details';
//   detailButton.addEventListener('click', () => {
//     seeDetails(player.id)
//   }, true);
//   removeButton.addEventListener('click', async () => {
//     const confirmation = confirm(`Are you sure you want to remove ${player.name}?`);
//     if (confirmation) {
//       removePlayerCard(player.id);
//     }
//   });
//   removeButton.innerText = 'Remove from roster';
//   actions.appendChild(detailButton);
//   actions.appendChild(removeButton);
//   card.appendChild(title);
//   card.appendChild(breed);
//   card.appendChild(status);
//   card.appendChild(image);
//   card.appendChild(actions);
//   playerContainer.appendChild(card);
// }
// /**
//  * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
//  * fetches all players from the database, and renders them to the DOM.
//  */
// const renderNewPlayerForm = () => {
//     try {
//         const form = document.createElement('form');
//         const properties = ['name', 'breed', 'status', 'imageUrl'];
//         properties.forEach(property => {
//           const formRow = document.createElement('div');
//           const label = document.createElement('label');
//           formRow.classList.add('form-row');
//           label.innerText = property;
//           label.setAttribute('for', property);
//           formRow.appendChild(label);
//           if (property !== 'status') {
//             const input = document.createElement('input');
//             input.name = property;
//             input.type = 'text';
//             formRow.appendChild(input);
//           } else {
//             const select = document.createElement('select');
//             select.name = property;
//             const fieldOption = document.createElement('option');
//             fieldOption.value = 'field';
//             fieldOption.innerText = 'Field';
//             const benchOption = document.createElement('option');
//             benchOption.value = 'bench';
//             benchOption.innerText = 'Bench';
//             select.appendChild(fieldOption);
//             select.appendChild(benchOption);
//             formRow.appendChild(select);
//           }
//           form.appendChild(formRow);
//         });
//         const submitFormRow = document.createElement('div');
//         const submitButton = document.createElement('input');
//         submitFormRow.classList.add('form-row');
//         submitButton.type = 'submit';
//         submitButton.classList.add('primary');
//         submitButton.value = 'Add Player';
//         submitFormRow.appendChild(submitButton);
//         form.appendChild(submitFormRow);
//         form.addEventListener('submit', async (submitEvent) => {
//           submitEvent.preventDefault();
//           console.log('form submitted');
//           const formData = new FormData(submitEvent.target);
//           const player = {
//             name: formData.get('name'),
//             breed: formData.get('breed'),
//             status: formData.get('status'),
//             imageUrl: formData.get('imageUrl')
//           }
//           const result = await addNewPlayer(player);
//           renderNewPlayerCard(result);
//         })
//         newPlayerFormContainer.appendChild(form);
//     } catch (err) {
//         console.error('Uh oh, trouble rendering the new player form!', err);
//     }
// }
// const init = async () => {
//     const players = await fetchAllPlayers();
//     renderAllPlayers(players);
//     renderNewPlayerForm();
// }
// init();const playerContainer = document.getElementById('all-players-container');
// const newPlayerFormContainer = document.getElementById('new-player-form');


const newPlayerFormContainer = document.getElementById('new-player-form');
const playerContainer = document.getElementById('all-players-container');
// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-FTB-ET-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
      const response = await fetch(
        `${APIURL}players`
      );
      const result = await response.json();
      return result?.data?.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(
        `${APIURL}players/${playerId}`
      );
      const result = await response.json();
      return result?.data?.player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
  // if(!['bench', 'field'].includes(playerObj.status)) {
  //   playerObj.status = 'bench';
  // }
    try {
      const response = await fetch(
        `${APIURL}players`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playerObj.name,
            breed: playerObj.breed,
            status: playerObj.status,
            imageUrl: playerObj.imageUrl
          }),
        }
      );
      const result = await response.json();
      return result.data.newPlayer;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
      const response = await fetch(
        `${APIURL}players/${playerId}`,
        {
          method: 'DELETE',
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

const seeDetails = async (playerId) => {
  try {
    const card = document.querySelector(`[player-id="${playerId}"]`);
    const hasDetails = card.querySelector('.details');
    if (card && !hasDetails) {
      const player = await fetchSinglePlayer(playerId);
      const details = document.createElement('div');
      
      details.classList.add('details');
      if (player.team?.name) {
        const teamName = document.createElement('h4');

        teamName.innerText = `Team: ${player.team.name}`;
        details.appendChild(teamName);

        if(player.team?.players?.length) {
          const teamListContainer = document.createElement('ul');
          player.team.players.forEach(p => {
            const teamListItem = document.createElement('li');
            teamListItem.innerText = p.name;
            teamListContainer.appendChild(teamListItem);
          });
          details.appendChild(teamListContainer);
        }
      } else {
        details.innerText = 'No additional details';
      }
      card.appendChild(details);
    }
  } catch (err) {
    console.error(
      `Whoops, trouble finding player #${playerId} on the roster!`,
      err
    );
  }
}

const removePlayerCard = async (playerId) => {
  const card = document.querySelector(`[player-id="${playerId}"]`);
  if (card) {
    const result = await removePlayer(playerId);
    if (result?.success) {
      card.parentNode.removeChild(card);
    }
  }
}

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
         playerList.forEach(player => {
          renderNewPlayerCard(player);
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

const renderNewPlayerCard = (player) => {
  const card = document.createElement('div');
  const title = document.createElement('h3');
  const breed = document.createElement('span');
  const status = document.createElement('span');
  const image = document.createElement('img');
  const actions = document.createElement('div');
  const detailButton = document.createElement('button');
  const removeButton = document.createElement('button');

  card.classList.add('card');
  card.setAttribute('player-id', player.id)
  title.innerText = player.name;
  breed.innerText = player.breed;
  status.innerText = player.status;
  status.classList.add('status-tag');
  status.classList.add(player.status);
  image.src = player.imageUrl;
  image.alt = player.breed;
  actions.classList.add('actions');
  detailButton.classList.add('primary');
  detailButton.innerText = 'See Details';

  detailButton.addEventListener('click', () => {
    seeDetails(player.id)
  }, true);

  removeButton.addEventListener('click', async () => {
    const confirmation = confirm(`Are you sure you want to remove ${player.name}?`);
    if (confirmation) {
      removePlayerCard(player.id);
    }
  });

  removeButton.innerText = 'Remove from roster';

  actions.appendChild(detailButton);
  actions.appendChild(removeButton);

  card.appendChild(title);
  card.appendChild(breed);
  card.appendChild(status);
  card.appendChild(image);
  card.appendChild(actions);

  playerContainer.appendChild(card);
}


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        const form = document.createElement('form');
        const properties = ['name', 'breed', 'status', 'imageUrl'];
        properties.forEach(property => {
          const formRow = document.createElement('div');
          const label = document.createElement('label');
          
          formRow.classList.add('form-row');
          label.innerText = property;
          label.setAttribute('for', property);

          formRow.appendChild(label);
          

          if (property !== 'status') {
            const input = document.createElement('input');
            input.name = property;
            input.type = 'text';

            formRow.appendChild(input);

          } else {
            const select = document.createElement('select');
            select.name = property;
            const fieldOption = document.createElement('option');
            fieldOption.value = 'field';
            fieldOption.innerText = 'Field';

            const benchOption = document.createElement('option');
            benchOption.value = 'bench';
            benchOption.innerText = 'Bench';

            select.appendChild(fieldOption);
            select.appendChild(benchOption);
            formRow.appendChild(select);
          }

          form.appendChild(formRow);
        });

        const submitFormRow = document.createElement('div');
        const submitButton = document.createElement('input');

        submitFormRow.classList.add('form-row');

        submitButton.type = 'submit';
        submitButton.classList.add('primary');
        submitButton.value = 'Add Player';

        submitFormRow.appendChild(submitButton);

        form.appendChild(submitFormRow);

        form.addEventListener('submit', async (submitEvent) => {
          submitEvent.preventDefault();
          console.log('form submitted');
          const formData = new FormData(submitEvent.target);
          const player = {
            name: formData.get('name'),
            breed: formData.get('breed'),
            status: formData.get('status'),
            imageUrl: formData.get('imageUrl')
          }
          const result = await addNewPlayer(player);
          renderNewPlayerCard(result);
        })

        newPlayerFormContainer.appendChild(form);
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderNewPlayerForm();
}

init();

console.log('hello world')