    const BTNplay = document.getElementById("BTNplay");
        const dificultades = document.getElementById("dificultades");
        const facil = document.getElementById("facil");
        const normal = document.getElementById("normal");
        const dificil = document.getElementById("dificil");
        const juego = document.getElementById("juego");

        // Mostrar las dificultades al hacer clic en "Play"
        BTNplay.addEventListener("click", function() {
            BTNplay.classList.add("hidden"); // Ocultar el botón "Play"
            dificultades.classList.remove("hidden"); // Mostrar los botones de dificultad
        });

        // Mostrar el contenido del juego y ocultar las dificultades al seleccionar una dificultad
        facil.addEventListener("click", function() {
            dificultades.classList.add("hidden"); // Ocultar los botones de dificultad
            juego.classList.remove("hidden"); // Mostrar el contenido del juego
        });

        normal.addEventListener("click", function() {
            dificultades.classList.add("hidden"); // Ocultar los botones de dificultad
            juego.classList.remove("hidden"); // Mostrar el contenido del juego
        });

        dificil.addEventListener("click", function() {
            dificultades.classList.add("hidden"); // Ocultar los botones de dificultad
            juego.classList.remove("hidden"); // Mostrar el contenido del juego
        });