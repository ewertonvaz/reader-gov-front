import BookPdf from "../components/BookPdf";
import BookEpub from "../components/BookEpub";
//import { useState } from "react";
import { useLocation } from "react-router-dom";

function Leitura() {
  //const [showLeitor, setShowLeitor] = useState(false);
  const parametro = useLocation();
  const { livro } = parametro.state;
  //console.log(livro.ultPagLida);

  return (
    <div className="livro-lista">
      {livro.tipo.toLowerCase() === "pdf" && (
        <BookPdf
          tipo={livro.tipo}
          ultPagLida={livro.ultPagLida}
          caminho={livro.caminho}
          id={livro._id}
        />
      )}
      {livro.tipo.toLowerCase() === "epub" && (
        <BookEpub
          tipo={livro.tipo}
          ultPagLida={livro.ultPagLida}
          caminho={livro.caminho}
          id={livro._id}
        />
      )}
    </div>
  );
}

export default Leitura;
