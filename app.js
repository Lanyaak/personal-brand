/**
 * LANYA KURDO — Studentportfolio | IHM Business School
 * Interaktiv logik för färgtema, kopiering och mjukt långsamt glitter
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Hantering av mörkt och ljust färgtema
    const temaKnapp = document.getElementById("tema-knapp");
    const temaText = temaKnapp ? temaKnapp.querySelector(".tema-text") : null;

    function uppdateraTemaUI(arMorkt) {
        if (temaText) {
            temaText.textContent = arMorkt ? "Ljust läge" : "Mörkt läge";
        }
    }

    const sparadTema = localStorage.getItem("lanya_portfolio_tema");
    const systemVillHaMorkt = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (sparadTema === "morkt" || (!sparadTema && systemVillHaMorkt)) {
        document.body.classList.add("morkt-lage");
        uppdateraTemaUI(true);
    } else {
        document.body.classList.remove("morkt-lage");
        uppdateraTemaUI(false);
    }

    if (temaKnapp) {
        temaKnapp.addEventListener("click", () => {
            const blirMorkt = document.body.classList.toggle("morkt-lage");
            localStorage.setItem("lanya_portfolio_tema", blirMorkt ? "morkt" : "ljust");
            uppdateraTemaUI(blirMorkt);
        });
    }

    // 2. Kopiera e-post till urklipp 
    const kopieraKnapp = document.getElementById("kopiera-epost-knapp");
    const epostAdress = "Lanyakkk@icloud.com";

    if (kopieraKnapp) {
        const kopieraText = kopieraKnapp.querySelector(".kopiera-text");

        kopieraKnapp.addEventListener("click", () => {
            navigator.clipboard.writeText(epostAdress).then(() => {
                const originalText = kopieraText ? kopieraText.textContent : "Kopiera e-post";

                if (kopieraText) {
                    kopieraText.textContent = "Kopierad!";
                }
                kopieraKnapp.style.backgroundColor = "#10b981";

                setTimeout(() => {
                    if (kopieraText) {
                        kopieraText.textContent = originalText;
                    }
                    kopieraKnapp.style.backgroundColor = "";
                }, 2200);
            }).catch((fel) => {
                console.error("Kunde inte kopiera:", fel);
            });
        });
    }

    // 3. Mjuk inrullning för länkar
    document.querySelectorAll('a[href^="#"]').forEach(lank => {
        lank.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId && targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 4. Klick-glitter effekt: MÄRKBART LÅNGSAM & SVÄVANDE (2.8 - 3.6 sekunder)
    const glitterSymboler = ["✦", "✧", "⋆", "·"];
    const glitterFarger = [
        "#de6299", // Rosa accent
        "#f7b6d1", // Klassisk babyrosa
        "#fbd6e5", // Ljus babyrosa
        "#ffffff", // Skimrande vit
        "#f08cb8", // Varm rosa
        "#ffeef5"  // Puderrosa
    ];

    function skapaGlitterSkur(x, y) {
        // Skapa 8 mjuka stjärnpartiklar som sakta dalar nedåt
        const antal = 8;
        for (let i = 0; i < antal; i++) {
            const partikel = document.createElement("span");
            partikel.className = "glitter-partikel";

            const symbol = glitterSymboler[Math.floor(Math.random() * glitterSymboler.length)];
            const farg = glitterFarger[Math.floor(Math.random() * glitterFarger.length)];
            partikel.textContent = symbol;
            partikel.style.color = farg;

            // Lugn spridningsradie så partiklarna håller ihop och svävar mjukt
            const vinkel = Math.random() * Math.PI * 2;
            const avstand = 18 + Math.random() * 32; // Mjuk 18-50px radie
            const dx = (Math.cos(vinkel) * avstand).toFixed(1) + "px";
            const dy = (Math.sin(vinkel) * avstand).toFixed(1) + "px";
            const rot = (Math.random() * 180 - 90).toFixed(0) + "deg";
            const storlek = (11 + Math.random() * 10).toFixed(1) + "px";

            // LÅNGSAM varaktighet: 2.8 till 3.6 sekunder!
            const varaktighet = (2.8 + Math.random() * 0.8).toFixed(2) + "s";

            partikel.style.left = x + "px";
            partikel.style.top = y + "px";
            partikel.style.fontSize = storlek;
            partikel.style.setProperty("--dx", dx);
            partikel.style.setProperty("--dy", dy);
            partikel.style.setProperty("--rot", rot);
            partikel.style.setProperty("--farg", farg);
            partikel.style.setProperty("--varaktighet", varaktighet);

            document.body.appendChild(partikel);

            partikel.addEventListener("animationend", () => {
                partikel.remove();
            });

            setTimeout(() => {
                if (partikel.parentNode) {
                    partikel.remove();
                }
            }, 4000);
        }
    }

    window.addEventListener("pointerdown", (e) => {
        if (e.clientX !== undefined && e.clientY !== undefined) {
            skapaGlitterSkur(e.clientX, e.clientY);
        }
    });
});
