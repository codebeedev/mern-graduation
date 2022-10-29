import React from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import PDFIcon from "../../../assets/image/PDFIcon.png"
import { ColorExtractor } from "react-color-extractor"
import "./index.scss"
import CheckBoldIcon from "mdi-react/CheckBoldIcon"
import CloseThickIcon from "mdi-react/CloseThickIcon"

const PublishModal = props => {

    const {
        isOpen,
        toggle,
        temp_file,
        image_src,
        is_first_step,
        first_step_status,
        first_step_content,

        is_second_step,
        second_step_status,
        second_step_content,

        is_third_step,
        third_step_status,
        third_step_content,

        is_fourth_step,
        fourth_step_status,
        fourth_step_content,

        is_fifth_step,
        fifth_step_status,
        fifth_step_content,

        is_final_step,
        final_step_status,
        final_step_content,
        is_minted,
        is_verified,
        temp_tx_hash,
        owner_of_asset,
        verify_result,
        is_verify_fail,
    } = props

    const [start_color, setStartColor] = React.useState("")
    const [end_color, setEndColor] = React.useState("")

    const getColors = (colors) => {
        setStartColor(colors[0])
        setEndColor(colors[5])
    }

    return(
        <Modal
            centered
            toggle={toggle}
            isOpen={isOpen}
        >
            <ModalHeader toggle={toggle}>
                Publish 
            </ModalHeader>
            <ModalBody className="publishModal__body">
                <div className="publishModal__body--img">
                    <ColorExtractor getColors={getColors}>
                        <img
                            src={temp_file?.type?.includes("pdf") ? PDFIcon : image_src}
                            alt=""
                            style={{
                                backgroundImage: `linear-gradient(315deg, ${start_color}90 0%, ${end_color}90 74%)`,
                                padding: "10px"
                            }}
                        />
                    </ColorExtractor>
                </div>
                <hr/>
                <div className="publishModal__step">
                    <div className="publishModal__step--timeLine"></div>
                    {
                        is_first_step ?
                        <div className="publishModal__stepItem">
                            <div className="publishModal__stepItem--status">
                                <div>
                                    {
                                        first_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        first_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "#28a745"}} />
                                        :
                                        first_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "#dc3545"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {first_step_content}
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_second_step ?
                        <div className="publishModal__stepItem">
                            <div className="publishModal__stepItem--status">
                                <div>
                                    {
                                        second_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        second_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "#28a745"}} />
                                        :
                                        second_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "#dc3545"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {second_step_content}
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_third_step ?
                        <div className="publishModal__stepItem">
                            <div className="publishModal__stepItem--status">
                                <div>
                                    {
                                        third_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        third_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "#28a745"}} />
                                        :
                                        third_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "#dc3545"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {third_step_content}
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_fourth_step ?
                        <div className="publishModal__stepItem">
                            <div className="publishModal__stepItem--status">
                                <div>
                                    {
                                        fourth_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        fourth_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "#28a745"}} />
                                        :
                                        fourth_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "#dc3545"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {fourth_step_content}
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_fifth_step ?
                        <div className="publishModal__stepItem">
                            <div className="publishModal__stepItem--status">
                                <div>
                                    {
                                        fifth_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        fifth_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "#28a745"}} />
                                        :
                                        fifth_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "#dc3545"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {fifth_step_content}
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_final_step ?
                        <div className="publishModal__stepItem final">
                            <div className="publishModal__stepItem--status final">
                                <div className={final_step_status}>
                                    {
                                        final_step_status === "loading" ? 
                                        <Spinner
                                            color="primary"
                                        />
                                        :
                                        final_step_status === "success" ? 
                                        <CheckBoldIcon style={{color: "white"}} />
                                        :
                                        final_step_status === "error" ? 
                                        <CloseThickIcon style={{color: "white"}} />
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="publishModal__stepItem--content">
                                {
                                    is_minted ?
                                    <div className="title minted">
                                        Minted
                                    </div>
                                    :
                                    is_verified ?
                                    <div className="title minted">
                                        Verify success
                                    </div>
                                    :
                                    is_verify_fail ?
                                    <div>
                                        Verify failure
                                    </div>
                                    : null
                                }
                                
                                <div className={`content ${verify_result}`}>
                                    {final_step_content}
                                </div>

                                {
                                    owner_of_asset ?
                                    <div className="content">
                                        The owner is <span style={{fontWeight: "700"}}>
                                            {owner_of_asset?.slice(0, 7 )}...{owner_of_asset?.slice(owner_of_asset?.length - 7, owner_of_asset?.length)}
                                        </span>
                                    </div>
                                    :
                                    null
                                }

                                {
                                    temp_tx_hash ?
                                    <div className="viewTx">
                                       <a href={`https://testnet.bscscan.com/tx/${temp_tx_hash}`} rel="noreferrer" target="_blank" style={{color: "black", fontWeight: "bold"}}>View transaction link</a>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
            </ModalBody>
        </Modal>
    )
}

export default PublishModal