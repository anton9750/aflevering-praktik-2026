import styled from 'styled-components'

const Content = styled.div`
  max-width: 70ch;

  h2 {
    margin-top: ${({ theme }) => theme.spacing(8)};
  }

  p,
  li {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }

  ul {
    padding-left: ${({ theme }) => theme.spacing(5)};
  }
`

export function Privacy() {
  return (
    <Content>
      <h1>Privatlivspolitik</h1>
      <p>
        Sidst opdateret: november 2026. Denne side beskriver, hvilke
        oplysninger Tidsrejsen behandler, når du bruger sitet, og hvorfor.
      </p>

      <h2>Cookies</h2>
      <p>
        Vi bruger kun de cookies, der er nødvendige for at sitet fungerer:
        din valgte tema- og sprogindstilling, samt en login-session, hvis du
        logger ind. Der anvendes ingen tredjeparts marketing- eller
        tracking-cookies.
      </p>

      <h2>Login med Google</h2>
      <p>
        Hvis du vælger at logge ind, sker det via Google OAuth gennem
        Supabase Auth. Vi modtager dit navn, din e-mailadresse og et unikt
        bruger-id fra Google. Disse oplysninger bruges udelukkende til at
        identificere din konto, så dine ratings, favoritter og samlinger kan
        gemmes og vises til dig igen.
      </p>

      <h2>Data vi gemmer</h2>
      <ul>
        <li>Din profil (navn, e-mail, bruger-id) fra Google-login</li>
        <li>Ratings du giver begivenheder (1-5)</li>
        <li>Favoritmarkerede begivenheder og personer</li>
        <li>Samlinger, du selv opretter, redigerer eller sletter</li>
      </ul>
      <p>
        Disse data gemmes i en database hos Supabase og deles ikke med
        tredjeparter. Du kan til enhver tid få slettet din konto og data ved
        at kontakte os, se nedenfor.
      </p>

      <h2>Eksterne kilder</h2>
      <p>
        Indhold om begivenheder, personer, billeder og kort hentes direkte
        fra åbne API'er: Wikipedia, Wikimedia Commons, The Met Museum, Open
        Library, REST Countries og OpenStreetMap. Når du bruger kort- eller
        geolokationsfunktioner, sender din browser forespørgsler direkte til
        disse tjenester i overensstemmelse med deres egne vilkår.
      </p>

      <h2>Geolokation</h2>
      <p>
        Funktionen "historie nær mig" beder om adgang til din placering. Din
        placering bruges udelukkende til at finde begivenheder nær dig og
        gemmes ikke på vores servere.
      </p>

      <h2>Dine rettigheder</h2>
      <p>
        Du kan til enhver tid se, rette eller slette dine egne oplysninger
        via din profil, eller ved at kontakte os på{' '}
        <a href="mailto:kontakt@tidsrejsen.dk">kontakt@tidsrejsen.dk</a>.
      </p>
    </Content>
  )
}
