document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sdaForm');
    const numGiocatoriInput = document.getElementById('numGiocatori');
    const giocatoriContainer = document.getElementById('giocatoriContainer');
    const risultatiSection = document.getElementById('risultati');
    const distribuzioneDiv = document.getElementById('distribuzione');

    numGiocatoriInput.addEventListener('input', () => {
        const numGiocatori = numGiocatoriInput.value;
        giocatoriContainer.innerHTML = '';
        for (let i = 0; i < numGiocatori; i++) {
            const giocatoreDiv = document.createElement('div');
            giocatoreDiv.classList.add('giocatore');
            giocatoreDiv.innerHTML = `
                <label for="giocatore${i}Nome">Nome Giocatore ${i + 1}:</label>
                <input type="text" id="giocatore${i}Nome" name="giocatore${i}Nome" required>
                <label for="giocatore${i}Proprieta">Proprietà da Inserire:</label>
                <input type="text" id="giocatore${i}Proprieta" name="giocatore${i}Proprieta" required>
            `;
            giocatoriContainer.appendChild(giocatoreDiv);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const numGiocatori = numGiocatoriInput.value;
        const giocatori = [];
        for (let i = 0; i < numGiocatori; i++) {
            const nome = document.getElementById(`giocatore${i}Nome`).value;
            const proprieta = document.getElementById(`giocatore${i}Proprieta`).value;
            giocatori.push({ nome, proprieta });
        }

        // Riassegna le proprietà
        const proprietaInserite = giocatori.map(g => g.proprieta);
        const proprietaRiassegnate = [...proprietaInserite];
        while (proprietaRiassegnate.some((prop, index) => prop === giocatori[index].proprieta)) {
            proprietaRiassegnate.sort(() => Math.random() - 0.5);
        }

        // Mostra i risultati
        distribuzioneDiv.innerHTML = '';
        giocatori.forEach((giocatore, index) => {
            const risultatoDiv = document.createElement('div');
            risultatoDiv.innerHTML = `<p>${giocatore.nome} riceve la proprietà: ${proprietaRiassegnate[index]}</p>`;
            distribuzioneDiv.appendChild(risultatoDiv);
        });
        risultatiSection.style.display = 'block';
    });
});
