import Home from "./pages/Home/HomePresenter";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Home></Home>
      <Footer title={"Tokenity"} />
    </div>
  );
}

export default App;
