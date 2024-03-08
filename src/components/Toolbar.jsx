import React from 'react';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/DateRangePicker/styles/index.css';
import { CustomProvider } from 'rsuite';
import itIT from 'rsuite/locales/it_IT';

const Toolbar = ({hf,hcdg,modal}) => {    
    return (
        <nav className="navbar mt-3 navbar bg-light">
            <div className="container-fluid">
                <div className="form-floating">    
                <CustomProvider locale={itIT}>    
                    <DateRangePicker className='shadow' placeholder="Filtra per data" size="lg" showOneCalendar onChange={hcdg}/>    
                    </CustomProvider>        
                </div>
                <div className="form-floating">
                    <input id="searchinputField" type="text" placeholder="Categoria, desc., data" className="form-control shadow" onChange={hf}></input>
                    <label htmlFor="searchinputField" className="form-label">Filtra per Cat. e Desc.</label>
                </div>
                
                <button type="button" onClick={() => modal.show()} className="btn btn-outline-success px-3 shadow"><i className="bi bi-file-earmark-plus"></i>
                </button>

            </div>
        </nav>
    )
}

export default Toolbar