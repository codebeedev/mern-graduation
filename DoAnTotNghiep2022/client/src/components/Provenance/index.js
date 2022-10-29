import React from "react"
import moment from "moment"
import "./index.scss"
import Web3 from "web3"

const Provenance = props => {
    const {render_provenace} = props

    const renderAddr = (address) => {
        let render = ""

        if(address) {
            render = address.slice(0, 7) + "..." + address?.slice(address?.length -7, address?.length)
        }

        return render
    }

    return(
        <div className="provenance__list">
            {
                render_provenace?.map((pro, index) => {
                    const minter = pro?.minter ? pro?.minter : ""
                    const seller = pro?.seller ? pro?.seller : ""
                    const buyer = pro?.buyer ? pro?.buyer : ""
                    const from_address = pro?.from_address ? pro?.from_address : ""
                    const to_address = pro?.to_address ? pro?.to_address : ""
                    const revoker = pro?.revoker ? pro?.revoker : ""

                    return (
                        <div className="provenance__list--item"
                            key={index}
                        >
                            <div className="provenance__list--line"> <div/> </div>

                            <div className="provenance__list--container">
                                <div className="provenance__list--content">
                                    <span>
                                        {
                                            pro.type === "mint" ?
                                            "Tạo bởi"
                                            :
                                            pro.type === "list" ?
                                            "Đăng bán bởi"
                                            :
                                            pro.type === "transfer" ?
                                            "Chuyển từ"
                                            :
                                            pro.type === "purchase" ?
                                            "Mua bởi"
                                            :
                                            pro.type === "revoke" ?
                                            "Thu hồi bởi"
                                            :
                                            null
                                        }
                                    </span>
                                    <span className="address"> 
                                        {" "}
                                        {
                                            pro.type === "mint" ?
                                            renderAddr(minter)
                                            :
                                            pro.type === "list" ?
                                            renderAddr(seller)
                                            :
                                            pro.type === "transfer" ?
                                            renderAddr(from_address)
                                            :
                                            pro.type === "purchase" ?
                                            renderAddr(buyer)
                                            :
                                            pro.type === "revoke" ?
                                            renderAddr(revoker)
                                            :
                                            null
                                        }
                                    </span>
                                    {" "}
                                    {
                                        pro.type === "purchase" || pro.type === "list" ?
                                        "với"
                                        :
                                        null
                                    }
                                    {" "}
                                    <span className="price"> 
                                        {
                                            pro?.buy_price ?
                                            Web3.utils.fromWei(pro?.buy_price?.toString(), "ether") + " BNB" : ""
                                        } 
                                    </span>
                                    {" "}
                                    {
                                        pro.type === "transfer"?
                                        <>
                                            đến <span className="address">{renderAddr(to_address)}</span>
                                        </>
                                        :
                                        null
                                    }
                                </div>
                                <div className="provenance__list--time">
                                    {moment(pro?.time).format("DD/MM/YYYY HH:mm:ss")}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Provenance