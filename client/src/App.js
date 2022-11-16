import "./App.css";

//Nav Bar Code
import { useState } from "react";
import NavBar from "./components/navBar";
// pages
import Collection from "./pages/myCollection";
import Decks from "./pages/myDecks";
import Archive from "./pages/archive";
//auth0
import Auth0NavBar from "./auth/nav-bar";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./auth/loading";
//import Profile from "./components/profile";
//style imports
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider, styled } from "baseui";

const engine = new Styletron();

function App() {
  const [view, setView] = useState("myCollection");
  //auth0
  const { isLoading } = useAuth0();
  const { user } = useAuth0();
  // console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <div id="app" className="d-flex flex-column h-100">
          {!user ? (
            <div>
              <Auth0NavBar />
              <span>Greetings, Planeswalker</span>
            </div>
          ) : (
            <div>
              <NavBar setView={setView} user={user} />
              {view === "myCollection" && <Collection />}
              {view === "myDecks" && <Decks />}
              {view === "archive" && <Archive />}
            </div>
          )}
          ;
        </div>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
