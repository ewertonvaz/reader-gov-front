import { Modal, Button, Form, FloatingLabel, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-hot-toast";
import api from "../api/api.js";

function NoteModalForm({ id, show, setShow, reload, setReload, title, form, setForm, handleChange, defaultNote }) {
    function handleClose() {
        setForm(defaultNote);
        setShow(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(!form.texto) {
          toast.error("Você precisa informar o texto o título");
          return;
        }
    
        if(form.page <= 0) {
          toast.error("Por favor informe o número da página!");
          return;
        }
    
        try {
          let note = {};
          if (form._id) {
            note = await api.put(`/notes/${form._id}`, form);
          } else {
            note = await api.post(`/notes/${id}`, form);
          }
          toast.success("Cadastro concluído com sucesso!!");
          console.log(note);
          setForm(defaultNote);
          setShow(false);
          setReload(!reload);
        } catch (error) {
          console.log(error);
          toast.error("Não foi possível incluir esta anotação!");
        }
    }

    return ( 
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Form>
            <Container>
                <Row>
                <Col>
            <FloatingLabel
                controlId="floatingInput"
                label="Título da anotação"
                className="mb-3"
              >
                <Form.Control
                type="text"
                name="titulo"
                value={form.titulo}
                onChange={handleChange}
                />
            </FloatingLabel>
            </Col>
            </Row>
            <Row>
            <Col>
            <FloatingLabel
                controlId="floatingInput"
                label="Texto da anotação"
                className="mb-3"
              >
                <Form.Control
                as="textarea" rows={5}
                name="texto"
                value={form.texto}
                onChange={handleChange}
                />
            </FloatingLabel>
            </Col>
            <Col>
            <Form.Control
              type="number"
              name="page"
              value={form.page}
              onChange={handleChange}
            />
            </Col>
            </Row>
        </Container>
        </Form>
        <Modal.Footer>
            <Button
                variant="secondary"
                size="sm"
                onClick={handleSubmit}
            >
              Salvar
            </Button>
            <Button variant="secondary"
              size="sm"
              onClick={handleClose}
            >
              Cancelar
            </Button>
        </Modal.Footer>
      </Modal>
     );
}

export default NoteModalForm;