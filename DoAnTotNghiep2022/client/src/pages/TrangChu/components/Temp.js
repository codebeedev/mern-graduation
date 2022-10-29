import React from "react";
import PublishModal from "./Publish.Modal";
import { create } from "ipfs-http-client"
import { useSelector } from "react-redux";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import download from "downloadjs";
import QRCode from "qrcode"
import LINK_API from "../../../constants/API";
import axios from "axios";
import ERC721 from "../../../abi.file/ERC721.json"
import Web3 from "web3";
import loadWeb3 from "../../../utils/loadWeb3";
import sha256 from "crypto-js/sha256"

const client = create("https://ipfs.infura.io:5001/api/v0"); 

const PublishButton = props => {
    const {
        temp_description,
        temp_name,
        current_file,
        setOnProcess,
        temp_file,
        temp_hash_sha256,
        image_src
    } = props

    const bcAddressSlice = useSelector(state => state.bcAddressSlice)

    const [is_publish_modal, setIsPublishModal] = React.useState(false)

    const handleSetIsPublishModal = async () => {
        setIsPublishModal(!is_publish_modal)
    }

    const [is_first_process, setIsFirstProcess] = React.useState(false)
    const [first_process_status, setFirstProcessStattus] = React.useState("")
    const [first_process_content, setFirstProcessContent] = React.useState("")

    const [is_second_process, setIsSecondProcess] = React.useState(false)
    const [second_process_status, setSecondProcessStattus] = React.useState("")
    const [second_process_content, setSecondProcessContent] = React.useState("")

    const [is_third_process, setIsThirdProcess] = React.useState(false)
    const [third_process_status, setThirdProcessStattus] = React.useState("")
    const [third_process_content, setThirdProcessContent] = React.useState("")

    const [third_process_sub, setThirdProcessSub] = React.useState("")

    const HOST = process.env.REACT_APP_HOST

    const drawQrCode = async (asset_url) => {
        const asset_cid = asset_url?.split("https://ipfs.infura.io/ipfs/")
        const render_cid = asset_cid[1]
        let url = ""
        if(bcAddressSlice?.data && temp_hash_sha256 && render_cid){
            const qr = {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                margin: 1,
                color: {
                  dark:"#000000",
                  light:"#ffffff"
                }
            }

            QRCode.toDataURL(`${HOST}/verify/${temp_hash_sha256}/${render_cid}`, qr, (error, QRUrl) => {
                if (error) {
                    ;
                }
                else {
                    url = QRUrl
                }
            })
        }

        return url
    }

    const drawPDF = async (asset_url) => {
        let pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
        const fontSize = 30

        const qr_code_image_url = await drawQrCode(asset_url)

        const asset_image_bytes = await fetch(asset_url).then(res => res.arrayBuffer())
        let asset_image
        if(temp_file?.type?.includes("png")){
            asset_image = await pdfDoc.embedPng(asset_image_bytes)
        }
        else {
            asset_image = await pdfDoc.embedJpg(asset_image_bytes)
        }
      
        const page = pdfDoc.addPage()
        const scaled = asset_image.scaleToFit(page.getWidth(),page.getHeight())

        page.drawText('Certificate', {
          x: 235,
          y: page.getHeight() - 50,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
        })

        page.drawImage(asset_image, {
            x: (page.getWidth() / 2) - (scaled.width / 3 / 2),
            y: page.getHeight() - (scaled.height / 3) - 70,
            width: (scaled.width) / 3,
            height: (scaled.height) / 3,

        })

        page.drawText(`Creator: ${bcAddressSlice?.data}`, {
            x: 120,
            y: page.getHeight() - (scaled.height / 3) - 120,
            size: fontSize - 15,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        })

        if(qr_code_image_url){
            const qrBytes = await fetch(qr_code_image_url).then(res => res.arrayBuffer())
            const qr_image = await pdfDoc.embedJpg(qrBytes)

            const scaled_02 = qr_image.scaleToFit(page.getWidth(),page.getHeight())

            page.drawImage(qr_image, {
                x: (page.getWidth() / 2) - (scaled_02.width / 5 / 2),
                y: 70,
                width: (scaled_02.width) / 5,
                height: (scaled_02.height) / 5,
            })

            page.drawText(`Scan to verify`, {
                x: 260,
                y: 50,
                size: fontSize - 16,
                font: timesRomanFont,
                color: rgb(0, 0.53, 0.71),
            })
        }
      
        const pdfBytes = await pdfDoc.save()

        if(pdfBytes){
            return pdfBytes
        }
        else{
            return ""
        }
    }

    const uploadFileToIPFS = async () => {
        try {
            const added = await client.add(current_file)
            if(added?.path){
                return `https://ipfs.infura.io/ipfs/${added.path}`
            }
            else {
                return ""
            }
        } catch (error) {
            ;
            return ""
        }
    }

    const handleCheckNFT = async (asset_uri) => { 
        let success = false
        let data = ""

        await axios({
            method: "POST",
            url: LINK_API.CHECK_NFT,
            data: {
                owner: bcAddressSlice?.data,
                asset_uri,
                hash_sha256: temp_hash_sha256,
            }
        })
        .then(res => {
            data = {...res?.data}
            success = true
        })
        .catch(error => {
            success = false
            ;
        })

        return {
            success,
            ...data,
        }
    }

    const handleUploadCertificateToIPFS = async (draw_pdf_result) => {
        try {
            const buffer = Buffer(draw_pdf_result)
            const added = await client.add(buffer)
            if(added?.path){
                return `https://ipfs.infura.io/ipfs/${added.path}`
            }
            else {
                return ""
            }
        } catch (error) {
            ;
            return ""
        }
    }

    const handleUploadJsonToIPFS = async(file) => {
        try {
            // const buffer = Buffer(file)
            const added = await client.add(file)
            if(added?.path){
                return `https://ipfs.infura.io/ipfs/${added.path}`
            }
            else {
                return ""
            }
        } catch (error) {
            ;
            return ""
        }
    }

    const [render_tx_hash, setRenderTxHash] = React.useState("")

    const handleCreateNFT = async (body, draw_pdf_result) => {
        let success = false
        
        const load_web3_result = await loadWeb3()
        if(load_web3_result?.success){
            try {
                const web3 = new Web3(window.web3.currentProvider)
                const NFTContract = new web3.eth.Contract(ERC721, "0xCa1b91f1D5D392Eae8d3F5D0E5169ab119134439")

                const temp = await NFTContract.methods.mint(body?.json_uri).send({from: bcAddressSlice?.data})

                if(temp){
                    await axios({
                        method: "POST",
                        url: LINK_API.CREATE_NFT,
                        data: {
                            ...body,
                            tx_hash: temp?.transactionHash,
                        },
                    })
                    .then(res => {
                        setRenderTxHash(temp?.transactionHash)
                        download(draw_pdf_result, "Certificate", "application/pdf")
                        setThirdProcessSub("View transaction link")
                        success = true
                    })
                    .catch(error => {
                        success = false
                        ;
                    })

                } 
                else {
                    success = false
                }
            } catch (error) {
                success = false
            }
        }
        else {
            success = false
        }

        return success
    }

    const [first_process_sub, setFirstProcessSub] = React.useState("")

    const handlePublish = async () => {
        if(bcAddressSlice?.is_connected) {
            const web3 = new Web3(window.web3.currentProvider)
            const chainId = await web3.eth.getChainId();
            if(chainId === 97) {
                handleSetIsPublishModal()
                setIsFirstProcess(true)
                setFirstProcessStattus("loading")
                setFirstProcessContent("Upload asset to IPFS")
        
                setTimeout(async () => {
                    const upload_IPFS_result = await uploadFileToIPFS()

                    if(upload_IPFS_result){
                        setFirstProcessContent("Verify NFT")
                        const chekc_nft_result = await handleCheckNFT(upload_IPFS_result)

                        if(chekc_nft_result?.success) {
                            if(chekc_nft_result?.nft_existed){
                                if(chekc_nft_result?.is_yours){
                                    setFirstProcessStattus("success")
                                    setFirstProcessContent("This asset is already yours")
                                }
                                else {
                                    setFirstProcessStattus("error")
                                    setFirstProcessContent("This asset is not yours")
                                    setFirstProcessSub(chekc_nft_result?.current_ower)
                                }
                            }
                            else {
                                setTimeout(async() => {
                                    setFirstProcessStattus("success")
                                    setFirstProcessContent("Verify NFT success")
                                    setIsSecondProcess(true)
                                    setSecondProcessStattus("loading")
                                    setSecondProcessContent("Create certificate")

                                    const draw_pdf_result = await drawPDF(upload_IPFS_result)
                                    if(draw_pdf_result){
                                        setSecondProcessContent("Upload certificate to IPFS")
                                        const upload_certificate_to_ipfs_result = await handleUploadCertificateToIPFS(draw_pdf_result)
                                        if(upload_certificate_to_ipfs_result){
                                            setSecondProcessContent("Create JSON of MetaData")
                                            const json_body = {
                                                name: temp_name,
                                                description: temp_description,
                                                asset_uri: upload_IPFS_result,
                                                certificate_uri: upload_certificate_to_ipfs_result,
                                                creator: bcAddressSlice?.data,
                                            }
                                            const dictstring = JSON.stringify(json_body);
                                            const blob = new Blob([dictstring], { type: "application/json" });

                                            const upload_json_to_ipfs_result = await handleUploadJsonToIPFS(blob)

                                            if(upload_json_to_ipfs_result){
                                                setTimeout(async() => {
                                                    setSecondProcessStattus("success")
                                                    setSecondProcessContent("Create Certificate success")

                                                    setIsThirdProcess(true)
                                                    setThirdProcessStattus("loading")
                                                    setThirdProcessContent("Save data on Blockchain")

                                                    const create_nft_body = {
                                                        name: temp_name,
                                                        description: temp_description,
                                                        creator: bcAddressSlice?.data,
                                                        owner: bcAddressSlice?.data ,
                                                        hash_sha256: temp_hash_sha256,
                                                        asset_uri: upload_IPFS_result,
                                                        certificate_uri: upload_certificate_to_ipfs_result,
                                                        json_uri: upload_json_to_ipfs_result,
                                                        tx_hash: "",
                                                        token_id: "temp",
                                                        certificate_hash_sha256: sha256(draw_pdf_result)?.toString(),
                                                    }
                                                    const create_nft_result = await handleCreateNFT(create_nft_body, draw_pdf_result)
                                                    if(create_nft_result){
                                                        setThirdProcessStattus("success")
                                                        setThirdProcessContent("Your file has been published on our network")
                                                    }
                                                    else {
                                                        setThirdProcessStattus("error")
                                                        setThirdProcessContent("Save data on Blockchain failure")
                                                    }
                                                }, 500);
                                            }
                                            else {
                                                setSecondProcessStattus("error")
                                                setSecondProcessContent("Create JSON of MetaData failure")
                                            }
                                        }
                                        else {
                                            setSecondProcessStattus("error")
                                            setSecondProcessContent("Upload certificate to IPFS failure")
                                        }
                                    }
                                    else {
                                        setSecondProcessStattus("error")
                                        setSecondProcessContent("Create certificate failure")
                                    }
                                }, 500);
                            }
                        }
                        else{
                            setFirstProcessStattus("error")
                            setFirstProcessContent("Check NFT failure")
                        }
                    }
                    else {
                        setFirstProcessStattus("error")
                        setFirstProcessContent("Upload asset to IPFS failure")
                    }
                }, 500);
            }
            else {
                setOnProcess({status: "warning", title: "Check Network"})
            }
        }
        else {
            setOnProcess({status: "warning", title: "Connect MetaMask"})
        }
    }

    const handleCloseModal = () => {
        handleSetIsPublishModal()
        setFirstProcessContent("")
        setFirstProcessStattus("")
        setIsFirstProcess(false)
        setSecondProcessContent("")
        setSecondProcessStattus("")
        setIsSecondProcess(false)
        setThirdProcessContent("")
        setThirdProcessStattus("")
        setIsThirdProcess(false)
    }

    return(
        <div onClick={handlePublish}>
            <PublishModal
                isOpen={is_publish_modal}
                toggle={handleSetIsPublishModal}
                is_first_process={is_first_process}
                first_process_status={first_process_status}
                first_process_content={first_process_content}

                is_second_process={is_second_process}
                second_process_status={second_process_status}
                second_process_content={second_process_content}

                is_third_process={is_third_process}
                third_process_content={third_process_content}
                third_process_status={third_process_status}

                first_process_sub={first_process_sub}
                image_src={image_src}
                handleCloseModal={handleCloseModal}
                third_process_sub={third_process_sub}
                render_tx_hash={render_tx_hash}
            />
            Publish
        </div>
    )
}

export default PublishButton