# Boku No Hero Academia Quiz (Multiplayer)

To interaktywny quiz dla fanów *Boku No Hero Academia*, stworzony w React + Vite + Tailwind CSS. Aplikacja wykorzystuje technologię PeerJS do komunikacji P2P (Peer-to-Peer), co pozwala na grę wieloosobową bez konieczności stawiania skomplikowanego backendu.

## 🚀 Jak uruchomić lokalnie?

1.  **Wymagania:** Upewnij się, że masz zainstalowany [Node.js](https://nodejs.org/) (wersja 16 lub nowsza).
2.  **Instalacja:**
    ```bash
    npm install
    ```
3.  **Uruchomienie:**
    ```bash
    npm run dev
    ```
4.  Otwórz przeglądarkę pod adresem wskazanym w terminalu (zazwyczaj `http://localhost:5173`).

## 📦 Jak zdeployować (opublikować w sieci)?

Ponieważ jest to aplikacja typu SPA (Single Page Application) i korzysta z zewnętrznego serwera PeerJS (domyślnie publiczny serwer PeerJS Cloud), możesz ją hostować na dowolnym darmowym hostingu plików statycznych.

### Opcja 1: Vercel (Najprostsza i zalecana)

1.  Zainstaluj Vercel CLI: `npm i -g vercel` lub po prostu załóż konto na [vercel.com](https://vercel.com).
2.  Jeśli masz kod na GitHubie:
    *   Połącz repozytorium w panelu Vercel.
    *   Vercel automatycznie wykryje Vite. Kliknij "Deploy".
3.  Jeśli chcesz wrzucić ręcznie z komputera:
    *   Wpisz w terminalu:
        ```bash
        npx vercel
        ```
    *   Postępuj zgodnie z instrukcjami (wciskaj Enter).

### Opcja 2: Netlify

1.  Zaloguj się na [Netlify](https://www.netlify.com/).
2.  Przeciągnij folder `dist` (który powstaje po wpisaniu `npm run build`) do panelu Netlify Drop.
    *   *Uwaga:* Przed wrzuceniem musisz zbudować projekt komendą:
        ```bash
        npm run build
        ```

### Opcja 3: GitHub Pages

1.  W pliku `vite.config.ts` musisz ustawić `base`:
    ```ts
    export default defineConfig({
      base: '/nazwa-twojego-repozytorium/',
      plugins: [react()],
    })
    ```
2.  Zbuduj projekt: `npm run build`.
3.  Wrzuć zawartość folderu `dist` na gałąź `gh-pages`.

## ⚠️ Ważna uwaga dotycząca Multiplayer (PeerJS)

Ta aplikacja używa domyślnego, darmowego serwera brokera PeerJS (`peerjs.com`).
*   **Zaleta:** Nie musisz konfigurować własnego serwera backendowego. Wszystko działa "out of the box".
*   **Wada:** Czasami publiczny serwer bywa przeciążony lub zrywa połączenia.
*   **Dla zaawansowanych:** Jeśli chcesz mieć 100% stabilności, możesz postawić własny serwer PeerJS (np. na Heroku lub Render) i zmienić konfigurację w pliku `src/context/GameContext.tsx` w sekcji `new Peer()`.

## 🛠 Technologie

*   **React 18** - Biblioteka UI
*   **Vite** - Szybki bundler
*   **Tailwind CSS** - Stylowanie
*   **PeerJS** - Komunikacja WebRTC (Multiplayer)
*   **Lucide React** - Ikony

## 🎮 Jak grać?

1.  **Host (Gospodarz):** Wchodzi na stronę, wpisuje nick i klika "Stwórz Grę". Kopiuje kod pokoju (lub link) i wysyła znajomym.
2.  **Gracze:** Wchodzą na stronę, wpisują nick i wklejają kod otrzymany od Hosta.
3.  **Rozgrywka:**
    *   Wybieracie kategorie.
    *   Odpowiadacie na pytania (kto pierwszy ten lepszy, lub wszyscy naraz - zależy od trybu, tutaj zaimplementowany jest prosty tryb turowy/równoległy).
    *   Zbieracie punkty!
