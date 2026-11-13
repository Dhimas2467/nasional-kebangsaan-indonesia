(function () {
    function pasangTombolBagikan() {
        const backToTop = document.querySelector(".back-to-top");
        if (!backToTop) return;

        const wadah = document.createElement("div");
        wadah.id = "fitur-bagikan";

        const tombol = document.createElement("button");
        tombol.type = "button";
        tombol.textContent = "Bagikan";
        tombol.setAttribute("aria-label", "Bagikan halaman");

        const panel = document.createElement("div");
        panel.id = "panel-bagikan";

        const url = window.location.href;
        const judul = document.title;
        const tautan = encodeURIComponent(url);
        const teks = encodeURIComponent(judul + " " + url);

        panel.innerHTML = `
            <a href="https://wa.me/?text=${teks}" target="_blank" rel="noopener">WhatsApp</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${tautan}" target="_blank" rel="noopener">Facebook</a>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(judul)}&url=${tautan}" target="_blank" rel="noopener">X</a>
            <a href="https://t.me/share/url?url=${tautan}&text=${encodeURIComponent(judul)}" target="_blank" rel="noopener">Telegram</a>
            <button type="button" id="salin-tautan">Salin Tautan</button>
        `;

        const gaya = document.createElement("style");
        gaya.textContent = `
            #fitur-bagikan {
                position: fixed;
                z-index: 9998;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 7px;
                right: 20px;
                bottom: 90px;
                font-family: Arial, sans-serif;
            }

            #fitur-bagikan > button {
                background: #781d26;
                color: #fff;
                border: 1px solid #c9a45c;
                border-radius: 5px;
                padding: 7px 11px;
                font-size: 12px;
                cursor: pointer;
            }

            #panel-bagikan {
                display: none;
                flex-direction: column;
                gap: 4px;
                min-width: 110px;
                padding: 6px;
                background: #fff;
                border: 1px solid #c9a45c;
                border-radius: 5px;
                box-shadow: 0 2px 8px rgba(0,0,0,.18);
            }

            #panel-bagikan a,
            #panel-bagikan button {
                display: block;
                padding: 7px;
                background: #f7f4ed;
                color: #50121a;
                border: none;
                border-radius: 3px;
                text-align: left;
                text-decoration: none;
                font-size: 11px;
                cursor: pointer;
            }
        `;

        wadah.appendChild(panel);
        wadah.appendChild(tombol);
        document.head.appendChild(gaya);
        document.body.appendChild(wadah);

        function aturPosisi() {
            const posisi = backToTop.getBoundingClientRect();
            wadah.style.right = (window.innerWidth - posisi.right) + "px";
            wadah.style.bottom =
                (window.innerHeight - posisi.top + 10) + "px";
        }

        aturPosisi();
        window.addEventListener("resize", aturPosisi);

        tombol.addEventListener("click", function () {
            panel.style.display =
                panel.style.display === "flex" ? "none" : "flex";
        });

        document.getElementById("salin-tautan")
            .addEventListener("click", async function () {
                try {
                    await navigator.clipboard.writeText(url);
                    this.textContent = "Tautan Tersalin";
                } catch (error) {
                    window.prompt("Salin tautan berikut:", url);
                }
            });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", pasangTombolBagikan);
    } else {
        pasangTombolBagikan();
    }
})();
