import './App.css';
import {Command} from "./components/CommandExecutor/Command";
import {Container} from "react-bootstrap";
import "./css/style.css"
import {FileExplorer} from "./components/FileExplorer/FileExplorer";
import {SearchAndAnalytic} from "./components/SearchAndAnalytic/SearchAndAnalytic";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Container  fluid="xl" >
        <Command/>
        <FileExplorer/>
        <SearchAndAnalytic/>
      </Container>
  );
}

export default App;
