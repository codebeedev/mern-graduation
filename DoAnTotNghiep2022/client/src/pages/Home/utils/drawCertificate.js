
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode"
import certi_outline  from "../../../assets/image/certi_outline.png"
import DigiposLogo01  from "../../../assets/image/DigiposLogo01.png"

const HOST = process.env.REACT_APP_HOST

const drawQrCode = async (asset_url, bcAddressSlice, temp_hash_sha256) => {
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

const drawCertificate = async (body, temp_name) => {
    const bcAddressSlice = body?.bcAddressSlice
    const asset_url = body?.asset_url
    const temp_hash_sha256 = body?.temp_hash_sha256
    const temp_file = body?.temp_file
    let success = false
    let data = ""

    let pdfDoc = await PDFDocument.create();
    const courierFont = await pdfDoc.embedFont(StandardFonts.Courier)
    const courierBoldFont = await pdfDoc.embedFont(StandardFonts.CourierBold)
    const courierBoldObliqueFont = await pdfDoc.embedFont(StandardFonts.CourierBoldOblique)
    const courierObliqueFont = await pdfDoc.embedFont(StandardFonts.CourierOblique)

    const qr_code_image_url = await drawQrCode(asset_url, bcAddressSlice, temp_hash_sha256)

    const asset_image_bytes = await fetch(asset_url).then(res => res.arrayBuffer())
    const certi_outline_bytes = await fetch(certi_outline).then(res => res.arrayBuffer())
    const certi_outline_image = await pdfDoc.embedJpg(certi_outline_bytes)

    const logo_bytes = await fetch(DigiposLogo01).then(res => res.arrayBuffer())
    const logo_image = await pdfDoc.embedPng(logo_bytes)

    let asset_image
    if(temp_file?.type?.includes("png")){
        asset_image = await pdfDoc.embedPng(asset_image_bytes)
    }
    else {
        asset_image = await pdfDoc.embedJpg(asset_image_bytes)
    }
  
    const page = pdfDoc.addPage()
    const scaled = asset_image.scaleToFit(page.getWidth(),page.getHeight())

    const bg_scaled = certi_outline_image.scaleToFit(page.getWidth(),page.getHeight())

    page.drawImage(certi_outline_image, {
        x: 0,
        y: 0,
        width: (bg_scaled.width) ,
        height: (bg_scaled.height),
    })

    page.drawText('Certificate', {
      x: 200,
      y: page.getHeight() - 50,
      size: 30,
      font: courierBoldObliqueFont,
      color: rgb(0, 0.53, 0.71),
    })

    page.drawImage(asset_image, {
        x: (page.getWidth() / 2) - (scaled.width / 3 / 2),
        y: page.getHeight() - ((scaled.height) / 3) - 70,
        width: (scaled.width) / 3,
        height: (scaled.height) / 3,
    })

    page.drawText(`Name:`, {
        x: 60,
        y: page.getHeight() - (scaled.height / 3) - 120,
        size: 15,
        font: courierFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`${temp_name}`, {
        x: 150,
        y: page.getHeight() - (scaled.height / 3) - 120,
        size: 15,
        font: courierBoldFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`Creator:`, {
        x: 60,
        y: page.getHeight() - (scaled.height / 3) - 150,
        size: 15,
        font: courierFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`${bcAddressSlice?.data}`, {
        x: 150,
        y: page.getHeight() - (scaled.height / 3) - 150,
        size: 15,
        font: courierBoldFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`Nework:`, {
        x: 60,
        y: page.getHeight() - (scaled.height / 3) - 180,
        size: 15,
        font: courierFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`Binance Smart Chain Testnet`, {
        x: 150,
        y: page.getHeight() - (scaled.height / 3) - 180,
        size: 15,
        font: courierBoldFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`Link IPFS:`, {
        x: 60,
        y: page.getHeight() - (scaled.height / 3) - 210,
        size: 15,
        font: courierFont,
        color: rgb(0, 0.53, 0.71),
    })

    page.drawText(`${asset_url}`, {
        x: 60,
        y: page.getHeight() - (scaled.height / 3) - 240,
        size: 11,
        font: courierBoldFont,
        color: rgb(0, 0.53, 0.71),
    })

    const scaled_03 = logo_image.scaleToFit(page.getWidth(),page.getHeight())

    page.drawImage(logo_image, {
        x: 70,
        y: 115,
        width: (scaled_03.width) / 2,
        height: (scaled_03.height) / 2,
    })

    if(qr_code_image_url){
        const qrBytes = await fetch(qr_code_image_url).then(res => res.arrayBuffer())
        const qr_image = await pdfDoc.embedJpg(qrBytes)

        const scaled_02 = qr_image.scaleToFit(page.getWidth(),page.getHeight())

        page.drawImage(qr_image, {
            x: (page.getWidth()) - (scaled_02.width / 5) - 70,
            y: 95,
            width: (scaled_02.width) / 5,
            height: (scaled_02.height) / 5,
        })

        page.drawText(`Scan to verify`, {
            x: (page.getWidth()) - (scaled_02.width / 5) - 70,
            y: 75,
            size: 14,
            font: courierObliqueFont,
            color: rgb(0, 0.53, 0.71),
        })
    }
  
    const pdfBytes = await pdfDoc.save()

    if(pdfBytes){
        success = true
        data = pdfBytes
    }

    return {success, data}
}

export default drawCertificate