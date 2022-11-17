import { Form, Row, Col } from "react-bootstrap";
import BootstrapFormField from "./BootstrapFormField";

function BootstrapForm({fields, columns, onChange, form }) {
    const colCount = columns ? columns : 2;
    const rowArray = [];

    let colArray = [];
    let itemCount = 0;

    return ( 
        <Form>
        {
          fields.forEach( field => {
            colArray.push(<Col key={field.name}><BootstrapFormField field={field} onChange={onChange} form={form}/></Col>);
            itemCount++;
            if (itemCount % colCount === 0) { 
              rowArray.push(<Row key={`row_${itemCount}_${field.name}`}> {colArray} </Row>);
              colArray = [];
            }
            if (itemCount === fields.length ) {
              rowArray.push(<Row key={`row_${itemCount+1}_${field.name}`}> {colArray} </Row>);
              colArray = [];
            }
          })
        }
        { rowArray.length > 0 ? rowArray : colArray }
      </Form>
     );
}

export default BootstrapForm;