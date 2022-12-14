import errorImg from '../assets/error-img.png'

function ErrorPage() {

    return (
        <div className="container">
            <h2>Erro 404... <br /> Essa página não existe!</h2>
            <img src={errorImg} alt="" className='img-fluid mt-5' />
        </div>
    )

}

export default ErrorPage;