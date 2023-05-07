import "./Components.css"
function CardEditable(prop) {
    return (
        <tr>
            <td><input type="text" placeholder={prop.id} disabled></input></td>
            <td><input type="text" name="title" placeholder={prop.title} onChange={prop.handleEditFormChange}></input></td>
            <td><input type="text" name="author" placeholder={prop.author}onChange={prop.handleEditFormChange}></input></td>
            <td><input type="number" name="year" placeholder={prop.year} onChange={prop.handleEditFormChange}></input></td>
            <td className={ prop.isBorrowed === true ? "borrowed" : "unborrowed"} onClick={prop.handleEditCheckbox}><input name="isBorrowed" type="checkbox"></input></td>
            <td><input name="borrower" type="text" placeholder={prop.borrower} onChange={prop.handleEditFormChange} disabled={!prop.isBorrowed}></input></td>
            <td><button type="submit" id={prop.id} onClick={prop.handleSave}>💾</button><button type="reset" onClick={prop.handleCancel}>🗙</button></td>
        </tr>
    )
}
export default CardEditable