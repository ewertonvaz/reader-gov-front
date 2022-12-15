import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";
import PdfReader from "../components/PdfReader";

function Leitura() {

  const { tipoConteudo, idConteudo } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [config, setConfig] = useState({});


  useEffect(() => {

    (async () => {

      let configNew;
      
      if (tipoConteudo === 'book') {
        
        const res = await api.get('/books/' + idConteudo);
        
        configNew = {
          id: res.data._id,
          urlArquivo: res.data.caminho,
          ultPagLida: res.data.ultPagLida,
          tipoConteudoApiNotes: 'book'
        };
        
        
      }
      else if (tipoConteudo === 'document') {
        
        const res = await api.get('/documents/get-one/' + idConteudo);
        
        configNew = {
          id: res.data._id,
          urlArquivo: res.data.pdf,
          ultPagLida: 1,
          tipoConteudoApiNotes: 'document'
        };
        
      }
      else {        
        throw new Error('Tipo de conteúdo inválido');
      }

      console.log({configNew});

      setConfig(configNew);

      setIsLoading(false);

    })();



  }, []);

  return (

    <>
      {!isLoading && (

        <div className="pdf-reader-container">
          <PdfReader
            id={config.id}
            urlArquivo={config.urlArquivo}
            ultPagLida={config.ultPagLida}
            tipoConteudoApiNotes={config.tipoConteudoApiNotes}
          />
        </div>

      )}

    </>

  );
}

export default Leitura;
