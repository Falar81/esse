export const ExpenseForm = ({hc, hs, expense}) => {

    return (
        <>
            <form>
                <div className="row align-items-start">
                    <div className="form-group col-md-2">
                        <label htmlFor="exampleFormControlDesc">Data</label>
                        <input type="date" value={expense.date} name="date" onChange={(e) => {hc(e)}} className="form-control" />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="exampleFormControlCategory">Categoria</label>
                        <select value={expense.category} name="category" onChange={(e) => {hc(e)}} className="form-control" id="exampleFormControlCategory" placeholder="Categoria">
                            <option></option>
                            <option>Stipendi</option>
                            <option>Rimborsi</option>
                            <option>Fornitori</option>
                            <option>Varie</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="exampleFormControlSelect1">Tipo</label>
                        <select value={expense.type} name="type" onChange={(e) => {hc(e)}} className="form-control" id="exampleFormControlSelect1">
                            <option></option>
                            <option value="Entrata">Entrata +</option>
                            <option value="Uscita">Uscita -</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="exampleFormControlDesc">Importo</label>
                        <input type="number" value={expense.amount}  name="amount" onChange={(e) => {hc(e)}} className="form-control" />
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="exampleFormControlDesc">Desc.</label>
                        <input type="text" value={expense.description} name="description" onChange={(e) => {hc(e)}} className="form-control" id="exampleFormControlDesc"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success mt-3 shadow offset-4 px-5" onClick={hs}>Salva</button>
            </form>
        </>
    )
}