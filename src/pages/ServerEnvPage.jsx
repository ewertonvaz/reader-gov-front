import api from "../api/api"
import { useState, useEffect } from "react";

function ServerEnvPage() {
    const [serverEnv, setServerEnv ] = useState(null);

    useEffect(()=> {
        async function fetchServerEnv() {
            try {
                const response = await api.get("/env");
                setServerEnv(response.data);
                //console.log(Object.keys(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchServerEnv();
    },[]);

    return ( <div>
        { serverEnv && Object.keys(serverEnv).map( envvar => {
            return (
                <p key={envvar}><strong>{envvar} : </strong>{serverEnv[envvar]}</p>
            )
        }) }
    </div> );
}

export default ServerEnvPage;