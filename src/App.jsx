import {ExpenseList} from "./components/ExpenseList.jsx";
import {useEffect, useState} from "react";
import {ExpenseForm} from "./components/ExpenseForm.jsx";
import moment from "moment";
import "moment/min/moment-with-locales"
import "bootstrap-icons/font/bootstrap-icons.css"


function App() {
    const [expense, setExpense] = useState({
        id:"",
        date: moment().format('YYYY-MM-DD'),
        type:"",
        description:"",
        amount:"",
        category:""
    });

    const [expenses, setExpenses] = useState( []);
    const makeAPICall = async (param,options) => {
        let url='http://localhost:3000/sampleData';
        if(options.method === 'DELETE'){
            url = `http://localhost:3000/sampleData${param?"/"+param:""}`
        }
        try {
            const response = await fetch(url,options);
            const data = await response.json();
            setExpenses(data);
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
       makeAPICall('',{method:'GET'});
    },[])

    const deleteExpense = async (id) => {
        makeAPICall(id, {method:'DELETE'});
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setExpense({...expense,[name]:value});
    }

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        if(expense.amount && expense.type && expense.description) {
            // expense.id = new Date(Date.now()).getTime().toString();
            // setExpenses([...expenses, {...expense}]);
            makeAPICall('', {
                headers: {
                    "Content-type": "application/json;charset=UTF-8"
                },
                method:'POST',
                body:JSON.stringify(expense)
            });
            setExpense({
                id:"",
                date: moment().format('YYYY-MM-DD'),
                type:"",
                description:"",
                amount:"",
                category:""});
        }
    }


  return (
    <>
        <div className="d-flex flex-column align-items-md-center p-3 bg-light">
            <span className="text-center">
                <h1> ESSE</h1> <h3>Mese di <b>{moment().format('MMM') }{' '}{ moment().format('YYYY')}</b></h3>
            </span>

            <table className="mt-3 table table-striped table-responsive">
                <thead className="table-primary">
                    <tr>                        
                        <th scope="col">
                            <input type="date" value={expense.date} name="date" onChange={(e) => {handleChange(e)}} className="form-control shadow" />
                        </th>
                        <th scope="col">
                            <select value={expense.category} name="category" onChange={(e) => {handleChange(e)}} className="form-control shadow" placeholder="Categoria">
                                <option></option>
                                <option>Stipendi</option>
                                <option>Rimborsi</option>
                                <option>Fornitori</option>
                                <option>Varie</option>
                            </select>
                        </th>
                        <th scope="col">
                            <input type="text" value={expense.description} name="description" onChange={(e) => {handleChange(e)}} className="form-control shadow"/>
                        </th>
                        <th scope="col">
                            <select value={expense.type} name="type" onChange={(e) => {handleChange(e)}} className="form-control shadow">
                                <option></option>
                                <option value="Entrata">Entrata +</option>
                                <option value="Uscita">Uscita -</option>
                            </select>
                        </th>
                        <th scope="col">
                            <input type="number" value={expense.amount}  name="amount" onChange={(e) => {handleChange(e)}} className="form-control shadow" />
                        </th>
                        <th scope="col">
                            <button type="submit" className="btn btn-success shadow" onClick={handleExpenseSubmit}><i class="bi bi-patch-check"></i></button>
                        </th>
                    </tr>
                </thead>
                <thead className="table-primary">
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Importo</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <ExpenseList items={expenses} deleteItem={deleteExpense} />
                </tbody>
                <tfoot>
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
                                    if(expense.type==='Uscita')
                                        return accumulator - Number(expense.amount);
                                    return accumulator + Number(expense.amount);
                                }, 0)
                            }
                            </span>
                        </th>
                    </tr>
                </tfoot>
                <tfoot className="table-primary">
                    <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Importo</th>
                        <th scope="col"></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </>
  )
}

export default App
