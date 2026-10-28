StayFinder – Frontend
StayFinder är en bokningstjänst för boenden i Sverige, ungefär som Airbnb. Besökare kan söka och filtrera boenden, och inloggade användare kan boka, hantera sina bokningar och skapa egna boenden som värd.

Det här repot innehåller frontend, byggd med Next.js. Backend (Hono + Supabase) ligger i ett eget repo.

🌐 Live demo: stayfinder.manautunjae.se 🔗 Backend: stay-finder-be


Innehåll
Tekniker
Funktioner
Kom igång
Miljövariabler
Projektstruktur
Arkitektur
Inloggning och cookies
Var reglerna ligger
Arbetsflöde med Git
Möjliga förbättringar


Tekniker
Teknik
Användning
Next.js 16 (App Router)
Ramverk, routing och serverrendering
React 19
Komponenter och state
TypeScript
Typning av all data (props, API-svar, formulär)
Tailwind CSS v4
Styling, mobile first
lucide-react
Ikoner
Vercel
Hosting och deploy



Funktioner
Alla besökare
Startsida med hero-bild och boenden grupperade per stad (Stockholm, Göteborg och alla boenden)
Detaljsida för varje boende, med bild, information och pris
Sök och filtrera på fritext, stad, maxpris och antal gäster
Sök på lediga datum – visar bara boenden som är lediga under vald period
Sortera på pris, stigande eller fallande (sorteringen görs i backend)
Egen 404-sida när ett boende inte finns, samt laddnings- och felvyer
Inloggade användare
Registrera, logga in och logga ut via en modal
Inloggningen finns kvar när sidan laddas om
Navigeringen visar olika innehåll för inloggad och utloggad användare
Boka ett boende med antal gäster och datum. Formuläret visar antal nätter och totalpris innan bokningen skickas
Valideringsfel från backend visas under rätt fält i formuläret
Mina bokningar: se, ändra (gäster och datum) och avboka
Värd: se bokningar på sina boenden, bekräfta eller avboka
Notifikation (röd badge) med antal bokningar som väntar på bekräftelse
Dashboard: avatar, e-post och egna boenden
Skapa, ändra och ta bort egna boenden
En värd kan inte boka sitt eget boende
Design
Mobile first med bottennavigering på mobil och header-länkar på desktop
Glas-header (glassmorphism) och hero-bild under headern
Responsivt rutnät för kort och formulär
Testad i Chrome och i Safari på iPhone


Kom igång
Krav
Node.js 20 eller senare
En körande backend (lokalt eller deployad)
Installation
git clone https://github.com/ManauTunjae/stay-finder-fe.git

cd stay-finder-fe

npm install

Skapa filen .env.local i rotmappen (se Miljövariabler), och starta sedan:

npm run dev

Öppna http://localhost:3000.
Övriga kommandon
Kommando
Vad det gör
npm run dev
Startar utvecklingsservern
npm run build
Bygger appen för produktion och kontrollerar TypeScript
npm run start
Startar den byggda appen
npm run lint
Kör ESLint

Testa på mobil i samma nätverk
Lägg till din dators lokala IP-adress i allowedDevOrigins i next.config.ts, och öppna http://<din-ip>:3000 på telefonen.

Inloggning fungerar inte lokalt via IP-adress på iPhone, eftersom cookien är Secure och kräver https. Testa inloggning på mobil via den deployade adressen.


Miljövariabler
Variabel
Exempel
Beskrivning
NEXT_PUBLIC_API_URL
https://stay-finder-be.vercel.app
Backendens adress, utan snedstreck på slutet


.env.local finns i .gitignore och laddas aldrig upp. På Vercel läggs variabeln in under Settings → Environment Variables. Variabler med NEXT_PUBLIC_ byggs in när appen byggs, så efter en ändring måste appen deployas om.


Projektstruktur
src/

├── app/

│   ├── layout.tsx              Header, BottomNav, Footer, AuthProvider och AuthModal

│   ├── page.tsx                Startsida med hero och boenden per stad

│   ├── loading.tsx             Laddningsvy

│   ├── error.tsx               Felvy

