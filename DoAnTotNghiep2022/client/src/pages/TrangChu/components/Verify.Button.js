// import sha256 from "crypto-js/sha256";
import React from "react";
import { useSelector } from "react-redux";
import PublishModal from "../Modal.Component/Publish.Modal";
import verifyAsset from "../utils/verifyAsset";
import deployPDFOnIPFS from "../utils/deployPDFOnIPFS";

const VerifyButton = props => {
    const {
        // temp_name,
        // temp_description,
        current_file,
        setOnProcess,
        temp_file,
        // temp_hash_sha256,
        image_src,
    } = props

    const [is_first_step, setIsFirstStep] = React.useState(false)
    const [first_step_status, setFirstStepStatus] = React.useState("")
    const [first_step_content, setFirstStepContent] = React.useState("")

    const [is_second_step, setIsSecondStep] = React.useState(false)
    const [second_step_status, setSecondStepStatus] = React.useState("")
    const [second_step_content, setSecondStepContent] = React.useState("")

    const [is_third_step, setIsThirdStep] = React.useState(false)
    const [third_step_status, setThirdStepStatus] = React.useState("")
    const [third_step_content, setThirdStepContent] = React.useState("")

    const [is_fourth_step, setIsFourthStep] = React.useState(false)
    const [fourth_step_status, setFourthStepStatus] = React.useState("")
    const [fourth_step_content, setFourthStepContent] = React.useState("")

    const [is_fifth_step, setIsFifthStep] = React.useState(false)
    const [fifth_step_status, setFifthStepStatus] = React.useState("")
    const [fifth_step_content, setFifthStepContent] = React.useState("")

    const [is_final_step, setIsFinalStep] = React.useState(false)
    const [final_step_status, setFinalStepStatus] = React.useState("")
    const [final_step_content, setFinalStepContent] = React.useState("")
    const [is_minted, setIsMinted] = React.useState(false)
    const [is_verified, setIsVerified] = React.useState(false)
    const [temp_tx_hash, setTempTxHash] = React.useState("")
    const [owner_of_asset, setOwnerOfAsset] = React.useState("")
    const [verify_result, setVerifyResult] = React.useState("")
    const [is_verify_fail, setIsVerifyFail] = React.useState(false)

    const [is_publish_modal, setIsPublishModal] = React.useState(false)
    const handleSetIsPublishModal = props => {
        setIsPublishModal(!is_publish_modal)

        setIsFirstStep(false)
        setFirstStepStatus("")
        setFirstStepContent("")
    
        setIsSecondStep(false)
        setSecondStepStatus("")
        setSecondStepContent("")
    
        setIsThirdStep(false)
        setThirdStepStatus("")
        setThirdStepContent("")
    
        setIsFourthStep(false)
        setFourthStepStatus("")
        setFourthStepContent("")
    
        setIsFifthStep(false)
        setFifthStepStatus("")
        setFifthStepContent("")
    
        setIsFinalStep(false)
        setFinalStepStatus("")
        setFinalStepContent("")
        setIsMinted(false)
        setIsVerified(false)
        setTempTxHash("")
        setOwnerOfAsset("")
        setVerifyResult("")
    }

    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const handleVerify = async () => {
        if(bcAddressSlice?.data) {
            handleSetIsPublishModal()
            setIsFirstStep(true)
            setFirstStepStatus("loading")
            setFirstStepContent("Đang xác thực tranh ảnh kỹ thuật số")

            const temp = await deployPDFOnIPFS(current_file)

            setTimeout(async() => {
                const verify_res = await verifyAsset(temp?.data, temp?.data, bcAddressSlice?.data)
                if(verify_res?.success) {
                    setFirstStepStatus("success")
                    setFirstStepContent("Xác thực tranh ảnh thành công")

                    setIsFinalStep(true)
                    if(verify_res?.can_create) {
                        setFinalStepStatus("error")
                        setIsVerifyFail(true)
                        setFinalStepContent("Tranh ảnh này chưa được đăng tải")
                    }
                    else {
                        setIsVerified(true)
                        setTempTxHash(verify_res?.tx_hash)
                        if(verify_res?.is_yours){
                            setFinalStepStatus("success")
                            setFinalStepContent("Bạn là chủ sở hữu của tranh ảnh")
                            setVerifyResult("is_yours")
                        }
                        else {
                            setVerifyResult("not_is_yours")
                            setOwnerOfAsset(verify_res?.owner)
                            setFinalStepContent("Bạn không phải chủ sở hữu của tranh ảnh")
                            setFinalStepStatus("error")
                        }
                    }
                }
                else {
                    setFirstStepStatus("error")
                    setFirstStepContent("Xác thực tranh ảnh thất bại")
                }
            }, 1000);
        }
        else {
            setOnProcess({status: "error", title: "Vui lòng kết nối MetaMask"})
        }
    }

    return(
        <div onClick={handleVerify}>
            <PublishModal
                isOpen={is_publish_modal}
                toggle={handleSetIsPublishModal}
                temp_file={temp_file}
                image_src={image_src}
                is_first_step={is_first_step}
                first_step_status={first_step_status}
                first_step_content={first_step_content}

                is_second_step={is_second_step}
                second_step_status={second_step_status}
                second_step_content={second_step_content}

                is_third_step={is_third_step}
                third_step_status={third_step_status}
                third_step_content={third_step_content}

                is_fourth_step={is_fourth_step}
                fourth_step_status={fourth_step_status}
                fourth_step_content={fourth_step_content}

                is_fifth_step={is_fifth_step}
                fifth_step_status={fifth_step_status}
                fifth_step_content={fifth_step_content}

                is_final_step={is_final_step}
                final_step_status={final_step_status}
                final_step_content={final_step_content}
                is_minted={is_minted}
                is_verified={is_verified}
                temp_tx_hash={temp_tx_hash}
                owner_of_asset={owner_of_asset}
                verify_result={verify_result}
                is_verify_fail={is_verify_fail}
            />
            Xác thực
        </div>
    )
}

export default VerifyButton