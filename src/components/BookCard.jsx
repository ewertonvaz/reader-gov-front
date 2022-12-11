import { Link } from "react-router-dom";
import coverPlaceHolder from '../assets/book-cover-placeholder.png';

function BookCard({ livro: book }) {

    return (

        <div className="livro-card">
            <div className="livro-card-imagem">
                <Link to={`/books/${book._id}`}>
                    <img className="img-fluid" src={book.imagemCapa || coverPlaceHolder} alt={book.titulo} />
                </Link>
            </div>
            <div className="livro-card-titulo">
                {book.titulo.length <= 50 ? book.titulo : book.titulo.substr(0, 46) + ' ...'}
            </div>

        </div>
    );
}

export default BookCard;

