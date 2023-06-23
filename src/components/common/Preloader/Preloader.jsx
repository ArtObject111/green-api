import React     from "react";

import           "./preloader.scss"
import preloader from "../../../assets/spinner/grid.svg";

let Preloader = (props) => {
    return <div className="preloader-wrapper">
        <div>
            <img src={preloader}/>
        </div>
    </div>

}

export default Preloader;
