import { Pagination } from "react-bootstrap";

function Paginator({paginator, maxResults, doSearch }) {
    function lastClick(){
        let lastPage = paginator.lastPage;
        let startIndex = maxResults * lastPage;
        doSearch(startIndex, lastPage);
    }

    function nextClick(){
        let nextPage = paginator.currPage + 1 < paginator.lastPage ? paginator.currPage + 1 : paginator.lastPage;
        let startIndex = maxResults * nextPage;
        doSearch(startIndex, nextPage);
    }

    function previousClick(){
        let previousPage = paginator.currPage - 1 >= 0 ? paginator.currPage - 1 : 0;
        let startIndex = maxResults * previousPage;
        doSearch(startIndex, previousPage);
    }

    function firstClick(){
        let firstPage = 0;
        let startIndex = 0;
        doSearch(startIndex, firstPage);
    }

    return ( 
        <Pagination>
            <Pagination.First onClick={firstClick}/>
            <Pagination.Prev onClick={previousClick}/>
            <Pagination.Item>
                { paginator.countResults > 0 ?
                    `Mostrando ${paginator.startIndex + 1} a ${paginator.startIndex + paginator.countResults} de ${paginator.totalItems}`
                :
                  'Nenhum livro listado'
                }
            </Pagination.Item>
            <Pagination.Next onClick={nextClick}/>
            <Pagination.Last onClick={lastClick}/>
        </Pagination>
    );
}

export default Paginator;