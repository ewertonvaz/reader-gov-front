import styles from './GoTopButtom.module.css';

function GoTopButtom({color}) {
    const currColor = color ? color : "currentColor";

    function goTop(){
        window.location.href = "#top";
    }

    return ( 
        <>
        <div style={{display:"none"}}><a href="#top">Top of Page</a></div>
        <div className={styles.wrapper} onClick={goTop}>
            <svg id="br-button" className="fixed" viewBox="0 0 20 20" fill={currColor}>
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
        </div>
        </>

     );
}

export default GoTopButtom;