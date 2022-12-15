import api from "../api/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from 'react'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function ConfirmaExclusao({ config }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  async function handleDelete(e) {
    
    try {
      await api.delete(config.apiDeleteRoute);

      toast.success(config.successMessage);
      handleClose()
      navigate(config.routeToNavigate)
    } catch (error) {
      console.log(error);
      toast.error(config.errorMessage);
    }
  }

  return (
    <div>
      <Button variant="outline-danger"
        onClick={handleShow}>
        Excluir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{config.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{config.modalBody}</Modal.Body>
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
