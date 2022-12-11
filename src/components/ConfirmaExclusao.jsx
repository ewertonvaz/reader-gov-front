import api from "../api/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import {useState} from 'react'
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

function ConfirmaExclusao({book}) {

  const clone = {...book}  
  const { bookID } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  async function handleDelete(e) {
     delete clone._id   
    try {
      await api.delete('/books/' + bookID);

      toast.success("Livro excluído com sucesso!");
      handleClose()
      navigate("/books")
    } catch (error) {
      console.log(error);
      toast.error("O Livro não pode ser excluído da Biblioteca");
    }
  }

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Excluir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja excluir este livro de sua Biblioteca? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmaExclusao;
