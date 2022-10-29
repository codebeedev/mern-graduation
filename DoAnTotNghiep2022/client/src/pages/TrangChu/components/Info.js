import React from "react";
import { useSelector } from "react-redux";
import Upload from "../assets/upload.png"
import Man from "../assets/man.png"
import Link from "../assets/link.png"

const Info = props => {
    
    const infoSlice = useSelector(state => state.infoSlice)

    console.log(infoSlice);

    return(
        <div className="trangChu__info container">
            <div className="trangChu__info--item">
                <div className="trangChu__info--icon">
                    <img
                        alt=""
                        src={Upload}
                    />
                </div>
                <div className="trangChu__info--value">
                    <span>Lượt đăng tải</span>: <br/>
                    <strong>{infoSlice?.published_nft || 0}</strong>
                </div>
            </div>
            <div className="trangChu__info--item">
                <div className="trangChu__info--icon">
                    <img
                        alt=""
                        src={Man}
                    />
                </div>
                <div className="trangChu__info--value">
                    <span>Lượt xác thực</span>: <br/>
                    <strong>{infoSlice?.verified || 0}</strong>
                </div>
            </div>
            <div className="trangChu__info--item">
                <div className="trangChu__info--icon">
                    <img
                        alt=""
                        src={Link}
                    />
                </div>
                <div className="trangChu__info--value">
                    <span>Tài khoản liên kết</span>: <br/>
                    <strong>{infoSlice?.connected_address || 0}</strong>
                </div>
            </div>
        </div>
    )
}

export default Info