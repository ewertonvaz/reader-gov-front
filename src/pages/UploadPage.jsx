import { Form, Button } from "react-bootstrap";
import api from "../api/api.js";

function UploadPage() {

    async function handleSubmit(e) {
        e.preventDefault();
        const fileInput = document.getElementById("fileToUpload");
        if (fileInput.files.length) {
            const upload_file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            try {
                const request = await api.put(
                    "/file/upload",
                    //`/s3/${upload_file.name}`,
                    formData
                );
                console.log(request);
            } catch(e) {
                console.log(e);
            }
        } else {
            console.log('You need to select a file');
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUpload">
                    <Form.Label>Upload de Arquivo</Form.Label>
                    <input type="file" id="fileToUpload" />
                    <Button type='submit'>Upload</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UploadPage;