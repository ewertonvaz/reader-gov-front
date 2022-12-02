import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function UploadPage() {
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        console.log(e.target);
        if (e.target.input.files.length) {
            const upload_file = e.target.input.files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            const request = await axios.post(process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload", formData);
            console.log(request);
        } else {
            console.log('You need to select a file');
        }
    }

    return (
        <div>
            {/* <h1>Upload de Arquivos</h1>
            <form action={process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload"}
                method="post" enctype="multipart/form-data">
                    <input type="file" name="filetoupload" /><br />
                    <input type="submit" />
            </form> */}
            <Form onSubmit={handleSubmit} action={process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload"}>
                <Form.Group className="mb-3" controlId="formUpload">
                    <Form.Label>Upload de Arquivo</Form.Label>
                    {/* <Form.Control type="file" name="fileName" encType="multipart/form-data" /> */}
                    <input type="file" name="filetoupload" />
                    <Button type='submit'>Upload</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UploadPage;