import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";
import PdfReader from "../components/PdfReader";
import Spinner from '../components/shared/Spinner';

function Leitura() {

  const { tipoConteudo, idConteudo } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [config, setConfig] = useState({});

  const [showInvalidFileType, setShowInvalidFileType] = useState(false);


  useEffect(() => {

    (async () => {

      let configNew;

      if (tipoConteudo === 'book') {

        const res = await api.get('/books/' + idConteudo);

        if (res.data.tipo.toLowerCase() !== 'pdf') {
          setShowInvalidFileType(true);
        }
        else {

          configNew = {
            id: res.data._id,
            urlArquivo: res.data.caminho,
            ultPagLida: res.data.ultPagLida || 1,
            tipoConteudoApiNotes: 'book'
          };

        }


      }
      else if (tipoConteudo === 'document') {

        const res = await api.get('/documents/get-one/' + idConteudo);

        if (!res.data.pdf || res.data.pdf.substring(res.data.pdf.lastIndexOf('.')).toLowerCase() !== '.pdf') {
          setShowInvalidFileType(true);
        }
        else {

          configNew = {
            id: res.data._id,
            urlArquivo: res.data.pdf,
            ultPagLida: 1,
            tipoConteudoApiNotes: 'document'
          };

        }

      }
      else {
        throw new Error('Tipo de conteúdo inválido');
      }

      setConfig(configNew);

      setIsLoading(false);

    })();



  }, []);

  return (

    <>

      {isLoading && (
        <div className='mt-5 d-flex justify-content-center'>
          <Spinner color="#3955BD" width="48px" />
        </div>
      )}


      {!isLoading && !showInvalidFileType && (

        <div className="pdf-reader-container">
          <PdfReader
            id={config.id}
            urlArquivo={config.urlArquivo}
            ultPagLida={config.ultPagLida}
            tipoConteudoApiNotes={config.tipoConteudoApiNotes}
          />
        </div>

      )}

      {showInvalidFileType && (
        <div className="container mt-5">
          <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Não foi possível exibir o conteúdo</h4>
            Tipo de arquivo inválido.
          </div>
        </div>
      )}

    </>

  );
}

export default Leitura;
