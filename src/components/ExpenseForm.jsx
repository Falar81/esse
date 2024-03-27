import 'rsuite/Modal/styles/index.css';
import 'rsuite/Form/styles/index.css';
import 'rsuite/FormControl/styles/index.css';
import 'rsuite/FormControlLabel/styles/index.css';
import 'rsuite/FormGroup/styles/index.css';
import 'rsuite/SelectPicker/styles/index.css';
import 'rsuite/InputNumber/styles/index.css';
import { Modal, Form, ButtonToolbar, Button, SelectPicker, DatePicker,InputNumber } from 'rsuite';

export const ExpenseForm = ({ hs, hcm, open, expense, setExpense }) => {


    const selectCategoryData = ['Compensi', 'Rimborsi', 'Fornitori', 'Varie'].map(item => ({
        label: item,
        value: item
    }));
    const selectTypeData = ['Entrata', 'Uscita'].map(item => ({
        label: item,
        value: item
    }));

    const handleCategoryChange = (data) => {
        if (data) {
            switch (data) {
                case 'Varie':
                    setExpense({ ...expense, type: 'Entrata', category: 'Varie' });
                    break;
                default:
                    setExpense({ ...expense, type: 'Uscita', category: data });
            }
        } else {
            setExpense({ ...expense, type: '', category: ''});
        }


    }

    return (
        <>
            <Modal open={open} onClose={hcm}>

                <Modal.Header>
                    <Modal.Title>Inserisci</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{padding:'5px'}}>
                    <Form
                        fluid
                        formValue={expense}
                        onChange={expense => { setExpense(expense) }}
                        onSubmit={hs}
                    >
                        <Form.Group controlId="date">
                            <Form.ControlLabel>Data:</Form.ControlLabel>
                            <Form.Control block name="date" format='yyyy-MM-dd' accepter={DatePicker} />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.ControlLabel>Catergoria:</Form.ControlLabel>
                            <Form.Control block onChange={handleCategoryChange} name="category" accepter={SelectPicker} data={selectCategoryData} />
                        </Form.Group>
                        <Form.Group controlId="type">
                            <Form.ControlLabel>Tipo:</Form.ControlLabel>
                            <Form.Control block name="type" accepter={SelectPicker} data={selectTypeData} />
                        </Form.Group>
                        <Form.Group controlId="amount">
                            <Form.ControlLabel>Importo:</Form.ControlLabel>
                            <Form.Control accepter={InputNumber} name="amount" />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.ControlLabel>Descrizione:</Form.ControlLabel>
                            <Form.Control name="description" />
                        </Form.Group>

                        <Form.Group>
                            <ButtonToolbar>
                                <Button block type='submit' onClick={hs} appearance="primary" ><i className="bi bi-patch-check"></i></Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}