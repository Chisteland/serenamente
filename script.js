const circle = document.querySelector('.circle');
const startButton = document.getElementById('startButton');
const instruction = document.getElementById('instruction');

let isBreathing = false;
let breathInterval;
let inhaleCount = 0;
let specialMessageShown = false;
let finalMessageShown = false;

function startBreathing() {
    if (isBreathing) {
        clearInterval(breathInterval);
        startButton.textContent = 'Começar Respiração Guiada';
        instruction.textContent = 'Clique no botão para começar.';
        circle.style.transform = 'scale(1)';
        isBreathing = false;
        inhaleCount = 0;
        specialMessageShown = false;
        finalMessageShown = false;
    } else {
        startButton.textContent = 'Parar Respiração Guiada';
        isBreathing = true;

        let scale = 1;
        let isInhaling = true;
        const inhaleDuration = 5000; // 5 seconds
        const exhaleDuration = 3000; // 3 seconds
        const intervalDuration = 100; // 0.1 second

        breathInterval = setInterval(() => {
            if (isInhaling) {
                scale += (1.2 - 1) / (inhaleDuration / intervalDuration);
                if (scale >= 1.2) {
                    isInhaling = false;
                    inhaleCount++;
                    if (inhaleCount === 3 && !specialMessageShown) {
                        instruction.textContent = 'Você pode sentir a pressão reajustando? Estamos recentralizando você, não se preocupe!';
                        specialMessageShown = true;
                    } else if (inhaleCount === 5 && !finalMessageShown) {
                        displayFinalMessage();
                        finalMessageShown = true;
                    } else if (!specialMessageShown && !finalMessageShown) {
                        instruction.textContent = 'Expire...';
                    }
                }
            } else {
                scale -= (1.2 - 1) / (exhaleDuration / intervalDuration);
                if (scale <= 1) {
                    isInhaling = true;
                    if (inhaleCount === 3 && specialMessageShown) {
                        instruction.textContent = 'Você pode sentir a pressão reajustando? Estamos recentralizando você, não se preocupe!';
                    } else if (!finalMessageShown) {
                        instruction.textContent = 'Inspire...';
                    }
                }
            }
            circle.style.transform = `scale(${scale})`;
        }, intervalDuration);
    }
}

function displayFinalMessage() {
    const messages = [
        { text: 'Você se sente melhor?', delay: 2500 },
        { text: 'Você parece novo em folha pra recomeçar.', delay: 2500 },
        { text: 'Lembre-se!', delay: 1500 },
        { text: 'Vc pode usar este método mesmo sem a gente', delay: 2500 },
        { text: 'pois nossa maior preocupação...', delay: 2500 },
        { text: 'é sua saúde!', delay: 2500 },
        { text: 'Atenciosamente', delay: 1500 },
        { text: 'equipe Serenamente.', delay: 0 } // Última mensagem, sem delay adicional
    ];

    let messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            const message = messages[messageIndex];
            instruction.textContent = '';
            let charIndex = 0;

            function typeLetter() {
                if (charIndex < message.text.length) {
                    instruction.textContent += message.text[charIndex];
                    charIndex++;
                    setTimeout(typeLetter, 50); // Intervalo de tempo entre cada letra (em milissegundos)
                } else {
                    messageIndex++;
                    if (messageIndex < messages.length) {
                        setTimeout(showNextMessage, message.delay);
                    }
                }
            }
            typeLetter();
        }
    }

    showNextMessage();
}

startButton.addEventListener('click', startBreathing);