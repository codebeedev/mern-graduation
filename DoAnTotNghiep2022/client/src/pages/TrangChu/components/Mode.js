import React from "react";

const Mode = props => {
    const {
        current_home_mode,
        setCurrentHomeMode,
    } = props

    const list_home_mode = [
        {
            id: "publish",
            title: "Đăng tải",
        },
        {
            id: "verify",
            title: "Xác thực",
        }
    ]

    return(
        <div className="home__mode">
            {
                list_home_mode.map((mode, index) => {
                    const is_actived = current_home_mode === mode.id ? "actived" : "inactived"
                    return(
                        <div key={index}
                            className={`home__mode--item ${is_actived}`}
                            onClick={() => {
                                if(!(current_home_mode === mode.id)){
                                    setCurrentHomeMode(mode.id)
                                }
                            }}
                        >
                            {mode.title}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Mode