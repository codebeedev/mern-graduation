import React from "react";
import { useSelector } from "react-redux";
import connectMetaMask from "../../../utils/connectMetaMask";
import PublishModal from "../Modal.Component/Publish.Modal";
import deployAssetOnIPFS from "../utils/deployAssetOnIPFS";
import verifyAsset from "../utils/verifyAsset";
import drawCertificate from "../utils/drawCertificate";
import deployPDFOnIPFS from "../utils/deployPDFOnIPFS";
import loadWeb3 from "../../../utils/loadWeb3";
import Web3 from "web3";
import DigiPosERC721 from "../../../abi.file/DigiPosERC721.json"
import LINK_API from "../../../constants/API";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import download from "downloadjs";

const PublishButton = props => {
    const {
        temp_name,
        temp_description,
        current_file,
        setOnProcess,
        temp_file,
        temp_hash_sha256,
        image_src,
        setCurrentHomeMode
    } = props

    React.useEffect(() => {
        if(temp_file?.type?.includes("pdf")) {
            setCurrentHomeMode("verify")
        }
    }, [temp_file, setCurrentHomeMode])

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

    const [is_publish_modal, setIsPublishModal] = React.useState(false)
    const handleSetIsPublishModal = props => {
        setIsPublishModal(!is_publish_modal)

        setIsFirstStep(false)
        setFirstStepStatus("")
        setFirstStepContent("")
        setTempAssetUri("")
    
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
        setCertiUri("")
        setJsonURI("")
    }

    const bcAddressSlice = useSelector(state => state.bcAddressSlice)
    console.log(process.env);

    const startMintNFTonBSCT = async (json_uri, json, pdf) => {
        setIsFifthStep(true)
        setFifthStepStatus("loading")
        setFifthStepContent("Đăng tranh ảnh lên Binance Smart Chain Testnet")
        const load_web3_result = await loadWeb3()
        setTimeout( async () => {
            if(load_web3_result?.success){
                try {
                    const web3 = new Web3(window.web3.currentProvider)
                    const NFTContract = new web3.eth.Contract(DigiPosERC721, process.env.REACT_APP_NFT_SC_ADDR)
                    const new_token = await NFTContract.methods.getNewItemId().call()

                    if(new_token){
                        try {
                            const temp = await NFTContract.methods.mint(bcAddressSlice?.data, new_token, json_uri).send({from: bcAddressSlice?.data})
                            if(temp){
                                const body = {
                                    json_uri,
                                    ...json,
                                    creator: bcAddressSlice?.data,
                                    owner: bcAddressSlice?.data,
                                    asset_hash: temp_hash_sha256,
                                    certificate_hash: sha256(pdf).toString(),
                                    tx_hash: temp?.transactionHash,
                                    token_id: parseInt(new_token),
                                }

                                await axios({
                                    method: "POST",
                                    url: LINK_API.CREATE_NFT,
                                    data: body
                                })
                                .then(res => {
                                    setIsMinted(true)
                                    setTempTxHash(parseInt(new_token))
                                    download(pdf, "Certificate", "application/pdf")
                                    setFifthStepStatus("success")
                                    setFifthStepContent("Đăng tranh ảnh lên Binance Smart Chain Testnet thành công")
                                    setTimeout(() => {
                                        setIsFinalStep(true)
                                        setFinalStepStatus("success")
                                        setFinalStepContent("Tranh ảnh NFT của bạn đã triển khai trên Binance Smart Chain Testnet")
                                    }, 1000);
                                })
                                .catch(error => {
                                    setFifthStepStatus("error")
                                    setFifthStepContent("Đăng tranh ảnh lên Binance Smart Chain Testnet thất bại")
                                })
                            } 
                            else {
                                setFifthStepStatus("error")
                                setFifthStepContent("Đăng tranh ảnh lên Binance Smart Chain Testnet thất bại")
                            }
                        } catch (error) {
                            setFifthStepStatus("error")
                            setFifthStepContent("Đăng tranh ảnh lên Binance Smart Chain Testnet thất bại")
                        }
                    }
                    else {
                        setFifthStepStatus("error")
                        setFifthStepContent("Mint NFT on Binance Smart Chain Testnet failure")
                    }
                    
                } catch (error) {
                    setFifthStepStatus("error")
                    setFifthStepContent("Mint NFT on Binance Smart Chain Testnet failure")
                }
            }
            else{
                setFifthStepStatus("error")
                setFifthStepContent("Mint NFT on Binance Smart Chain Testnet failure")
            }
        }, 1000);
    }

    const [json_uri, setJsonURI] = React.useState("")

    const startCreateMetadataJson = async (json, pdf) => {
        setIsFourthStep(true)
        setFourthStepStatus("loading")
        setFourthStepContent("Triển khai nội dung tranh ảnh lên IPFS")
        setTimeout( async () => {

            const dictstring = JSON.stringify(json);
            const blob = new Blob([dictstring], { type: "application/json" });
            const deploy_metadata_on_ipfs_result = await deployAssetOnIPFS(blob)
            if(deploy_metadata_on_ipfs_result?.success){
                setFourthStepStatus("success")
                setFourthStepContent("Triển khai nội dung tranh ảnh lên IPFS thành công")
                setJsonURI(deploy_metadata_on_ipfs_result?.data)
                const json_uri = deploy_metadata_on_ipfs_result?.data
                await startMintNFTonBSCT(json_uri, json, pdf)
            }
            else{
                setFourthStepStatus("error")
                setFourthStepContent("Triển khai nội dung tranh ảnh lên IPFS thất bại")
            }
        }, 1000);
    }

    const [certi_uri, setCertiUri] = React.useState("")

    const startDeployPDFOnIpfs = async (pdf, asset_uri) => {
        setThirdStepContent("Triển khai Chứng chỉ lên IPFS")
        setTimeout( async () => {
            const deploy_pdf_on_ipfs_result = await deployPDFOnIPFS(pdf)
            if(deploy_pdf_on_ipfs_result?.success){
                setThirdStepStatus("success")
                setThirdStepContent("Triển khai Chứng chỉ lên IPFS thành công")
                setCertiUri(deploy_pdf_on_ipfs_result?.data)
                const json_metadata = {
                    name: temp_name,
                    description: temp_description,
                    asset_uri: asset_uri,
                    certificate_uri: deploy_pdf_on_ipfs_result?.data,
                    creator: bcAddressSlice?.data,
                }
                await startCreateMetadataJson(json_metadata, pdf)
            }
            else {
                setThirdStepStatus("error")
                setThirdStepContent("Triển khai Chứng chỉ lên IPFS thất bại")
            }
        }, 1000);
    }

    const startDrawCertificate = async (asset_uri) => {
        const body = {
            bcAddressSlice,
            asset_url: asset_uri,
            temp_hash_sha256,
            temp_file,
        }
        setIsThirdStep(true)
        setThirdStepStatus("loading")
        setThirdStepContent("Tạo Chứng chỉ cho tranh ảnh")
        setTimeout( async () => {
            const draw_certificate_result = await drawCertificate(body, temp_name)
            if(draw_certificate_result?.success){
                startDeployPDFOnIpfs(draw_certificate_result?.data, asset_uri)
            }
            else {
                setThirdStepStatus("error")
                setThirdStepContent("Tạo Chứng chỉ cho tranh ảnh thất bại")
            }
        }, 1000);
    }

    const [temp_asset_uri, setTempAssetUri] = React.useState("")

    const startVerifyAsset = async (asset_uri) => {
        setFirstStepStatus("success")
        setFirstStepContent("Triển khai tranh ảnh lên IPFS thành công")
        setTempAssetUri(asset_uri)
        setIsSecondStep(true)
        setSecondStepStatus("loading")
        setSecondStepContent("Đang tiến hành xác thực tranh ảnh")
        setTimeout(async () => {
            const verify_asset_reult = await verifyAsset(asset_uri, temp_hash_sha256, bcAddressSlice?.data)
            if(verify_asset_reult?.success){
                if(verify_asset_reult?.can_create){
                    setSecondStepStatus("success")
                    setSecondStepContent("Xác thực tranh ảnh thành công")
                    await startDrawCertificate(asset_uri)
                }
                else {
                    setIsFinalStep(true)
                    setSecondStepStatus("success")
                    setSecondStepContent("Xác thực tranh ảnh thành công")
                    setIsVerified(true)
                    setTempTxHash(verify_asset_reult?.token_id)
                    if(verify_asset_reult?.is_yours){
                        setFinalStepStatus("success")
                        setFinalStepContent("Bạn đang là chủ sở hữu của tranh ảnh")
                        setVerifyResult("is_yours")
                    }
                    else {
                        setVerifyResult("not_is_yours")
                        setOwnerOfAsset(verify_asset_reult?.owner)
                        setFinalStepContent("Bạn không phải là chủ sở hữu của tranh ảnh")
                        setFinalStepStatus("error")
                    }
                }
            }
            else {
                setSecondStepStatus("error")
                setSecondStepContent("Xác thực tranh ảnh thất bại")
            }
        }, 1000);
    }

    const startPublishNFT = async () => {
        setIsFirstStep(true)
        setFirstStepStatus("loading")
        setFirstStepContent("Đang triển khai tranh ảnh lên IPFS")

        setTimeout(async() => {
            const deploy_asset_on_ipfs_result = await deployAssetOnIPFS(current_file)
            if(deploy_asset_on_ipfs_result?.success){
                await startVerifyAsset(deploy_asset_on_ipfs_result?.data)
            }
            else {
                setFirstStepStatus("error")
                setFirstStepContent("Triển khai lên IPFS thất bại")
            }
        }, 1000);
    }

    const hanldeStartPubLishNFT = async () => {
        if(temp_file?.type?.includes("pdf")){
            handleSetIsPublishModal()
            setTimeout(async() => {
                setIsFirstStep(true)
                setFirstStepStatus("loading")
                setFirstStepContent("Đang xác thực chứng chỉ")
                await verifyAsset("", temp_hash_sha256, bcAddressSlice?.data)
            }, 1000);
        }
        else {
            await handleCheckBcAddress()
        }
    }

    const handleCheckNameAndDes = async () => {
        if(temp_name && temp_description){
            setOnProcess({status: "close"})
            handleSetIsPublishModal()
            await startPublishNFT()
        }
        else {
            setOnProcess({status: "error", title: "Vui lòng điền đầy đủ thông tin"})
        }
    }

    const handleCheckBcAddress = async () => {
        if(bcAddressSlice?.is_connected) {
            const connect_metaMask_result = await connectMetaMask()
            if(connect_metaMask_result?.chainId?.toString() === "97"){
                handleCheckNameAndDes()
            }
            else {
                setOnProcess({status: "error", title: "Vui lòng sử dụng mạng Binance Smat Chain Testnet"})
            }
        }
        else {
            setOnProcess({status: "error", title: "Vui lòng kết nối ví MetaMask"})
        }
       
    }

    const handlePublishNFT = async () => {
        try {
            hanldeStartPubLishNFT()
        } catch (error) {
            setOnProcess({status: "error"})
        }   
    }


    return(
        <div onClick={handlePublishNFT}> 
            <PublishModal
                isOpen={is_publish_modal}
                toggle={handleSetIsPublishModal}
                temp_file={temp_file}
                image_src={image_src}
                is_first_step={is_first_step}
                first_step_status={first_step_status}
                first_step_content={first_step_content}
                temp_asset_uri={temp_asset_uri}

                is_second_step={is_second_step}
                second_step_status={second_step_status}
                second_step_content={second_step_content}

                is_third_step={is_third_step}
                third_step_status={third_step_status}
                third_step_content={third_step_content}
                certi_uri={certi_uri}

                is_fourth_step={is_fourth_step}
                fourth_step_status={fourth_step_status}
                fourth_step_content={fourth_step_content}
                json_uri={json_uri}

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
            />
            Đăng tải
        </div>
    )
}

export default PublishButton