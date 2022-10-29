import React from 'react';
import Slider from 'react-slick';
import './styles.scss';
import banner01 from '../../assets/images/banner-01.jpeg';
import banner02 from '../../assets/images/banner-02.jpeg';
import '../SlideHome/style.css';

function SlideHome() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000
	};
	return (
		<div className="SlideHomeContainer container">
			<div className="row">
				<div className="col-md-8 slider-home">
					<Slider {...settings}>
						<div>
							<img src={banner01} alt="First slide" />
						</div>
						<div>
							<img src={banner02} alt="Second slide" />
						</div>
					</Slider>
				</div>
				<div className="col-md-4 SlideHome_Right">
					<div className="ci-m66-feature-teaser-container">
						<h2 className="ci-m66-feature-title"> To mom with love</h2>
						<div className="ci-m66-feature-intro-text">
							<span className="ci-richtext ci-richtext-text-alignment-left">
								<p>Celebrate mom and all that she means to you with a gift from your heart.</p>{' '}
							</span>
						</div>
						<div className="ci-button-frontpage-large ci-button-filled-black ci-m66-feature-module-button ">
							TOP MOTHER'S DAY GIFTS
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SlideHome;
