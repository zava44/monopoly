function generatePlayers() {
    const numPlayers = document.getElementById('numPlayers').value;
    const playersInfo = document.getElementById('playersInfo');
    playersInfo.innerHTML = '';

    for (let i = 1; i <= numPlayers; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');

        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', `playerName${i}`);
        nameLabel.textContent = `Nome del giocatore ${i}:`;
        playerDiv.appendChild(nameLabel);

        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', `playerName${i}`);
        nameInput.setAttribute('name', `playerName${i}`);
        nameInput.required = true;
        playerDiv.appendChild(nameInput);

        const propertyLabel = document.createElement('label');
        propertyLabel.setAttribute('for', `playerProperty${i}`);
        propertyLabel.textContent = `Proprietà di Monopoly da inserire:`;
        playerDiv.appendChild(propertyLabel);

        const propertyInput = document.createElement('input');
        propertyInput.setAttribute('type', 'text');
        propertyInput.setAttribute('id', `playerProperty${i}`);
        propertyInput.setAttribute('name', `playerProperty${i}`);
        propertyInput.required = true;
        playerDiv.appendChild(propertyInput);

        const diceLabel = document.createElement('label');
        diceLabel.setAttribute('for', `playerDice${i}`);
        diceLabel.textContent = `Vuoi lanciare un dado, due dadi o nessun dado?`;
        playerDiv.appendChild(diceLabel);

        const diceSelect = document.createElement('select');
        diceSelect.setAttribute('id', `playerDice${i}`);
        diceSelect.setAttribute('name', `playerDice${i}`);
        const options = ['Nessun dado', 'Un dado', 'Due dadi'];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            diceSelect.appendChild(opt);
        });
        playerDiv.appendChild(diceSelect);

        playersInfo.appendChild(playerDiv);
    }
}

document.getElementById('sdaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const numPlayers = document.getElementById('numPlayers').value;
    const players = [];

    for (let i = 1; i <= numPlayers; i++) {
        const name = document.getElementById(`playerName${i}`).value;
        const property = document.getElementById(`playerProperty${i}`).value;
        const diceChoice = document.getElementById(`playerDice${i}`).value;
        players.push({ name, property, diceChoice });
    }

    const properties = players.map(player => player.property);
    const shuffledProperties = properties.sort(() => Math.random() - 0.5);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Riassegnazione delle Proprietà</h2>';

    players.forEach(player => {
        if (player.diceChoice === 'Un dado' || player.diceChoice === 'Due dadi') {
            const diceRoll = Math.floor(Math.random() * 6) + 1;
            let numProperties = diceRoll <= 3 ? 2 : 3;
            let selectedProperties = [];

            for (let i = 0; i < numProperties; i++) {
                if (shuffledProperties.length > 0) {
                    selectedProperties.push(shuffledProperties.pop());
                }
            }

            if (selectedProperties.length > 0) {
                const chosenProperty = prompt(`${player.name}, hai tirato un ${diceRoll}. Scegli una delle seguenti proprietà: ${selectedProperties.join(', ')}`);
                resultDiv.innerHTML += `<p>${player.name} ha scelto la proprietà: ${chosenProperty}</p>`;

                selectedProperties = selectedProperties.filter(prop => prop !== chosenProperty);
                shuffledProperties.push(...selectedProperties);
            }
        } else {
            const assignedProperty = shuffledProperties.pop();
            resultDiv.innerHTML += `<p>${player.name} riceve la proprietà: ${assignedProperty}</p>`;
        }
    });

    shuffledProperties.forEach((property, index) => {
        const playerIndex = index % numPlayers;
        resultDiv.innerHTML += `<p>${players[playerIndex].name} riceve la proprietà: ${property}</p>`;
    });
});
