import {Container, Form, Button, Row, Col} from "react-bootstrap";
import {
    mkdir, ls, cat, rm, put, getPartitionLocations, readPartition,
    PATH, UPLOAD_FILENAME, PARTITION, FIREBASE, MYSQL, MONGDB, FILENAME_LIST
} from "../../constants/CommandConstants";
import {useEffect, useState} from "react";
import  "../../css/style.css"
import {BuildUrl} from "../../Util/UrlUtil";

export function Command(){

    const commandArguments = {
        [mkdir] : {[PATH]: true},
        [ls] : {[PATH]: true},
        [cat]: {[PATH]: true},
        [rm]: {[PATH]: true},
        [put]: {[UPLOAD_FILENAME]: true, [PATH]: true, [PARTITION]: true},
        [getPartitionLocations]: {[PATH]: true},
        [readPartition]: {[PATH]: true, [PARTITION]: true},
    }

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

    const executeCommand = () => {
        var validQuery = Object.fromEntries(Object.entries(params).filter(([key]) => commandArguments[command][key]))

        console.log(validQuery)

        const fetchURL = BuildUrl(command, edfs, validQuery)
        console.log(fetchURL)

        fetch(fetchURL)
            .then((response) => response.json())
            .then(it => console.log(it))
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
                <Button variant={"primary"} type={"submit"} size={"lg"} onClick={() => {executeCommand()}}>Execute</Button>
            </Row>
        </Container>
    )
}
