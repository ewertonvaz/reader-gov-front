import Rating from './shared/Rating';
import styles from './GoogleBookRow.module.css';
import coverPlaceHolder from '../assets/book-cover-placeholder.png';

function GoogleBookRow({book, onClick}) {
    const { volumeInfo } = book;
    const images = volumeInfo.imageLinks ? Object.values(volumeInfo.imageLinks) : [coverPlaceHolder];
    return ( 
        <tr className={styles.wrapper} onClick={onClick}>
                <td><img src={images[0]} alt="capa do livro" /></td>
                <td>
                    <span title={volumeInfo.description}>
                        <h1>{volumeInfo.title}</h1>
                        <h2>{volumeInfo.subtitle}</h2>
                        <p>{volumeInfo.description ? volumeInfo.description.substring(0, 720) + "..." : ""}</p>
                    </span>
                </td>
                <td>
                    <Rating showRate={true} width="120px" color="#3955BD">{book.volumeInfo.averageRating}</Rating>
                </td>
                <td>{volumeInfo.publisher}</td>
                <td>{volumeInfo.publishedDate}</td>
        </tr> 
    );
}

export default GoogleBookRow;