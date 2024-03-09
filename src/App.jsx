import { ExpenseList } from "./components/ExpenseList.jsx";
import { useEffect, useState } from "react";
import { ExpenseForm } from "./components/ExpenseForm.jsx";
import moment from "moment";
import "moment/min/moment-with-locales"
import "bootstrap-icons/font/bootstrap-icons.css"
// import { Modal } from 'bootstrap'
import Toolbar from "./components/Toolbar.jsx";

function App() {
    const [expense, setExpense] = useState({
        id: "",
        date: new Date(),
        type: "",
        description: "",
        amount: "",
        category: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [expensesFiltered, setExpensesFiltered] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const makeAPICall = async (param, options) => {
        let url = 'https://esseapi.vercel.app/sampleData';
        if (options.method === 'DELETE') {
            url = `https://esseapi.vercel.app/sampleData${param ? "/" + param : ""}`
        }
        try {
            setIsLoading(true);
            const response = await fetch(url, options);
            const data = await response.json();
            setIsLoading(false);
            setExpenses(data);
            setExpensesFiltered(data);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        makeAPICall('', { method: 'GET' });
    }, [])

    const deleteExpense = async (id) => {
        const shouldRemove = confirm("Confermi la rimozione?")
        if (shouldRemove) {
            makeAPICall(id, { method: 'DELETE' });
        }
    }

    const handleChangeDateRange = async (dateRange) => {
        if (dateRange) {
            let [from, to] = dateRange;
            const url = 'https://esseapi.vercel.app/sampleData/' + moment(from).format('YYYY-MM-DD') + '/' + moment(to).format('YYYY-MM-DD');
            try {
                setIsLoading(true);
                const response = await fetch(url);
                const data = await response.json();
                setIsLoading(false);
                setExpenses(data);
                setExpensesFiltered(data);
            }
            catch (e) {
                console.log(e)
            }
        }else{
            makeAPICall('', { method: 'GET' });
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
                date: new Date(),
                type: "",
                description: "",
                amount: "",
                category: ""
            });
            setOpenModal(false);
        }
    }

    const handleFilter = (e) => {
        const filteredExpense = expenses.filter((expense) => {

            const descCat = expense.category.toLowerCase() + ' ' + expense.description.toLowerCase();
            return descCat.includes(e.target.value.toLowerCase());

        });
        setExpensesFiltered(filteredExpense);
    }


    return (
        <>

            <ExpenseForm 
                hs={handleExpenseSubmit} 
                expense={expense} 
                setExpense={setExpense} 
                open={openModal}  
                hcm={handleCloseModal} 
            />


            <div className="text-center">
                <h1> ESSE</h1> <h3>Mese di <b>{moment().format('MMM')}{' '}{moment().format('YYYY')}</b></h3>
                <span className="badge rounded-pill text-bg-info px-3 shadow">
                    {
                        expensesFiltered.reduce((accumulator, expense) => {
                            if (expense.type === 'Uscita')
                                return (accumulator - Number(expense.amount));
                            return (accumulator + Number(expense.amount));
                        }, 0).toFixed(2)
                    }
                </span>
            </div>
            <Toolbar 
                hf={handleFilter} 
                hom={handleOpenModal} 
                hcdg={handleChangeDateRange} 
            />

            <table className="mt-3 table table-mobile-responsive table-mobile-striped">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Importo</th>
                        <th scope="col">Azione</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading &&
                        <tr>
                            <td colSpan="6" className="text-center">
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">data fetch...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    }
                    <ExpenseList items={expensesFiltered} deleteItem={deleteExpense} />
                </tbody>
            </table>
        </>
    )
}

export default App
