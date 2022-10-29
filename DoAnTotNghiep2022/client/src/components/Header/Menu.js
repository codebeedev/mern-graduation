import React from "react";
import { withRouter } from "react-router-dom";
import HomeIcon from "mdi-react/HomeIcon"
import ShoppingIcon from "mdi-react/ShoppingIcon"
import AccountIcon from "mdi-react/AccountIcon"

const Menu = props => {
    const {
        match,
        history
    } = props

    const currentPath = match?.path

    const list_pages = [
        {
            path:"/home",
            title: "Trang chủ",
            icon: <HomeIcon/>
        },
        {
            path:"/marketplace",
            title: "Sàn giao dịch",
            icon: <ShoppingIcon/>
        },
        {
            path:"/profile",
            title: "Bộ sưu tập",
            icon: <AccountIcon/>
        },
    ]

    return(
        <div className="header__menu">
            {
                list_pages.map((page, index) => {
                    const isActived = currentPath === page.path
                    return(<div
                        className={
                            ` 
                                header__menu--item
                                ${isActived ? "actived" : "inactived"}
                            `
                        }
                        key={index}
                        onClick={() => {
                            if(!isActived){
                                history.push(`${page.path}`)
                            }
                        }}
                    >
                        <div className="icon">
                            {page.icon}
                        </div>
                        <div className="title">
                            {page.title}
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default withRouter(Menu)