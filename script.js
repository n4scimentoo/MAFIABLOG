// Preloader    
    document.getElementById('preloader-btn').onclick = function() {// Define a função para o botão de preloader
        // Inicia o fade out
        document.getElementById('preloader').style.opacity = '0';// Animação de fade out
        setTimeout(function() {
            // Após a animação, esconde o preloader
            document.getElementById('preloader').style.display = 'none'; // Esconde o preloader
            document.body.style.overflow = '';// Restaura o overflow do body
        }, 300); // 300 ms = 3 segundos
    };
    document.body.style.overflow = 'hidden';// Desabilita o scroll do body enquanto o preloader está visível


    function fadeIn(audio, targetVolume = 1, duration = 1500) {// Função para fade in do áudio
        audio.volume = 0;// Inicia com volume 0
        audio.currentTime = 10; // Inicia a partir de 10 segundos, ajuste se quiser
        audio.play();// Inicia a reprodução do áudio
        const step = 0.05;// Define o passo de volume
        const interval = duration / (targetVolume / step);// Calcula o intervalo de tempo para cada passo
        let vol = 0;// Volume inicial
        const fade = setInterval(() => {// Função para aumentar o volume gradualmente
            vol += step;// Aumenta o volume
            if (vol >= targetVolume) {// Verifica se o volume atingiu o alvo
                audio.volume = targetVolume;// Define o volume final
                clearInterval(fade);// Limpa o intervalo
            } else {
                audio.volume = vol;// Define o volume atual
            }
        }, interval);// Define o intervalo de tempo para cada passo
    }

    function fadeOut(audio, targetVolume = 0, duration = 1500) {// Função para fade out do áudio
        const startVolume = audio.volume;// Obtém o volume atual do áudio
        const step = 0.05;// Define o passo de volume
        const interval = duration / (startVolume / step);// Calcula o intervalo de tempo para cada passo
        let vol = startVolume;// Volume inicial
        const fade = setInterval(() => {// Função para diminuir o volume gradualmente
            vol -= step;// Diminui o volume
            if (vol <= targetVolume) {// Verifica se o volume atingiu o alvo
                audio.volume = targetVolume;// Define o volume final
                audio.pause(); // Pausa o áudio ao final//  
                clearInterval(fade);// Limpa o intervalo
            } else {
                audio.volume = vol;//   
            }
        }, interval);// Define o intervalo de tempo para cada passo
    }

    document.querySelectorAll('#large-grid > #main').forEach(div => {// Seleciona todos os divs dentro de #large-grid > #main
        let audio = null; // Variável para armazenar o áudio atual

        div.addEventListener('mouseenter', () => {// Adiciona um evento de mouseenter
            const audioSrc = div.getAttribute('data-audio');// Obtém o atributo data-audio do div
            if (!audioSrc) return; // Se não houver áudio definido, não faz nada
            // Se já existe um áudio tocando, pare
            if (audio) {
                audio.pause();// Pausa o áudio atual
                audio.volume = 0; // Zera o volume para evitar sobreposição
                audio.currentTime = 0;// Reseta o tempo do áudio atual
            }
            audio = new Audio(audioSrc);// Cria um novo objeto de áudio com a fonte do atributo data-audio
            div._audio = audio;// Armazena o áudio no div para referência futura
            fadeIn(div._audio, 1, 500); // 1 = volume final, 500 = duração em ms 
        });
        div.addEventListener('mouseleave', () => {// Adiciona um evento de mouseleave
            if(div._audio) {// Verifica se o áudio está definido no div
                fadeOut(div._audio, 0, 500); // 0 = volume final, 500 = duração em ms
            }
        });
    }); 
        