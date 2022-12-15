//import constImg from '../assets/const-img.png'
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/shared/Spinner"

function HomePage() {
    const [loading, setLoading] = useState(true);
    const sdk = new ChartsEmbedSDK({
        baseUrl: "https://charts.mongodb.com/charts-project-0-dgetj"
    });

    useEffect(() => {
        async function renderDashBoard() {
            const dashBoard = await sdk.createDashboard({
                dashboardId: "639a3eab-9945-4408-8e14-01503947c0a1",
                height: "80vh",
            });
            dashBoard.render(document.getElementById("chart"));
        }
        renderDashBoard();
        setLoading(false);
    }, []);

    return (
        <div className="pt-2">
            {loading && <Spinner />}
            <div id="chart">
            </div>
        </div>
    );
}

export default HomePage;