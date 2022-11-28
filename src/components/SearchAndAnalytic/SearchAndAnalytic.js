import {Container} from "@mui/material";
import {ProcessUnit} from "./ProcessUnit/ProcessUnit";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {BuildUrl} from "../../Util/UrlUtil";

export function SearchAndAnalytic() {


    const [partitionData, setPartitionData] = useState({})

    const [command, setCommand] = useState("search")

    const [selectField, setSelectField] = useState("")

    const[selectFieldsList, setSelectFieldsList] = useState([])

    const [path, setPath] = useState("")

    const [whereField, setWhereField] = useState("")

    const [whereFieldsList, setWhereFieldsList] = useState([])

    const [lte, setLte] = useState("")

    const [gte, setGte] = useState("")

    const [groupByField, setGroupByField] = useState("")

    const filename_whereFields = {
        "california_vaccination.csv": ["Cases", "Case_Rate",	"Deaths", "Death_Rate",	"Percent_of_People_with_1__Dose", "Percent_of_People_Fully_Vaccinated"],
        "LA_County_COVID_Cases.csv": ["cases", "deaths", "people_tested", "state_cases", "state_deaths", "new_cases","new_deaths","new_state_cases", "new_state_deaths"],
        "LA_County_COVID_Testing.csv": ["County_Performed",	"County_Positive"]
    }

    const filename_selectFields = {
        "california_vaccination.csv": ["CITY_TYPE",	"CITY",	"COMMUNITY", "LABEL", "City_Community", "Cases", "Case_Rate","Deaths", "Death_Rate","Percent_of_People_with_1__Dose", "Percent_of_People_Fully_Vaccinated"],
        "LA_County_COVID_Cases.csv": ["county",	"state", "fips","date",	"Lat","Lon","cases", "deaths", "people_tested", "state_cases", "state_deaths", "new_cases","new_deaths","new_state_cases", "new_state_deaths"],
        "LA_County_COVID_Testing.csv": ["date", "County_Performed",	"County_Positive"]
    }

    //"http://localhost:5001/api/search?database=firebase&path=/a/california_vaccination.csv&selectField=Cases&whereField=Cases&lte=1000&gte=200"

    const execute = () => {
        if (command === "search") {
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

        if (command === "count") {
            let url = BuildUrl("analytic", "firebase", {
                path: path,
                whereField: whereField,
                lte:lte,
                gte:gte,
                groupByField: groupByField
            })
            fetch(url)
                .then(it => it.json())
                .then(it => setPartitionData({partition: it.partition, columns: []}))
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
                        <option value="count">count</option>
                    </Form.Select>
                </Form.Group>
            </Col>

            {
                command && "search" === command &&
                <Col>
                    <Form.Group>
                        <Form.Label>Select</Form.Label>
                        <Form.Select value={selectField}
                                     onChange={(e) => {
                                         setSelectField(e.target.value)}
                                     }>
                            {selectFieldsList.map(it => (
                                <option value={it}>{it}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            }

            {
                command && "count" === command &&
                <Col>
                    <Form.Group>
                        <Form.Label style={{marginTop: 25, fontSize: 20}} column>count(*)</Form.Label>
                    </Form.Group>
                </Col>
            }

            <Col>
                <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control value={path}
                                  onChange={(e) => {
                                      let filename = e.target.value.split("/").slice(-1)
                                      if(filename in filename_whereFields) {
                                          setWhereFieldsList([...filename_whereFields[filename]])
                                          setSelectFieldsList([...filename_selectFields[filename]])
                                      } else {
                                          setWhereFieldsList([])
                                          setSelectFieldsList([])
                                      }
                                      setPath(e.target.value)
                                  }}/>

                </Form.Group>
            </Col>

            <Col>
                <Form.Group>
                    <Form.Label>Where</Form.Label>
                    <Form.Select value={whereField}
                                 onChange={(e) => {setWhereField(e.target.value)}}>
                        {whereFieldsList.map(it => (
                            <option value={it}>{it}</option>
                        ))}
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

            {
                command && "count" === command &&
                <Col>
                    <Form.Group>
                        <Form.Label>Group By</Form.Label>
                        <Form.Select value={groupByField}
                                     onChange={(e) => {
                                         setGroupByField(e.target.value)}
                                     }>
                            {selectFieldsList.map(it => (
                                <option value={it}>{it}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            }

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
