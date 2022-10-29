import React from "react";
import "./index.scss"
import TextBoxSearchIcon from "./open-box.png"

const NoDataFound = props => {
    return(
        <div className="noDataFound container">
            <div className="noDataFound__icon">
                <img
                    src={TextBoxSearchIcon}
                    alt=""
                    style={{
                        width: "100px"  
                    }}
                />
            </div>
            <div className="noDataFound__title">
                Không tìm thấy dữ liệu
            </div>
        </div>
    )
}

export default NoDataFound