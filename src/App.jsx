import { ExpenseList } from "./components/ExpenseList.jsx";
import { useEffect, useRef, useState } from "react";
import { ExpenseForm } from "./components/ExpenseForm.jsx";
import moment from "moment";
import "moment/min/moment-with-locales"
import "bootstrap-icons/font/bootstrap-icons.css"
import { Modal } from 'bootstrap'

function App() {
    const [expense, setExpense] = useState({
        id: "",
        date: moment().format('YYYY-MM-DD'),
        type: "",
        description: "",
        amount: "",
        category: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [modal, setModal] = useState(null)
    const exampleModal = useRef()


    const makeAPICall = async (param, options) => {
        let url = 'https://esseapi.onrender.com/sampleData';
        if (options.method === 'DELETE') {
            url = `https://esseapi.onrender.com/sampleData${param ? "/" + param : ""}`
        }
        try {
            setIsLoading(true);
            const response = await fetch(url, options);
            const data = await response.json();
            setIsLoading(false);             
            setExpenses(data);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        makeAPICall('', { method: 'GET' });
        setModal(
            new Modal(exampleModal.current)
        )
    }, [])

    const deleteExpense = async (id) => {
        makeAPICall(id, { method: 'DELETE' });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setExpense({ ...expense, [name]: value });
        if(name === 'category' && value === 'Varie'){            
            setExpense({...expense, type: 'Entrata',category: 'Varie'});
            
        }
        if(name === 'category' && value === 'Fornitori'){            
            setExpense({...expense, type: 'Uscita',category: 'Fornitori'});
            
        }
        if(name === 'category' && value === 'Rimborsi'){            
            setExpense({...expense, type: 'Uscita',category: 'Rimborsi'});            
        }
        if(name === 'category' && value === 'Compensi'){            
            setExpense({...expense, type: 'Uscita',category: 'Compensi'});            
        }

        
    }

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if (expense.amount && expense.type && expense.description) {
            // expense.id = new Date(Date.now()).getTime().toString();
            // setExpenses([...expenses, {...expense}]);
            makeAPICall('', {
                headers: {
                    "Content-type": "application/json;charset=UTF-8"
                },
                method: 'POST',
                body: JSON.stringify(expense)
            });
            setExpense({
                id: "",
                date: moment().format('YYYY-MM-DD'),
                type: "",
                description: "",
                amount: "",
                category: ""
            });
            modal.hide();
        }
    }


    return (
        <>
            {/* Modal */}
            <div className="modal fade" ref={exampleModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Inserisci</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ExpenseForm hs={handleExpenseSubmit} hc={handleChange} expense={expense} />
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            <span className="text-center">
                <h1> ESSE</h1> <h3>Mese di <b>{moment().format('MMM')}{' '}{moment().format('YYYY')}</b></h3>
            </span>

            <table className="mt-3 table table-striped table-responsive">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Importo</th>
                        <th scope="col" className="text-end">
                            <button type="button" onClick={() => modal.show()} className="btn btn-sm btn-outline-success px-3 shadow"><i className="bi bi-file-earmark-plus"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {isLoading && 
                <tr>
                    <td colSpan="6" className="text-center">
                        <div class="text-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">data fetch...</span>
                            </div>
                        </div>
                    </td>
                </tr>
                        }
                    <ExpenseList items={expenses} deleteItem={deleteExpense} />
                </tbody>
                <tfoot className="table-primary">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col" className="text-end table-primary">Totale €.{' '}
                            <span className="badge rounded-pill text-bg-info px-3 shadow">
                                {
                                    expenses.reduce((accumulator, expense) => {
                                        if (expense.type === 'Uscita')
                                            return (accumulator - Number(expense.amount));
                                        return (accumulator + Number(expense.amount)).toFixed(2);
                                    }, 0)
                                }
                            </span>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}

export default App
