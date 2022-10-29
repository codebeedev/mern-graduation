import React from "react";
import Dropzone from "react-dropzone";
import UploadIcon from "../../../assets/image/UploadIcon.png"
import sha256 from "crypto-js/sha256"

const DropzoneComponent = props => {
    const {
        setCurrentFile,
        setImageSrc,
        setTempFile,
        setTempHashSha256,
        setCurrentHomeMode,
    } = props

    const handleDrop = files => {
        // setCurrentFile(files[0])
        setTempFile(files[0])

        console.log(files[0]);
        if(files[0]?.type?.includes("pdf")){
            console.log("ok");
            setCurrentHomeMode("verify")
        }

        const reader = new FileReader()
        reader.readAsDataURL(files[0])

        reader.onloadend = e => {
            setImageSrc(reader.result)
        }

        const readerAsArrayBuffer = new FileReader();
        readerAsArrayBuffer.readAsArrayBuffer(files[0]);

        readerAsArrayBuffer.onloadend = async () => {
            // this.setState({buffer: Buffer(readerAsArrayBuffer.result), fileName: file.name, isUploaded: true, fileSize: this.handleFileSize(file.size)})

            setCurrentFile(Buffer(readerAsArrayBuffer.result))
        }

        const readAsText = new FileReader()
        readAsText.readAsText(files[0])
        readAsText.onloadend = () => {
            const hash = sha256(readAsText.result)
            setTempHashSha256(hash?.toString())
        }

        
    }

    return(
        <div className="home__dropzone">
            <Dropzone onDrop={handleDrop} accept="image/*, application/pdf">
                    {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <div className="home__dropzone--container">
                            <div className="icon">
                                <img
                                    alt=""
                                    src={UploadIcon}
                                />
                            </div>

                            <div className="title">
                                Drag & Drop files here to upload or
                            </div>

                            <div className="button">
                                <div className="">
                                    Browse file
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
            </Dropzone>
        </div>
    )
}

export default DropzoneComponent