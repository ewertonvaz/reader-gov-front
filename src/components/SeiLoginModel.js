import { useState } from "react";
import { Modal, Card, Form } from "react-bootstrap";
import logoSei from "../assets/logo-sei.png";
import { User, Lock, Buildings } from "phosphor-react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

function SeiLoginModel() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);

    setForm({
      user: "",
      password: "",
      agency: "",
    });
  };
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    user: "",
    password: "",
    agency: "",
  });

  async function handleSubmit() {
    try {
      const response = await api.post("/sei", form);
      console.log(response)
      navigate("/sei")
    } catch (error) {
      console.log(error.errors);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <Link onClick={handleShow} className="btn btn-outline-primary btn-sm ms-1">
        Sei!
      </Link>

      <Modal show={show} onHide={handleClose} className="modal-box">
        <Card className="card-sei">
          <p
            style={{
              position: "absolute",
              right: "20px",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <strong>X</strong>
          </p>
          <img src={logoSei} width={200} alt="logo do sei" />
          <Form>
            <div style={{ display: "flex" }}>
              <span className="icon">
                <User size={20} />
              </span>
              <span>
                <Form.Control
                  name="user"
                  value={form.user}
                  className="mb-3"
                  type="text"
                  placeholder="Usuário"
                  onChange={handleChange}
                />
              </span>
            </div>

            <div style={{ display: "flex" }}>
              <span className="icon">
                <Lock size={20} />
              </span>
              <span>
                <Form.Control
                  name="password"
                  value={form.password}
                  className="mb-3"
                  type="password"
                  placeholder="Senha"
                  onChange={handleChange}
                />
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <span className="icon">
                <Buildings size={20} />
              </span>
              <span className="select">
                <Form.Select className="mb-3" onChange={handleChange}>
                  <option></option>
                  <option value="TJDFT">TJDFT</option>
                  <option value="TRF1">TRF1</option>
                  <option value="MRE">MDR</option>
                </Form.Select>
              </span>
            </div>
            <button onClick={handleSubmit} className="btn-sei">ACESSAR</button>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}

export default SeiLoginModel;
