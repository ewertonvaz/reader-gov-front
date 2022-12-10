import { Container, Form, Button } from "react-bootstrap";
import api from "../api/api.js";
import { useState } from "react";
import { toast } from "react-hot-toast";

function UploadPage() {
    const [ lastUpload, setLastUpload ] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const fileInput = document.getElementById("fileToUpload");
        if (fileInput.files.length) {
            const upload_file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            try {
                const request = await api.put("/cn/upload",formData);
                //Obtem o nome do arquivo / URL
                setLastUpload( request.data.filename );
                fileInput.value = null;
                toast.success("O upload do arquivo foi bem sucedido!")
            } catch(e) {
                console.log(e);
                toast.error("Não foi possível fazer o upload deste arquivo!")
            }
        } else {
            console.log('You need to select a file');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit} style={{display:"flex", flexDirection: "column", marginBottom: "18px"}}>
                <Form.Group className="mb-3" controlId="fileToUpload">
                    <Form.Label>Upload de Arquivo</Form.Label>
                    {/* <input type="file" id="fileToUpload" /> */}
                    <Form.Control type="file"/>
                </Form.Group>
                {/* <Form.Button type='submit'>Upload</Form.Button> */}
                <Form.Text><strong>Último upload:</strong> {lastUpload}</Form.Text>
            </Form>
            <Button onClick={handleSubmit}>Upload</Button>
        </Container>
    );
}

export default UploadPage;