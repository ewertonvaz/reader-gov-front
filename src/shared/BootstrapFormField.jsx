import { Form } from 'react-bootstrap';

function BootstrapFormField({field, onChange, form}) {
    const name = field.name ? field.name : "name";
    const label = field.label ? field.label : name[0].toUpperCase() + name.slice(1).toLowerCase();
    const type = field.type ? field.type : "text";
    const placeholder =  field.placeholder ? field.placeholder : "Type your name...";
    const autofocus = field.autofocus ? field.autofocus : false;
    const options = field.options ? field.options : ['option 1', 'option 2', 'option 3'];
    const rows = field.rows ?  field.rows : 3;

    let formControl = <Form.Control type={type} name={name} placeholder={placeholder} autoFocus={autofocus} onChange={onChange} value={form[name]}/>;
    if (type==="textarea") { 
        formControl = <Form.Control as="textarea" rows={rows} name={name} placeholder={placeholder} autoFocus={autofocus} onChange={onChange} value={form[name]}/> 
    }

    if (type==="select") { 
        formControl = <Form.Select name={name} placeholder={placeholder} autoFocus={autofocus} onChange={onChange} value={form[name]}>
                <option value="">Selecione uma opção</option>
                {
                   options.map( option => <option value={option}>{option}</option>)
                }
            </Form.Select>
    }

    if (type === 'checkbox' || type === 'radio') {
        formControl = options.map( 
            option => <Form.Check key={`check_${option}`} type={type} id={option} name={name} onChange={onChange} label={option} /> 
        );
    }

    return ( 
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            { formControl }
        </Form.Group>
     );
}

export default BootstrapFormField;