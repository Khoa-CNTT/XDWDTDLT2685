import { ThemeProvider } from "./context/theme";
import AllRoute from "./components/AllRoute";

function App() {
    return (
        <ThemeProvider
            storageKey="theme"
            defaultTheme="light"
        >
            <AllRoute />
        </ThemeProvider>
    );
}

export default App;
