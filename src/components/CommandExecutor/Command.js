import {Container, Form, Button, Row, Col} from "react-bootstrap";
import {
    mkdir, ls, cat, rm, put, getPartitionLocations, readPartition,
    PATH, UPLOAD_FILENAME, PARTITION, FIREBASE, MYSQL, MONGDB, FILENAME_LIST
} from "../../constants/CommandConstants";
import {useState} from "react";
import  "../../css/style.css"
import {BuildUrl} from "../../Util/UrlUtil";
import {createTheme, List, ListItem, ListItemText, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";

export function Command(){
    const defaultProvider = createTheme()

    const commandArguments = {
        [mkdir] : {[PATH]: true},
        [ls] : {[PATH]: true},
        [cat]: {[PATH]: true},
        [rm]: {[PATH]: true},
        [put]: {[UPLOAD_FILENAME]: true, [PATH]: true, [PARTITION]: true},
        [getPartitionLocations]: {[PATH]: true},
        [readPartition]: {[PATH]: true, [PARTITION]: true},
    }

    const [columns, setColumns] = useState([])
    const [tableData, setTableData] = useState([])
    const [listData, setListData] = useState([])

    const [locations, setLocations] = useState([])


    const [edfs, setEdfs] = useState(FIREBASE)

    const [command, setCommand] = useState(mkdir);

    const [path, setPath] = useState("");

    const [uploadFilename, setUploadFilename] = useState(FILENAME_LIST[0]);

    const [partition, setPartition] = useState("");



    let params = {
        "database": edfs,
        "path": path,
        "filename": uploadFilename,
        "partition": partition,
    }

    const getURL = () => {
        const validQuery = Object.fromEntries(Object.entries(params).filter(([key]) => commandArguments[command][key]));
        const fetchURL = BuildUrl(command, edfs, validQuery)
        return fetchURL
    }



    const execute = () => {
        setTableData([])
        setListData([])
        if (command === ls) {executeLs()}
        else if (command === cat || command === readPartition) {executeCat()}
        else if (command === getPartitionLocations) {executeGetLocations()}
        else executeLs()
    }

    const executeLs = () => {
        const fetchURL = getURL()
        fetch(fetchURL)
            .then((response) => response.json())
            .then(it =>
            {
                console.log(it)
                setListData(it.map(it => it.id))
            })
    }

    const executeCat = () => {
        const catURL = getURL()
        fetch(catURL)
            .then((response) => {
                return response.json()}
               )
            .then(it => {
                console.log(it)
                setColumns(it.columns)
                setTableData(it.data)
            })
    }

    const executeGetLocations = () => {
        const getLocatoinURL = getURL()
        fetch(getLocatoinURL)
            .then(response => response.json())
            .then(
                it => {
                    if (it.success) {
                        setListData(it.locations)
                    } else {
                        setListData([])
                    }
                }
            )
    }
    return (
        <Container fluid="xl">
            <Row>
                <Col xs={2}>
                    <Form.Group>
                        <Form.Label>EDFS Type</Form.Label>
                        <Form.Select value={edfs}
                                     onChange={(e) => {setEdfs(e.target.value)}
                                     }>
                            <option value={FIREBASE}>{FIREBASE}</option>
                            <option value={MYSQL}>{MYSQL}</option>
                            <option value={MONGDB}>{MONGDB}</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col xs={2}>
                    <Form.Group>
                        <Form.Label>Command</Form.Label>
                        <Form.Select value={command}
                                     onChange={(e) => {setCommand(e.target.value)}
                        }>
                            <option value={mkdir} >mkdir</option>
                            <option value={ls}>ls</option>
                            <option value={cat}>cat</option>
                            <option value={rm}>rm</option>
                            <option value={put} >put</option>
                            <option value={getPartitionLocations}>getPartitionLocations</option>
                            <option value={readPartition}>readPartition</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {
                    commandArguments[command][PATH] &&
                    <Col>
                        <Form.Group>
                            <Form.Label>{PATH}</Form.Label>
                            <Form.Control value={path}
                                          onChange={(e) => setPath(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                }

                {
                    commandArguments[command][UPLOAD_FILENAME] &&
                    <Col>
                        <Form.Group>
                            <Form.Label>{UPLOAD_FILENAME}</Form.Label>
                            <Form.Select value={uploadFilename}
                                         onChange={(e) => {setUploadFilename(e.target.value)}
                                         }>
                                {FILENAME_LIST.map(filename => (
                                    <option value={filename}>{filename}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                }

                {
                    commandArguments[command][PARTITION] &&
                    <Col>
                        <Form.Group>
                            <Form.Label>{PARTITION}</Form.Label>
                            <Form.Control value={partition}
                                          onChange={(e) => setPartition(e.target.value)}/>
                        </Form.Group>
                    </Col>
                }

            </Row>
            <Row style={{marginTop: 20, padding: 10}}>
                <Button variant={"primary"} type={"submit"} size={"lg"} onClick={() => {execute()}}>Execute</Button>
            </Row>
            {
                tableData && tableData.length > 0 &&
                <Row>
                    <div>
                        <ThemeProvider theme={defaultProvider}>
                            <MaterialTable title={"data"} columns={columns} data={tableData ? tableData.filter(it => it !== null) : []}/>
                        </ThemeProvider>
                    </div>
                </Row>
            }
            {
                listData && listData.length > 0 &&
                <Row>
                    <div>
                        <List>
                            {listData.map(it => (
                                <ListItem key={it}>
                                    <ListItemText primary={it}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Row>
            }

        </Container>
    )
}


