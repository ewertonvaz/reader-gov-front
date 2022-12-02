import { Form, Button } from "react-bootstrap";
import axios from "axios";

function UploadPage() {

    async function handleSubmit(e) {
        e.preventDefault();
        const fileInput = document.getElementById("filetoupload");
        if (fileInput.files.length) {
            const upload_file = fileInput.files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            try {
                const request = await axios.post(
                    process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
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
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formUpload">
                    <Form.Label>Upload de Arquivo</Form.Label>
                    <input type="file" id="filetoupload" name="filetoupload" />
                    <Button type='submit'>Upload</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default UploadPage;