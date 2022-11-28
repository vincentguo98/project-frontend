import {Container} from "@mui/material";
import {ProcessUnit} from "./ProcessUnit/ProcessUnit";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FIREBASE, MONGDB, MYSQL} from "../../constants/CommandConstants";
import {BuildUrl} from "../../Util/UrlUtil";

export function SearchAndAnalytic() {


    const [partitionData, setPartitionData] = useState({})

    // useEffect(() => {
    //     fetch("http://localhost:5001/api/search?database=firebase&path=/a/california_vaccination.csv&selectField=Cases&whereField=Cases&lte=1000&gte=200")
    //         .then((it) => it.json())
    //         .then((it) => {
    //             console.log(it)
    //             setPartitionData({"partition": [...it.partition], "columns": [...it.columns]})
    //         }).catch((it) => {
    //             console.log("error")
    //             console.log(it)
    //     })
    //
    //
    // }, [])

    const [command, setCommand] = useState("search")

    const [selectField, setSelectField] = useState("Cases")

    const [path, setPath] = useState("/a/california_vaccination.csv")

    const [whereField, setWhereField] = useState("Cases")

    const [lte, setLte] = useState("")

    const [gte, setGte] = useState("")

    //"http://localhost:5001/api/search?database=firebase&path=/a/california_vaccination.csv&selectField=Cases&whereField=Cases&lte=1000&gte=200"

    const execute = () => {
        if (command == "search") {
            let url = BuildUrl("search", "firebase", {
                path: path,
                selectField: selectField,
                whereField: whereField,
                lte:lte,
                gte:gte,
            })
            fetch(url)
                .then((it) => it.json())
                .then(it => setPartitionData({partition: it.partition, columns: it.columns}))
        }

    }







    return <Container>
        <Row>
            <Col>
                <Form.Group>
                    <Form.Label>Command</Form.Label>
                    <Form.Select value={command}
                                 onChange={(e) => {setCommand(e.target.value)}
                                 }>
                        <option value="search">search</option>
                        <option value="count">count"</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Select</Form.Label>
                    <Form.Select value={selectField}
                                 onChange={(e) => {setSelectField(e.target.value)}
                                 }>
                        <option value="Cases">Cases</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Select value={path}
                                 onChange={(e) => {setPath(e.target.value)}
                                 }>
                        <option value={path}>{path}</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Where</Form.Label>
                    <Form.Select value={whereField}
                                 onChange={(e) => {setWhereField(e.target.value)}}>
                        <option value="Cases">Cases</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Less Equal Than</Form.Label>
                    <Form.Control value={lte}
                                  onChange={(e) => {setLte(e.target.value)}}/>
                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Greater Equal Than</Form.Label>
                    <Form.Control value={gte}
                                  onChange={(e) => {setGte(e.target.value)}}/>
                </Form.Group>

            </Col>
        </Row>

        <Row style={{marginTop: 20, padding: 10}}>
            <Button variant={"primary"} type={"submit"} size={"lg"} onClick={() => {execute()}}>Execute</Button>
        </Row>


        <Row>
            {
                partitionData && Object.keys(partitionData).length > 0 &&
                partitionData.partition.map((it, index) => (
                    <Col key={index} style={{border: "10px solid red"}}>
                        <ProcessUnit inputTableData={it.input}
                                     columns={partitionData.columns}
                                     taskTitle={"random word"}
                                     outputListData={it.output}
                        />
                    </Col>
                ))
            }
        </Row>


    </Container>
}
