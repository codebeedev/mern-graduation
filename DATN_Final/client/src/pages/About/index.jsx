import React from 'react'
import imgbackground from "../../assets/images/background.png"
import imgAbout from "../../assets/images/imgabout.png"
import "./style.scss"
import {
    PhoneOutlined
} from '@ant-design/icons';

function About() {
    return (
        <div style={{ marginTop: '150px' }} className="container">
            <div className="row">
                <div className="col-md-6 About_left">
                    <img src={imgbackground} alt="" style={{ width: '100%' }} />
                    <img src={imgAbout} alt="" style={{ width: '100%' }} />
                </div>
                <div className="col-md-6">
                    <div className="infoContent">
                        <h1 style={{
                            fontWeight: '700',
                            fontSize: '48px ',
                            fontStyle: 'normal',
                            textTransform: 'none',
                            margin: '0 auto 0 0'
                        }}>About</h1>
                        <div> </div>
                        <div style={{
                            letterSpacing: '0px',
                            lineHeight: '2',
                            fontSize: '1rem',
                            margin: '43px 0 0'
                        }}> Lorem ipsum dolor sit, amet magni, nostrum blanditiis nisi numquam, dolorum eius alias unde incidunt! Consectetur laboriosam facilis fugit totam ad dolores cumque, sit beatae aut voluptates, eos tempore.</div>
                        <div  style={{
                            letterSpacing: '0px',
                            lineHeight: '2',
                            fontSize: '1rem',
                            margin: '43px 0 0',
                            fontWeight: '700',
                        }}>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, totam.</div>
                        <div className='phoneNumber' style={{display:'flex',fontSize :'40px' , alignItems:'center'}}>
                            <PhoneOutlined style={{marginRight:'5px ',color:'#ea8496 !important'}}/>
                            <p style={{margin:'0',fontWeight:'700'}}>+1 (234) 567-8910</p>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default About