│   ├── not-found.tsx           Allmän 404-sida

│   ├── search/                 Sök, filter, sortering och lediga datum

│   ├── properties/

│   │   ├── [id]/               Detaljsida, egen laddningsvy och 404-sida

│   │   └── new/                Skapa boende

│   ├── bookings/               Mina bokningar och bokningar på mina boenden

│   └── profile/                Dashboard med egna boenden

├── components/                 Återanvändbara komponenter (Header, PropertyCard, BookingForm …)

├── context/

│   └── AuthContext.tsx         Inloggad användare och login-modal

├── lib/

│   ├── api.ts                  Anrop från servern (boenden, publika)

│   ├── auth.ts                 Inloggning via proxyn

│   ├── bookings.ts             Bokningar via proxyn

│   ├── properties.ts           Skapa, ändra och ta bort boenden via proxyn

│   ├── apiError.ts             Egen felklass med statuskod och fel per fält

│   └── date.ts                 Antal nätter och dagens datum (svensk tid)

└── types/                      Typer för Property, Booking och User


Arkitektur
Var datan hämtas
Data
Hämtas
Varför
Boenden (lista, sök, detaljsida)
På servern i serverkomponenter
Publik data, snabb första laddning, ingen cookie behövs
Inloggning, bokningar, egna boenden
I webbläsaren i klientkomponenter
Kräver inloggning, och cookien skickas bara från webbläsaren


Funktionerna är uppdelade efter var de körs:

lib/api.ts anropar backend direkt med full adress (körs på servern).
lib/auth.ts, lib/bookings.ts och lib/properties.ts anropar /api/... (körs i webbläsaren, via proxyn).
Filter i URL:en
Sökfiltren sparas i adressen, till exempel /search?city=Stockholm&sort_order=asc. Det gör att sökningar kan delas, tillbaka-knappen fungerar och sidan kan hämta resultatet på servern.


Inloggning och cookies
Backend använder Supabase Auth och sparar inloggningen i en httpOnly-cookie, som JavaScript inte kan läsa.

Frontend och backend ligger på olika domäner. Först anropades backend direkt med credentials: "include", vilket fungerade i Chrome men inte i Safari, eftersom Safari blockerar cookies från andra domäner (tredjepartscookies).

Lösningen är en proxy i Next.js (rewrites i next.config.ts):

Webbläsare → stayfinder.manautunjae.se/api/...  → Next.js → backend

Webbläsaren pratar bara med sin egen domän, så cookien blir en förstapartscookie och fungerar i alla webbläsare. Eftersom adressen /api är relativ fungerar samma kod lokalt, på Vercel och på egen domän.


Var reglerna ligger
Frontend visar bara rätt knappar och tydliga fel. De riktiga reglerna ligger i backend (API och databas med RLS), så att de gäller även om någon anropar API:t direkt.

Regel
Frontend
API
Databas
Bara inloggade kan boka och skapa boenden
Visar login-modalen
✅ 401
✅ RLS
Max antal gäster
max på fältet
✅ 400


Inga dubbelbokningar
Visar felet
✅ 409
✅
Värd kan inte boka sitt eget boende
Döljer knappen
✅ 403
✅ RLS
Bara värden kan bekräfta
Knappen visas bara för värden
✅ 403
✅ RLS
Incheckning kan inte vara bakåt i tiden
min på datumfältet
✅ 400


Totalpris
Visas som förhandsvisning
✅ räknas i backend





Arbetsflöde med Git
feat/<namn>  →  development  →  main  →  Vercel deployar automatiskt

Varje funktion byggs på en egen feat/-branch och mergas till development via pull request.
npm run build körs innan varje PR.
När flera funktioner är klara mergas development till main, som deployas.


Möjliga förbättringar
Ladda upp bilder till Supabase Storage istället för att klistra in en bildlänk
Namn på användare (just nu visas e-post och en avatar med första bokstaven)
Riktiga olästa notifikationer, och badgen även i bottennavigeringen på mobil
Kalender som visar vilka datum ett boende redan är bokat


Skapad av
Manau Tunjae – individuell uppgift i kursen Backend 2, hösten 2026.
