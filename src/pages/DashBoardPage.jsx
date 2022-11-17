import { Table, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateBook from "../components/ModalCreateBook";

const apiUrl = "https://ironrest.herokuapp.com/books-trade-92";
//const apiUrl = "https://ironrest.herokuapp.com/enap92";

function DashBoardPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(apiUrl);
      setBooks(response.data);
    }

    fetchBooks();
  }, []);

  console.log(books);
  return (
    <div>
      <h1>DashBoard</h1>
      <p>Aqui existirá uma tabela com as informações dos funcionários</p>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>%</th>
              <th>ISBN</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book._id}>
                  <td><span title={book._id}>{book.title ? book.title : 'Não informado'}</span></td>
                  <td>{book.author}</td>
                  <td>{book.progresso}</td>
                  <td>{book.ISBN}</td>
                  <td>{book.genre}</td>
                  <td>
                    <Button variant="outline-secondary">Detalhes</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <ModalCreateBook />
      </Container>
    </div>
  );
}

export default DashBoardPage;