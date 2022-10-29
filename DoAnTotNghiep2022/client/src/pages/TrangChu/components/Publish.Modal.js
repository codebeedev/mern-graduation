import React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import CheckBoldIcon from "mdi-react/CheckBoldIcon"
import CloseThickIcon from "mdi-react/CloseThickIcon"

const PublishModal = props => {
    const {
        isOpen,
        is_first_process,
        first_process_status,
        first_process_content,
        is_second_process,
        second_process_status,
        second_process_content,

        is_third_process,
        third_process_content,
        third_process_status,

        first_process_sub,
        image_src,
        handleCloseModal,
        third_process_sub,
        render_tx_hash,
    } = props

    return(
        <Modal isOpen={isOpen} centered
            style={{color: "black"}}
            className="home__modal"
        >
            <ModalBody className="home__alert">
                <div className="home__alert--close">
                    <div onClick={handleCloseModal}>
                        <CloseThickIcon/>
                    </div>
                </div>

                <div className="home__alert--preview">
                    <img
                        alt=""
                        src={image_src}
                    />
                </div>

                <div className="home__alert--alert">
                    <div className="checkbar"></div>
                    {
                        is_first_process ?
                        <div className="home__alert--container">
                            <div className="status-icon"> 
                                {
                                    first_process_status === "loading" ?
                                    <div className={first_process_status}>
                                        <Spinner
                                            color="primary"
                                        />
                                    </div>
                                    :
                                    first_process_status === "success" ?
                                    <div className={first_process_status}>
                                        <CheckBoldIcon/>
                                    </div>
                                    :
                                    first_process_status === "error" ?
                                    <div className={first_process_status}>
                                        <CloseThickIcon/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="alert-content"> {first_process_content} 
                                {
                                    first_process_sub ?
                                    <span
                                        style={{
                                            color: "gray"
                                        }}
                                    >
                                        <br/>
                                        The owner is: <span style={{color: "black", fontWeight: "bold"}}>{first_process_sub?.slice(0,7)}..{first_process_sub?.slice(first_process_sub?.length - 7, first_process_sub?.length)}</span>
                                    </span>
                                    : null                            
                                }
                            </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_second_process ?
                        <div className="home__alert--container">
                            <div className="status-icon"> 
                                {
                                    second_process_status === "loading" ?
                                    <div className={second_process_status}>
                                        <Spinner
                                            color="primary"
                                        />
                                    </div>
                                    :
                                    second_process_status === "success" ?
                                    <div className={second_process_status}>
                                        <CheckBoldIcon/>
                                    </div>
                                    :
                                    second_process_status === "error" ?
                                    <div className={second_process_status}>
                                        <CloseThickIcon/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="alert-content"> {second_process_content} </div>
                        </div>
                        :
                        null
                    }

                    {
                        is_third_process ?
                        <div className="home__alert--container">
                            <div className="status-icon"> 
                                {
                                    third_process_status === "loading" ?
                                    <div className={third_process_status}>
                                        <Spinner
                                            color="primary"
                                        />
                                    </div>
                                    :
                                    third_process_status === "success" ?
                                    <div className={third_process_status}>
                                        <CheckBoldIcon/>
                                    </div>
                                    :
                                    third_process_status === "error" ?
                                    <div className={third_process_status}>
                                        <CloseThickIcon/>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className="alert-content"> {third_process_content} 
                                {
                                    third_process_sub ?
                                    <span
                                        style={{
                                            color: "gray"
                                        }}
                                    >
                                        <br/>
                                        <a href={`https://testnet.bscscan.com/tx/${render_tx_hash}`} rel="noreferrer" target="_blank" style={{color: "black", fontWeight: "bold"}}>{third_process_sub}</a>
                                    </span>
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

//https://testnet.bscscan.com/tx/

export default PublishModal