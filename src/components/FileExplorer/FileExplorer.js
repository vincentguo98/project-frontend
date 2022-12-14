import {
    ChonkyActions,
    FileBrowser,
    FileList,
    FileNavbar,
    ChonkyIconName,
    setChonkyDefaults
} from "chonky";
import { ChonkyIconFA } from 'chonky-icon-fontawesome';
import {useEffect, useState} from "react";
import {Container, Form, Row} from "react-bootstrap";
import {FIREBASE, ls, MYSQL} from "../../constants/CommandConstants";
import {createTheme} from "@mui/material";


setChonkyDefaults({
    disableDragAndDrop: true
})
setChonkyDefaults({iconComponent: ChonkyIconFA})

export function FileExplorer({files,
                                 setFiles,
                                 currFolder,
                                 setCurrFolder,
                                 lsAndDisplay,
                                 edfs,
                                 setEdfs, }) {



    const defaultProvider = createTheme()

    const folder2string = (currFolder) => {
        if (currFolder.length <= 1) return "/"
        return currFolder.map(it => it.id).join("/").substring(1)
    }

    useEffect(() => {
        lsAndDisplay(edfs, folder2string(currFolder))
    }, [])

    const handleAction = (data) => {
        if (data.id === ChonkyActions.OpenFiles.id) {
            if (data.payload.targetFile.id === "..") {
                let targetFolder = currFolder.slice(0, currFolder.length - 1)
                console.log(targetFolder)
                setCurrFolder(targetFolder)
                lsAndDisplay(edfs, folder2string(targetFolder))
            } else {
                let targetFolder =
                    [...currFolder, {id: data.payload.targetFile.id,
                        name: data.payload.targetFile.id}]
                console.log(targetFolder)
                setCurrFolder(targetFolder)
                lsAndDisplay(edfs, folder2string(targetFolder))
            }
        }
    }

    return (
        <>
            <Container>
                <Row style={{marginTop: 20, padding:10}}>
                    <Form.Group>
                        <Form.Label>EDFS Type</Form.Label>
                        <Form.Select value={edfs}
                                     onChange={(e) =>
                                        {setEdfs(e.target.value);
                                            setCurrFolder([{id: "/", name: "root"}]);
                                         lsAndDisplay(e.target.value, "/")}
                                     }>
                            <option value={FIREBASE}>{FIREBASE}</option>
                            <option value={MYSQL}>{MYSQL}</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <div style={{ height: 300 }}>
                    <FileBrowser files={files} onFileAction={handleAction} folderChain={currFolder}>
                        <FileNavbar />
                        <FileList/>
                    </FileBrowser>
                </div>


            </Container>
        </>

    )
}
