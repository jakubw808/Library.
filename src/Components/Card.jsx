import "./Components.css"
function Card(prop) {
    return (
        <tr>
            <td>{prop.id}</td>
            <td>{prop.title}</td>
            <td>{prop.author}</td>
            <td>{prop.year}</td>
            <td className={ prop.isBorrowed === true ? "borrowed" : "unborrowed"}>{prop.isBorrowed}</td>
            <td>{prop.borrower}</td>
            <td><button name="edit" id={prop.id} onClick={prop.handleEdit}>✍️</button><button name="delete" id={prop.id} onClick={prop.handleDelete}>🗑️</button></td>
        </tr>
    )
}
export default Card