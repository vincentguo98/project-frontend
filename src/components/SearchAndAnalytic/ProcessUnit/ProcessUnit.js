import React from 'react';
import {Container, Row} from "react-bootstrap";
import {createTheme, List, ListItem, ListItemText, TextField, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";

export const ProcessUnit = ({columns, inputTableData, taskTitle, outputListData}) => {
    const defaultProvider = createTheme()

    return <>
        <Container>
            <Row>
                {
                    inputTableData.map((it, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={JSON.stringify(it)}/>
                        </ListItem>
                    ))
                }
            </Row>
            <Row>
                <div>{taskTitle}</div>
            </Row>

            <Row>
                <List>
                    {
                        outputListData.map((it, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={it}/>
                            </ListItem>
                        ))
                    }
                </List>
            </Row>
        </Container>
    </>
}
