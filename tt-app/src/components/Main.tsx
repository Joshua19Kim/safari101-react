import React, { useRef, useEffect } from "react";
import '../assets/css/Main.css';
import SearchAppBar from "./SearchAppBar";


const Main = () => {

    const pageHeader = useRef<HTMLDivElement>(null);





    return (
        <>
            <SearchAppBar/>
            <div
                style={{
                    backgroundImage: `url(${require('../assets/img/daniel-olahh.jpg')})`,
                }}
                className="page-background"
                data-parallax={true}
                ref={pageHeader}

            >
            </div>
        </>

)
}

export default Main;