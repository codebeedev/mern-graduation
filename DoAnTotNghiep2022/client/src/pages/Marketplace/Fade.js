import React from "react";
import Incoming from "./Incoming";

const Fade = props => {
    const {temp_status, nft, setTempStatus} = props

    

    return(
        <div className="fade">


            <div
                className={
                    `
                        ${temp_status}
                        ${nft?.is_sold ? "SOLD" : ""}
                        status
                    `
                }
            >
                {
                    temp_status === "INCOMING" ?
                    <> Sắp diễn ra </>
                    :
                    temp_status === "NOTFORSALE" ?
                    <>Không bán </>
                    :
                    nft?.is_sold ?
                    <>Đã bán</>
                    :
                    null
                }
            </div>
            
            {
                temp_status === "INCOMING"?
                <Incoming
                    nft={nft}
                    setTempStatus={setTempStatus}
                />
                :
                null
            }
        </div>
    )
}

export default Fade