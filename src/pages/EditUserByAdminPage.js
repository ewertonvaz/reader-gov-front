import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";
import image from "../assets/profile.jpeg";
import EditUser from "../components/EditUser";
import { formatDateBR, formatDateFromApi } from "../util/date.util";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-hot-toast";

function EditUserByAdmin({user}) {
  const {idUser} = useParams()
  const navigate = useNavigate();
  const [showUpload, setShowUpload ] = useState(false);

  // const { setLoggedInUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({
    name: "",
    profilePic: "",
    email:"",
    role: "",
    active: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/oneUser/${idUser}`);
        console.log(response.data[0])
        setForm(response.data[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  
  

  // function signOut() {
  //   localStorage.removeItem("loggedInUser");

  //   setLoggedInUser(null);

  //   navigate("/");
  // }
console.log(form)
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // async function handleDeleteUser() {
  //   try {
  //     await api.delete("/user/delete");
  //     signOut();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Algo deu errado no delete do user");
  //   }
  // }

  function handleShowUpload(){
    setShowUpload(!showUpload);
    if (!showUpload) {

    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const fileInput = document.getElementById("fileToUpload");
    if (fileInput.files.length) {
        const upload_file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', upload_file);
        try {
            const request = await api.put("/cn/upload",formData);
            //Obtem o nome do arquivo / URL
            // setUser({ ...user, profilePic: request.data.filename });
            fileInput.value = null;
            setShowUpload(!showUpload);
            toast.success("O upload do arquivo foi bem sucedido!")
        } catch(e) {
            console.log(e);
            toast.error("Não foi possível fazer o upload deste arquivo!")
        }
    } else {
        console.log('You need to select a file');
    }
  }

  function cancelUpload(e){
    e.preventDefault();
    const fileInput = document.getElementById("fileToUpload");
    fileInput.value = null;
    setShowUpload(false);
  }

  function btnEdit(){
    setEdit(true)
  }

  async function handleSubmit(e){
    e.preventDefault();
    setEdit(false)
   
    try {
      await api.put("/user/edit", form);
      toast.success("Alterações realizadas com sucesso")
    } catch (error) {
      console.log(error);
      // toast.error("Não foi possivel realizar as Alterações")
    }
  }

  return (
    <div className="userData" id="userData">
      {/* <h2>{user.name}</h2>  */}
      
      {isLoading && <Spinner />}
      {!isLoading && (
        <Container>
        <Row>
          <Col className="col-3">
            <img
              variant="top"
              style={{
                width: "14rem",
                height: "15rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              src={form.profilePic ? form.profilePic : image}
              alt="imagem"
            />
            
            <Form.Group className="mb-3">
              <Form.Label onClick={handleShowUpload} style={{cursor : "pointer"}}>Editar Foto</Form.Label>
              { showUpload &&
                  <>
                  <Form.Control id="fileToUpload" type="file" className="mb-2"/>
                  <div className="buttons">
                  <Button onClick={handleUpload}>Upload</Button>
                  <Button variant="danger" onClick={cancelUpload}>Cancelar</Button>
                  </div>
                  </>
                }            
              </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Usuário desde:</Form.Label>
              <Form.Control
                type="text"
                name="createdAt"
                value={formatDateBR(form.createdAt)}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled = {edit === true? false : true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Situação</Form.Label>
              
                <Form.Select
                  name="active"
                  disabled = {edit === true? false : true}
                  onChange={handleChange}
                  defaultValue={form.active}
                >
                  <option value={true}>ATIVO</option>
                  <option value={false}>INATIVO</option>
                </Form.Select>
              
              
                
              
            </Form.Group>
            <div className="buttons">
            <Button onClick={btnEdit} variant="secondary" style={ edit===true? {display:"none"}: {display:"block"}}>Editar</Button>{" "}
            <Button onClick={handleSubmit} variant="secondary" style={ edit===true? {display:"block"}: {display:"none"}}>Salvar</Button>{" "}
            <Link to="/userlist" className="btn btn-secondary">Voltar</Link>
            </div>
            
            {/* <div className="buttons">
            
            
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              style={ user.role === "USER"? {display:"none"} : {display: "block"}}
            >
              Deletar
            </Button>{" "}
            </div> */}
          
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Função</Form.Label>
              {!isLoading && (
                <Form.Select
                  
                  disabled = {edit === true? false : true}
                  defaultValue={form.role}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </Form.Select>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Container>
      )}
      
    </div>
  );
}

export default EditUserByAdmin;
