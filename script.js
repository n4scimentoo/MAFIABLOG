// Preloader    
    document.getElementById('preloader-btn').onclick = function() {
        // Inicia o fade out
        document.getElementById('preloader').style.opacity = '0';// Animação de fade out
        setTimeout(function() {
            // Após a animação, esconde o preloader
            document.getElementById('preloader').style.display = 'none'; // Esconde o preloader
            document.body.style.overflow = '';// Restaura o overflow do body
        }, 300); // 2000 ms = 2 segundos
    };
    document.body.style.overflow = 'hidden';


    function fadeIn(audio, targetVolume = 1, duration = 1500) {
        audio.volume = 0;
        audio.currentTime = 10; // Inicia a partir de 10 segundos, ajuste se quiser
        audio.play();
        const step = 0.05;
        const interval = duration / (targetVolume / step);
        let vol = 0;
        const fade = setInterval(() => {
            vol += step;
            if (vol >= targetVolume) {
                audio.volume = targetVolume;
                clearInterval(fade);
            } else {
                audio.volume = vol;
            }
        }, interval);
    }

    function fadeOut(audio, targetVolume = 0, duration = 1500) {
        const startVolume = audio.volume;
        const step = 0.05;
        const interval = duration / (startVolume / step);
        let vol = startVolume;
        const fade = setInterval(() => {
            vol -= step;
            if (vol <= targetVolume) {
                audio.volume = targetVolume;
                audio.pause(); // Pausa o áudio ao final
                clearInterval(fade);
            } else {
                audio.volume = vol;
            }
        }, interval);
    }

    document.querySelectorAll('#large-grid > #main').forEach(div => {
        let audio = null; 

        div.addEventListener('mouseenter', () => {
            const audioSrc = div.getAttribute('data-audio');
            if (!audioSrc) return; 
            // Se já existe um áudio tocando, pare
            if (audio) {
                audio.pause();
                audio.volume = 0; // Zera o volume para evitar sobreposição
                audio.currentTime = 0;
            }
            audio = new Audio(audioSrc);
            div._audio = audio;
            fadeIn(div._audio, 1, 500); // 1 = volume final, 500 = duração em ms 
        });
        div.addEventListener('mouseleave', () => {
            if(div._audio) {
                fadeOut(div._audio, 0, 500); // 0 = volume final, 500 = duração em ms
            }
        });
    }); 
        