import React from 'react'

const Toolbar = ({hf,modal}) => {
    
    return (
        <nav className="navbar mt-3 navbar bg-light">
            <div className="container-fluid">
                <div className="form-floating">
                    <input id="searchinputField" type="text" placeholder="Categoria, desc., data" className="form-control shadow" onChange={hf}></input>
                    <label htmlFor="searchinputField" className="form-label">Filtra Cat., Desc., Data</label>
                </div>

                <button type="button" onClick={() => modal.show()} className="btn btn-outline-success px-3 shadow"><i className="bi bi-file-earmark-plus"></i>
                </button>

            </div>
        </nav>
    )
}

export default Toolbar