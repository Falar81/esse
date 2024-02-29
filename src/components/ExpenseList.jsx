import moment from "moment/moment.js";

export const ExpenseList = ({items, deleteItem}) => {
    return (
        <>
            {
                items.map((item)=> {
                    const {_id,date,type,description,amount,category}=item;
                    return(
                        <tr key={_id}>
                            <td>{moment(date).format('DD-MM-YYYY')}</td>
                            <td>{category}</td>
                            <td>{description}</td>
                            <td>{type}</td>
                            <td className={(type==='Uscita' ? 'text-danger' : 'text-success')}>{amount} €</td>
                            <td className="text-end"><button className="btn btn-outline-danger btn-sm px-3 shadow" onClick={()=>deleteItem(_id)}><i class="bi bi-trash2"></i></button></td>
                        </tr>)
                    }
                )
            }
        </>
    )
}