import './App.css';
import {Command} from "./components/CommandExecutor/Command";
import {Container} from "react-bootstrap";
import "./css/style.css"
import {FileExplorer} from "./components/FileExplorer/FileExplorer";
import {SearchAndAnalytic} from "./components/SearchAndAnalytic/SearchAndAnalytic";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {BuildUrl} from "./Util/UrlUtil";
import {FIREBASE, ls} from "./constants/CommandConstants";
import {Divider} from "@mui/material";


function App() {
    const [files, setFiles] = useState([])
    const [currFolder, setCurrFolder] = useState([{id: "/", name: "/"}])
    const [edfs, setEdfs] = useState(FIREBASE)

    // const addThumbnail = (file) => {
    //     return file.map(it => (
    //         {...it, ...(it.isDir ? {thumbnailUrl: } : {})}
    //     ))
    //
    // }

    const setCurrFiles = (file, targetFolder) => {
        console.log(file)
        if (targetFolder === "/") {
            setFiles(file)
        } else {
            setFiles([{id: '..', name: "..", isDir: true}, ...file])
        }
    }

    const lsAndDisplay = (database, currFolder) => {
        console.log(currFolder)
        fetch(BuildUrl(ls, database, {"path": currFolder}))
            .then(r => r.json())
            .then(it => setCurrFiles(it, currFolder))
            .catch()
    }

    return (
      <Container  fluid="xl" >
          <div> <h2>Task 1: EDFS Emulation </h2></div>
        <Command fileExploreEdfs={edfs} currFolder={currFolder}  lsAndDisplay={lsAndDisplay}/>
          <Divider style={{marginTop: 10}}/>
          <div><h2>Task 2: File Explorer</h2> </div>
        <FileExplorer files={files}
                      setFiles={setFiles}
                      currFolder={currFolder}
                      setCurrFolder={setCurrFolder}
                      lsAndDisplay={lsAndDisplay}
                      edfs={edfs}
                      setEdfs={setEdfs}/>
          <Divider style={{marginTop: 10}}/>
          <div><h2>Task 3: Search and  Analytic</h2></div>
        <SearchAndAnalytic/>
      </Container>
  );
}

export default App;
