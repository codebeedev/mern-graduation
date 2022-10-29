import React from "react"
import { Col, Row } from "reactstrap"
import PublishButton from "./Publish.Button"
import VerifyButton from "./Verify.Button"
import { ColorExtractor } from "react-color-extractor"
import CloseIcon from "mdi-react/CloseIcon"
import PDFIcon from "../../../assets/image/PDFIcon.png"

const PreviewFile = props => {
    const {
        image_src,
        current_home_mode,
        setCurrentFile,
        current_file,
        setOnProcess,
        temp_file,
        temp_hash_sha256,
        setCurrentHomeMode,
    } = props

    const [start_color, setStartColor] = React.useState("")
    const [end_color, setEndColor] = React.useState("")

    const getColors = (colors) => {
        setStartColor(colors[0])
        setEndColor(colors[5])
    }

    const hanldeClose = () => {
        setCurrentFile("")
    }

    const [temp_name, setTempName] = React.useState("")
    const [temp_description, setTempDescription] = React.useState("")

    return(
        <div className="home__previewFile">
            <div className="home__previewFile--container">
                <Row className="row"
                    style={
                        current_home_mode === "verify" ?
                        {
                            display: "flex", justifyContent: "center"
                        }
                        :
                        null
                    }
                >
                    <Col className="col" xl="6" lg="6" md="6" sm="6" xs="6">
                        <div>
                            <div className="close" onClick={hanldeClose}>
                                <CloseIcon/>
                            </div>
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
                    </Col>
                    {
                        current_home_mode === "publish" ?
                        <Col className="col"  xl="6" lg="6" md="6" sm="6" xs="6">
                            <div>
                                Tên: <input type={"text"} value={temp_name} onChange={e => setTempName(e.target.value)} />
                                <br/>
                                <br/>
                                Mô tả:
                                <br/>
                                <textarea  value={temp_description} onChange={e => setTempDescription(e.target.value)} />
                            </div>
                        </Col>
                        :
                        null
                    }
                    
                </Row>
            </div>
            <div className="home__previewFile--button">
                {
                    current_home_mode === "publish" ?
                    <PublishButton
                        temp_name={temp_name}
                        temp_description={temp_description}
                        current_file={current_file}
                        setOnProcess={setOnProcess}
                        temp_file={temp_file}
                        temp_hash_sha256={temp_hash_sha256}
                        image_src={image_src}
                        setCurrentHomeMode={setCurrentHomeMode}
                    />
                    :
                    current_home_mode === "verify" ?
                    <VerifyButton
                        temp_name={temp_name}
                        temp_description={temp_description}
                        current_file={current_file}
                        setOnProcess={setOnProcess}
                        temp_file={temp_file}
                        temp_hash_sha256={temp_hash_sha256}
                        image_src={image_src}
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default PreviewFile