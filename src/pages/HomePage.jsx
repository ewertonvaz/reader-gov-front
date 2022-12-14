//import constImg from '../assets/const-img.png'
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

function HomePage() {
    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-project-0-dgetj"
      });
      const dashBoard = sdk.createDashboard({
        dashboardId: "639a3eab-9945-4408-8e14-01503947c0a1",
        height: 600,
        width: 1200
      });
      dashBoard.render(document.getElementById("chart"));
    return (
        // <div className="container mt-5">
        //     <h3>Página em construção...</h3>
        //     <img src={constImg} alt="" className='w-25 img-fluid mt-5' />
        // </div>
        <div id="chart">
        </div>
    );
}

export default HomePage;