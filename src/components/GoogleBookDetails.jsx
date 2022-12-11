import api from "../api/api";
import styles from "./GoogleBookDetails.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Modal, Button, Row, Col, Image } from "react-bootstrap";
import Rating from "./shared/Rating";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';


function GoogleBookDetails({ show, book, hide }) {
  const [imported, setImported] = useState(false);
  const [openEdit, setOpenEdit] = useState(true);
  const [lastImport, setLastImport] = useState({});
  const { volumeInfo } = book;
  const images = volumeInfo.imageLinks ? Object.values(volumeInfo.imageLinks) : [];
  const navigator = useNavigate();

  let yearPublished = ""; //Calcula ano de publicação
  if (volumeInfo.publishedDate) {
    let datePub = new Date(volumeInfo.publishedDate);
    yearPublished = datePub.getFullYear();
    if (datePub.getDate() === 31 && datePub.getMonth() + 1 === 12) {
      yearPublished += 1;
    }
  }

  useEffect(() => {
    // console.log('mudei o livro', book);
    findBook(book.id);
  }, [book]);

  async function importBook() {
    if (!volumeInfo) {
      return
    }

    const newBook = {
      googleID: book.id,
      titulo: volumeInfo.title,
      subtitulo: volumeInfo.subtitle,
      autor: volumeInfo.authors ? volumeInfo.authors[0] : "",
      ranking: 0,
      categoria: volumeInfo.categories ? volumeInfo.categories[0] : "",
      imagemCapa: images[0],
      idioma: volumeInfo.language,
      qtdPaginas: volumeInfo.pageCount,
      ultPagLida: 0,
      anotacoes: "",
      dataInicio: null,
      dataConclusao: null,
      tipo: "",
      caminho: "",
      status: "Ler"
    };
    try {
      const res = await api.post('/books/', newBook);

      console.log(res.data);
      setLastImport(() => res.data);
      setImported(true);
      if (openEdit) {
        navigator(`/books/${res.data._id}/edit`);
      } else {
        handleClose();
      }
      toast.success("O livro foi importado com sucesso!");
    } catch (e) {
      console.log(e);
      toast.error("Algo deu errado. Tente novamente por favor.");
    }
    // console.log('livro importado :', lastImport);
  }

  function handleClose() {
    hide();
  }

  function handleChecked(e) {
    setOpenEdit(e.target.checked);
  }

  async function findBook(id) {
    if (!id) {
      return;
    }
    try {
      const res = await api.get(`/books/googleID/${id}`);
      
      if (res.data[0] && id === res.data[0].googleID) {
        setLastImport(res.data[0]);
        setImported(true);
      } else {
        setImported(false);
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal className={styles.wrapper} show={show} size="xl">
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{volumeInfo.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Image src={images[0] ? images[0] : coverPlaceHolder} />
            <Rating color="gold" width="180px">{volumeInfo.averageRating}</Rating>
            <h3>{volumeInfo.authors ? volumeInfo.authors[0] : "Não informado"}</h3>
            <p><strong>Gênero :</strong> {volumeInfo.categories ? volumeInfo.categories[0] : "Não informado"}</p>
            <p><strong>Páginas :</strong> {volumeInfo.pageCount ? volumeInfo.pageCount : "Não informado"}</p>
            <p><strong>Idioma :</strong> {volumeInfo.language ? volumeInfo.language : "Não informado"}</p>
          </Col>
          <Col>
            <h1>{volumeInfo.title}</h1>
            <h2>{volumeInfo.subtitle}</h2>
            <p>{volumeInfo.description ? volumeInfo.description.substring(0, 1000) + "..." : ""}</p>
          </Col>
          <Col>
            <h2>Editora: {volumeInfo.publisher}</h2>
            <h3>Publicação : {yearPublished}</h3>
            {
              volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers.map(el => {
                return (<p key={el.type}>{el.type}: {el.identifier}</p>);
              })
            }
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row style={{ width: "100%", alignItems: "center" }}>
          <Col>
            {!imported &&
              <Button variant="primary" onClick={importBook}>
                Importar
              </Button>
            }
          </Col>
          <Col>
            {!imported &&
              <Form.Check
                className="my-3"
                checked={openEdit}
                name="openEdit"
                onChange={handleChecked}
                type="checkbox"
                label="Editar após importação"
              />
            }
          </Col>
          <Col>
            {imported &&
              <Link to={`/books/${lastImport._id}/edit`} className="btn btn-secondary">Editar</Link>
            }
          </Col>
          <Col>
            <Button variant="primary" onClick={handleClose}>
              Fechar
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default GoogleBookDetails;