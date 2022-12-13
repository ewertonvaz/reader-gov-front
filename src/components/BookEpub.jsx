import { useRef, useState } from "react";
import { ReactEpubViewer } from "react-epub-viewer";
import teste from "../assets/epubs/teste.epub";
import "../components/BookEpub.css";

const BookEpub = ({ id, caminho, ultPagLida }) => {
  const viewerRef = useRef(null);
  const url = caminho ? caminho : teste;
  const proxy = "http://localhost:8080/proxy-cors?url=" + encodeURIComponent(caminho);
  console.log(proxy);
  
  return (
    <div className="epub" style={{ position: "relative", height: "100%" }}>
      <p>Pressione o teclado para paginação.</p>

      <ReactEpubViewer url={url} ref={viewerRef} />
      {/* <ReactEpubViewer url={proxy} ref={viewerRef} /> */}
    </div>
  );
};

export default BookEpub;
