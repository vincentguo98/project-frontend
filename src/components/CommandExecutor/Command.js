import {Container, Form, Button, Row, Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import  "../../css/style.css"

export function Command(){
    const [isFileArguments, setIsFileArguments] = useState(false) ;
    const [hasSecondArguments, setHasSecondArguments] = useState(false);

    const [command, setCommand] = useState("mkdir");

    const [firstArgument, setFirstArgument] = useState("");

    const [secondArgument, setSecondArgument] = useState("");

    const [fileArgument, setFileArgument] = useState("");


    const chooseCommand = (c) => {
        setIsFileArguments(false);
        setHasSecondArguments(false);
        if (c === "ls") {
            setIsFileArguments(true);
            setHasSecondArguments(true);
        }
        setCommand(c)
    }

    return (
        <Container fluid="xl">
            <Row>
                <Col xs={2}>
                    <Form.Group>
                        <Form.Label>Command</Form.Label>
                        <Form.Select value={command}
                                     onChange={(e) => {chooseCommand(e.target.value)}
                        }>
                            <option value="mkdir">mkdir</option>
                            <option value="ls">ls</option>
                            <option value="cat">cat</option>
                            <option value="rm">rm</option>
                            <option value="put" >put</option>
                            <option value="getPartitionLocations">getPartitionLocations</option>
                            <option value="readPartition">readParition</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                {
                    isFileArguments &&
                    <Col>
                        <Form.Group>
                            <Form.Label>Arguments</Form.Label>
                            <Form.Control type="file"
                                          value={fileArgument}
                                          onChange={(e) =>
                                          {setFileArgument(e.target.value);
                                              console.log(e.target.value);
                                          }
                            }/>
                        </Form.Group>
                    </Col>
                }

                <Col>
                    <Form.Group>
                        <Form.Label>Arguments</Form.Label>
                        <Form.Control value={firstArgument}
                                      onChange={(e) => setFirstArgument(e.target.value)}
                                     />
                    </Form.Group>
                </Col>
                {
                    hasSecondArguments &&
                    <Col>
                        <Form.Group>
                            <Form.Label>Arguments</Form.Label>
                            <Form.Control value={secondArgument}
                                          onChange={(e) => setSecondArgument(e.target.value)}/>
                        </Form.Group>
                    </Col>
                }
            </Row>
            <Row style={{marginTop: 20, padding: 10}}>
                <Button variant={"primary"} type={"submit"} size={"lg"}>Execute</Button>
            </Row>
        </Container>
    )
}
