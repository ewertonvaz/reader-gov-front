import axios from "axios";
import { useState } from "react";
//import GoogleBookCard from "../components/GoogleBookCard";
//import { Container, Col, Row, InputGroup, Form, Table } from "react-bootstrap";
import { Container, InputGroup, Form, Table } from "react-bootstrap";
import Paginator from "../components/Paginator";
import GoogleBookDetails from "../components/GoogleBookDetails";
import Spinner from "../components/shared/Spinner";
import GoogleBookRow from "../components/GoogleBookRow";
import GoTopButtom from "../components/shared/GoTopButtom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const apiUrl = "https://www.googleapis.com/books/v1/volumes";

function GoogleBooksPage() {
    const [paginator, setPaginator] = useState({
        startIndex : 0,
        countResults: 0,
        totalItems : 0,
        currPage : 0,
        lastPage : 0
    });

    const maxResults = 16;
    const colCount = 4;
    //const rowArray = [];
    let maxPages = maxResults * colCount * 5; //Limitação no totalItem pois este é um valor estimado retornado pela API

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState({});
    const [showBook, setShowBook] = useState(false);
    const [actualBook, setActualBook ] = useState({
            volumeInfo : {
                title: ""
            }
        });

    //let colArray = [];
    //let itemCount = 0;  

    async function doSearch(startIndex, currPage){
        if (search !== "" && !loading) {
           setLoading(true);
            try {
                const res = await axios.get(
                    `${apiUrl}?q=${search.replace(' ', '+')}&startIndex=${startIndex}&maxResults=${maxResults}`);
                maxPages = maxPages <= res.data.totalItems ? maxPages : res.data.totalItems;
                setBooks(res.data);
                setPaginator({...paginator,
                    startIndex : startIndex,
                    currPage : currPage,
                    countResults: res.data.items.length,
                    totalItems: maxPages,
                    lastPage: Math.ceil(maxPages / maxResults )
                });
            } catch(e) {
                console.log(e);
            }
            setLoading(false); 
        }
        
    }

    function handleSearch(e){
        setSearch( e.target.value )
    }

    function showDetails(book){
        setActualBook(book);
        setShowBook(true);
    }

    function hideDetails(){
        setShowBook(false);
    }

    function handleKeyDown(e){
        if (e.key === "Enter"){
            doSearch(0,0);
        }
    }

    return (<Container>
        <GoTopButtom color="#3955BD" />
        <GoogleBookDetails show={showBook} book={actualBook} hide={hideDetails}/>
        <InputGroup className="my-3">
            <Form.Control
                placeholder="Digite o livro a pesquisar"
                aria-label="search"
                aria-describedby="basic-addon1"
                name="search"
                value={search}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
            <InputGroup.Text 
                id="basic-addon1"
                onClick={ ()=> doSearch(0,1)}
                disable={search !== "" ? "true" : "false"}
                className="btn btn-outline-secondary btn-sm"
            >
                <FontAwesomeIcon icon={faSearch} style={{width: "18px", height: "18px", verticalAlign: "-0.5em"}}/>
            </InputGroup.Text>
        </InputGroup>
        <div style={{display:"flex", gap:"12px"}}>
            <Paginator paginator={paginator} maxResults={maxResults} doSearch={doSearch}/>
            { loading && <Spinner color="#3955BD" width="48px"/> }
        </div>
        {
            Object.keys(books).length !== 0 && 
            // <>
            //     {
            //         books.items && books.items.forEach( book => {
            //             colArray.push(<Col key={book.id}><GoogleBookCard key={book.id} book={book} onClick={() => showDetails(book)}/></Col>);
            //             itemCount++;
            //             if (itemCount % colCount === 0) { 
            //                 rowArray.push(<Row key={`row_${itemCount}_${book.name}`} className="my-4"> {colArray} </Row>);
            //                 colArray = [];
            //             }
            //             if (itemCount === books.items.length ) {
            //                 rowArray.push(<Row key={`row_${itemCount+1}_${book.name}`} className="my-4"> {colArray} </Row>);
            //                 colArray = [];
            //             }
            //         })
            //     }
            //     { rowArray.length > 0 ? rowArray : colArray }
            // </>
            <Table>
                <tbody>
                {
                    books.items && books.items.map( book => {
                        return (
                            <GoogleBookRow key={book.id} book={book} onClick={() => showDetails(book)}/>
                        )
                    })
                }
                </tbody>
            </Table>
        }
    </Container> );
}

export default GoogleBooksPage;