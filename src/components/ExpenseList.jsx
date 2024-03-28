import moment from "moment/moment.js";
import { useState } from "react";
import { Table, Button } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import 'rsuite/Table/styles/index.css';


export const ExpenseList = ({ items, deleteItem, loading, setLoading }) => {

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const getData = () => {
        if (sortColumn && sortType) {

            return items.sort((a, b) => {

                let x = a[sortColumn];
                let y = b[sortColumn];

                if (typeof x === 'string') {
                    x = sortColumn === 'date' ? new Date(a[sortColumn]) : x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = sortColumn === 'date' ? new Date(b[sortColumn]) : y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return items;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    return (
        <>
            <Table
                virtualized
                height={600}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
            // onRowClick={rowData => {
            //     console.log(rowData);
            // }}
            >
                <Column flexGrow={2} fixed sortable>
                    <HeaderCell>Data</HeaderCell>
                    <Cell dataKey="date">
                        {rowData => (
                            moment(rowData.date).format('DD-MM-YYYY')
                        )}
                    </Cell>
                </Column>

                <Column flexGrow={1} fixed sortable>
                    <HeaderCell>Categoria</HeaderCell>
                    <Cell dataKey="category" />
                </Column>

                <Column flexGrow={2} fixed sortable>
                    <HeaderCell>Descrizione</HeaderCell>
                    <Cell dataKey="description" />
                </Column>

                <Column flexGrow={1} fixed sortable>
                    <HeaderCell>Tipo</HeaderCell>
                    <Cell dataKey="type" />
                </Column>

                <Column flexGrow={1} fixed sortable>
                    <HeaderCell>Importo €.</HeaderCell>
                    <Cell dataKey="amount" >
                        {rowData => {
                            if (rowData.type === 'Uscita')
                                return <span class="badge rounded-pill bg-danger">{rowData.amount}</span>
                            return <span class="badge rounded-pill bg-success">{rowData.amount}</span>
                        }
                        }
                    </Cell>
                </Column>
                <Column fixed>
                    <HeaderCell>...</HeaderCell>
                    <Cell flexGrow={1} fixed style={{ padding: '6px' }}>

                        {rowData => (

                            <Button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(rowData._id)}>
                                <i className="bi bi-trash2"></i>
                            </Button>
                        )}

                    </Cell>
                </Column>
            </Table>
        </>
    )
}