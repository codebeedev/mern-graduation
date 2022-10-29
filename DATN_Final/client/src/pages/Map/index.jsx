import React from 'react';

function Map() {
	return (
		<div className="container">
			<iframe
				title="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5619416639975!2d106.79273196533451!3d10.844797060892185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273e19f4222f%3A0x387417820a1ad26c!2zNDUwIMSQLiBMw6ogVsSDbiBWaeG7h3QsIFTEg25nIE5oxqFuIFBow7ogQSwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1653895504087!5m2!1sen!2s"
				width="100%"
				height="960px"
				style={{ border: '0' }}
				allowFullScreen=""
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
			/>
		</div>
	);
}

export default Map;
