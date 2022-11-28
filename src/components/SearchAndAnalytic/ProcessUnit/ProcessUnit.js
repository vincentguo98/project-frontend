import React from 'react';
import {Container, Row} from "react-bootstrap";
import {createTheme, List, ListItem, ListItemText, TextField, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";

export const ProcessUnit = ({columns,
                                inputTableData,
                                taskTitle,
                                outputListData,
                                index, inputTitle, outputTitle}) => {
    const defaultProvider = createTheme()

    return <>
        <div></div>

        <div style={{border: "3 solid grey"}}>
            <ThemeProvider theme={defaultProvider}>
                <MaterialTable
                    title={inputTitle ? inputTitle : `Input Data For Partition ${index}`}
                    columns={columns.map(c => ({...c, tableData: undefined}))}
                    data={inputTableData}/>
            </ThemeProvider>
            <Row style={{marginTop: 5, marginBottom:5}}>
                <h3>After Executing task:</h3>
                <h4>{taskTitle}</h4>
            </Row>
                <ThemeProvider theme={defaultProvider}>
                    <MaterialTable title={outputTitle ? outputTitle: `Output Data For Partition ${index}`}
                                   columns={[{"title": "Result", "field": "result"}]}
                                   data={outputListData.map(it => (
                                       {"result": it}
                                   ))}/>
                </ThemeProvider>
        </div>

    </>
}
