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
            //const formData= { file: upload_file };
            const request = await axios.post(
                process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload",
                formData,
                {
                    headers: {
                      'content-type': 'multipart/form-data',
                      //'Authorization': 'json-token',
                    },
                }
             );
            console.log(request);
        } else {
            console.log('You need to select a file');
        }
    }

    return (
        <div>
            {/* <h1>Upload de Arquivos</h1>
            <form action={process.env.REACT_APP_FILE_SERVER || "http://localhost:8080/file/upload"}
                method="post" encType="multipart/form-data">
                    <input type="file" name="filetoupload" /><br />
                    <input type="submit" />
            </form> */}
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