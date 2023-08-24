import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from '~/styles/Section1.module.css';

const slides = [
    {
        imgSrc: '/assets/images/banner/banner1_web_img1.png',
        path: 'uu-dai-thanh-vien'
    },
    {
        imgSrc: '/assets/images/banner/banner1_web_img2.png',
        path: 'sieu-sale-sinh-nhat-san-pham-ve-sinh'
    },
    {
        imgSrc: '/assets/images/banner/banner1_web_img3.png',
        path: 'sieu-sale-sinh-nhat-hat-pate-banh-thuong'
    }
];

const Section1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentSlide]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <section className='section'>
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                    <Link href={slide.path} >
                        <img
                            key={index}
                            src={slide.imgSrc}
                            alt={`Slide ${index}`}
                            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        />
                    </Link>
                ))}

                <div className={styles.prev} onClick={goToPrevSlide}>
                    <img src="/assets/icons/Arrow-line-left.png" alt="Previous slide" />
                </div>
                <div className={styles.next} onClick={goToNextSlide}>
                    <img src="/assets/icons/Arrow-line-right.png" alt="Next slide" />
                </div>

                <div className={styles.dots}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={index === currentSlide ? styles.activeDot : ''}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Section1;
