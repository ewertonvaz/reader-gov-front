import { Link } from 'react-router-dom';

function HomePage() {
    return ( <div>
        <h1>Home Pages</h1>
        <Link to="/dashboard">Dashboard</Link>

        {/* <Link to="/beers">
            <HomeCard title="All Beers" img={beersImg} />
        </Link>
        <Link to="/random-beer">
            <HomeCard title="Random Beer" img={randomBeerImg} />
        </Link>
        <Link to="/new-beer">
            <HomeCard title="New Beer" img={newBeerImg} />
        </Link> */}
    </div> );
}

export default HomePage;