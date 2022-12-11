import styles from './Rating.module.css';
function Rating({color, showRate, width, children}){
    const currColor = color ? color : "currentColor";
    const rate =  children ? children : "NOT RATED";
    let blkQte = children? Math.round(children) : 0;
    let stars = [];
    for(let i = 0; i < 5; i++){
        stars.push( i >= blkQte ? 0 : 1 );
    }
    return(
        <div className={styles.wrapper} style={{width:width}}>
           { 
            stars.map( (el, index) => {
                return (
                    <svg key={index} fill={ el === 1 ? currColor : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={currColor} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                );
            })
           }
           { showRate ? <p className={styles.rate} style={{ "--rate-color" : currColor}}>{rate}</p> : "" }
        </div>
    );
}

export default Rating;