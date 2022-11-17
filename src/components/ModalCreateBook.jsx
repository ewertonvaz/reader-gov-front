import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import BootstrapForm from "../shared/BootstrapForm";

const emptyForm = { title: "", author: "", ISBN: "", genre: [], description: "" };

function ModalCreateBook() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fields = [
    { name: "title", label: "Título do Livro", placeholder: "Digite o título do livro", autofocus: true},
    { name: "author", label: "Autor", placeholder: "Informe o autor do livro"},
    { name: "ISBN", label: "ISBN", placeholder: "Informe o ISBN", type:"email"},
    { name: "description", label: "Descrição", placeholder: "Digite a descrição ", type:"textarea"},
    { name: "genre", label: "Gênero", placeholder: "Informe o gênero do livro", type:"select", 
      options: ["terror", "ficção", "romance", "político"]
    },
    { name: "publisher", label: "Editora", placeholder: "Informe a editora do livro"},
    { name: "year", label: "Ano de Publicação", placeholder: "Informe ano de publicação", type: "number"},
    { name: "dateacquire", label: "Data aquisição", placeholder: "Informe data de compra", type: "date"},
  ];

  function handleChange(e) {
    //e.preventDefault();
    if (e.target.type !== "radio" && e.target.type !== "checkbox" ) {
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      let arrVal = [];
      if (e.target.type === "checkbox") { 
        arrVal = [...form[e.target.name]];
      }
      if(!form[e.target.name].includes(e.target.id)) {
         arrVal.push(e.target.id);
      } else {
        arrVal = arrVal.filter( el => el !== e.target.id); 
      }
      setForm({ ...form, [e.target.name]: arrVal })
    }
  }

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        + Criar um novo Funcionário
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Formulário de criação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm fields={fields} columns="2" onChange={handleChange} form={form} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCreateBook;