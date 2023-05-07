import Card from "./Card";
import librarydata from "../library";
import { useState } from "react";
import { nanoid } from "nanoid"
import CardEditable from "./CardEditable";

function Table() {

     const [library, setLibrary] = useState(librarydata)

    function AddForm() {

    const [book, setBook] = useState({
        id: nanoid(),
        title: "",
        author: "",
        year: null,
        isBorrowed: false,
        borrower: null,
    })

    function handleFormChange(event) {

        let formName = event.target.name;
        let formValue = event.target.value;

        const newFormBook = { ...book };
        newFormBook[formName] = formValue;

        setBook(newFormBook)
    } 

    function handleSubmit() {

        const newBook = { ...book };
        
        const newLibrary = [...library, newBook];

        setLibrary(newLibrary);
    }

    function handleCheckboxChange(event) {
        let formName = event.target.name;
        let formBoolean = event.target.checked;

        const newFormBook = { ...book };
        newFormBook[formName] = formBoolean;

        setBook(newFormBook)

       document.getElementsByName("borrower")[0]. disabled =! newFormBook.isBorrowed
    }

    return(
     <tr>
        <td><input type="text" placeholder={book.id} disabled></input></td>
        <td><input name="title" type="text" placeholder="Tytuł" onChange={handleFormChange}></input></td>
        <td><input name="author" type="text" placeholder="Autor" onChange={handleFormChange}></input></td>
        <td><input name="year" type="number" placeholder="Rok Wydania" onChange={handleFormChange}></input></td>
        <td><input name="isBorrowed" type="checkbox" onChange={handleCheckboxChange}></input></td>
        <td><input name="borrower" type="text" placeholder="Wypożyczający" onChange={handleFormChange} disabled></input></td>
        <td><button type="submit" onClick={handleSubmit}>Dodaj</button></td>
    </tr>
    )
    }

     const [editBook, setEditBook] = useState({
        id: null,
        title: "",
        author: "",
        year: null,
        isBorrowed: false,
        borrower: null,
    })
    
    function handleDelete(event) {
            const deletedBook = () => {
                                return (
                                    library.find((book) => {
                                        return book.id == event.target.id;
                                    })
                                )
        }
        const oldLibrary = Object.values({...library})
        const newLibrary = oldLibrary.filter(book => {
            return book.id != deletedBook().id
            }
        )
        setLibrary(newLibrary)
    }
    function handleEdit(event) {
        const editedBook = () => {
            return (
                library.find((book) => {
                    return book.id == event.target.id;
                })
            )
        }
        const newBook = { ...editedBook() }
        setEditBook(newBook)
    }
    function handleCancel() {
        const newBook = { ...editBook }
        newBook.id = null;
        setEditBook(newBook)
    }
    function handleEditFormChange(event) {

        let formName = event.target.name;
        let formValue = event.target.value;

        const editFormBook = { ...editBook };
        editFormBook[formName] = formValue;
        setEditBook(editFormBook)
    } 
    function handleSave(event) {
        const editedBook = () => {
                                return (
                                    library.find((book) => {
                                        return book.id == event.target.id;
                                    })
                                )
        }
        const oldLibrary = Object.values({ ...library })
        const midLibrary = () => {
            return(
            oldLibrary.filter(book => {
                return book.id != editedBook().id
    
            }
                )
            )
        }
        let newBook = {...editBook}
        let newLibrary = Object.values(midLibrary())
        console.log(newBook)
        newLibrary = [...midLibrary(), newBook]
        console.log(newLibrary)
        setLibrary(newLibrary)

        newBook = { ...editBook }
        newBook.id = null;
        setEditBook(newBook)

    }
    function handleEditCheckbox(event) {
        let formName = event.target.name;
        let formBoolean = event.target.checked;

        const newEditBook = { ...editBook };
        newEditBook[formName] = formBoolean;

        setEditBook(newEditBook)

       document.getElementsByName("borrower")[0]. disabled =! newEditBook.isBorrowed
    }
    return (
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Tytuł</td>
                    <td>Autor</td>
                    <td>Rok Wydania</td>
                    <td>Wypożyczona?</td>
                    <td>Wypożyczający</td>
                    <td>Zarządzanie</td>
                </tr>
            </thead>
            <tbody>
                {library.map((book) =>
                    book.id !== editBook.id ?
                    <Card
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        year={book.year}
                        isBorrowed={book.isBorrowed}
                        borrower={book.borrower}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit} 
                    />
                        :
                        <CardEditable
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            year={book.year}
                            isBorrowed={book.isBorrowed}
                            borrower={book.borrower}
                            handleCancel={handleCancel}
                            handleEditFormChange={handleEditFormChange}
                            handleSave={handleSave}
                            handleEditCheckbox={handleEditCheckbox}
                        />
                )
                }
            </tbody>
            <tfoot>
                   <AddForm />
            </tfoot>
        </table>
    )
}
export default Table