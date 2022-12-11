import { useRef, useState } from "react";
import { ReactEpubViewer } from "react-epub-viewer";
import teste from "./../assets/epubs/teste.epub";
import "./../components/BookEpub.css";

const BookEpub = ({ id, caminho, ultPagLida }) => {
  const viewerRef = useRef(null);
  const url = caminho ? caminho : teste;

  return (
    <div className="epub" style={{ position: "relative", height: "100%" }}>
      <p>Pressione o teclado para paginação.</p>

      <ReactEpubViewer url={url} ref={viewerRef} />
    </div>
  );
};

export default BookEpub;
