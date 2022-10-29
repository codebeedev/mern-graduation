import React from "react";
import Dropzone from "./Dropzone"
import PreviewFile from "./Preview.File";

const Upload = props => {
    const {
        current_home_mode,
        setOnProcess,
        setCurrentHomeMode,
    } = props

    const [current_file, setCurrentFile] = React.useState("")
    const [image_src, setImageSrc] = React.useState("")
    const [temp_file, setTempFile] = React.useState("")
    const [temp_hash_sha256, setTempHashSha256] = React.useState("")

    return(
        <div className="home__upload">
            {
                current_file ?
                <PreviewFile
                    image_src={image_src}
                    current_home_mode={current_home_mode}
                    setCurrentFile={setCurrentFile}
                    current_file={current_file}
                    setOnProcess={setOnProcess}
                    temp_file={temp_file}
                    temp_hash_sha256={temp_hash_sha256}
                    setCurrentHomeMode={setCurrentHomeMode}
                />
                :
                <Dropzone setCurrentFile={setCurrentFile}
                    setImageSrc={setImageSrc}
                    setTempFile={setTempFile}
                    setTempHashSha256={setTempHashSha256}
                    setCurrentHomeMode={setCurrentHomeMode}
                />
            }
        </div>
    )
}

export default Upload