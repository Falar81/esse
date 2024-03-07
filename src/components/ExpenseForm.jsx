export const ExpenseForm = ({ hc, hs, expense,modal,formModal }) => {

    return (
        <>
            {/* Modal */}
            <div className="modal fade" ref={formModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Inserisci</h5>
                            <button type="button" className="btn-close" onClick={() => modal.hide()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row ">
                                    <div className="form-group ">
                                        <label htmlFor="exampleFormControlDesc">Data</label>
                                        <input type="date" value={expense.date} name="date" onChange={(e) => { hc(e) }} className="form-control shadow" />
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="exampleFormControlCategory">Categoria</label>
                                        <select value={expense.category} name="category" onChange={(e) => { hc(e) }} className="form-control shadow" id="exampleFormControlCategory" placeholder="Categoria">
                                            <option></option>
                                            <option>Compensi</option>
                                            <option>Rimborsi</option>
                                            <option>Fornitori</option>
                                            <option>Varie</option>
                                        </select>
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="exampleFormControlSelect1">Tipo</label>
                                        <select value={expense.type} name="type" onChange={(e) => { hc(e) }} className="form-control shadow" id="exampleFormControlSelect1">
                                            <option></option>
                                            <option value="Entrata">Entrata +</option>
                                            <option value="Uscita">Uscita -</option>
                                        </select>
                                    </div>
                                    <div className="form-group ">
                                        <label htmlFor="exampleFormControlDesc">Importo</label>
                                        <input type="number" value={expense.amount} name="amount" onChange={(e) => { hc(e) }} className="form-control shadow" />
                                    </div>

                                    <div className="form-group ">
                                        <label htmlFor="exampleFormControlDesc">Desc.</label>
                                        <input type="text" value={expense.description} name="description" onChange={(e) => { hc(e) }} className="form-control shadow" id="exampleFormControlDesc" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success mt-3 shadow offset-5 px-4 shadow" onClick={hs}><i className="bi bi-patch-check"></i></button>
                            </form>
                        </div>
                        <div className="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}