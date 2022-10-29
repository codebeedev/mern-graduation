import React from "react";
import { ColorExtractor } from "react-color-extractor"
import { Spinner } from "reactstrap";

const Product = props => {
    const {render_nft} = props

    const [startBgImgColor, setStartBgImgColor] = React.useState("")
    const [endBgImgColor, setEndBgImgColor] = React.useState("")

    const [is_load_img, setIsLoadImg] = React.useState(true)

    const setBgImg = (e) => {
        setStartBgImgColor(e[0])
        setEndBgImgColor(e[e.length - 1])
    }

    React.useEffect(() => {
        return () => { setIsLoadImg(true) }
    },[])

    return(
        <div className="verify__product">
            <div className="verify__product--contain">
                {
                    render_nft?.asset_uri ?
                    <>
                        <div className="verify__product--img"
                            style={{backgroundImage: `linear-gradient(60deg, ${startBgImgColor} 0%, ${endBgImgColor} 100%)`,}}
                        >
                            <div className="verify__product--imgContain">
                                <ColorExtractor getColors={e => {setBgImg(e)}}>
                                    <img
                                        src={render_nft?.asset_uri ? render_nft?.asset_uri : ""}
                                        alt=""
                                        onLoad={() => {setIsLoadImg(false)}}
                                    />
                                </ColorExtractor >
                                {
                                    is_load_img && !startBgImgColor && !endBgImgColor ?
                                    <div className="verify__product--imgFade">
                                        <Spinner color="light"> 
                                            loading
                                        </Spinner>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </>
                    :
                    <div className="verify__product--img">

                    </div>
                }
            </div>
        </div>
    )
}

export default Product