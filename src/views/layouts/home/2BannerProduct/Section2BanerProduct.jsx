import React from 'react';
import Link from 'next/link';
import styles from './Section2.module.css';

const Section2 = () => {
    const banners = [
        {
            imgSrc: '/assets/images/banner/banner2_web_img1.png',
            title: 'Sản phẩm',
            subtitle: 'Dành cho cún',
            path: '/collections/cun'
        },
        {
            imgSrc: '/assets/images/banner/banner2_web_img2.png',
            title: 'Sản phẩm',
            subtitle: 'Dành cho miu',
            path: '/collections/miu'
        },
        {
            imgSrc: '/assets/images/banner/banner2_web_img3.png',
            title: 'Tủ thuốc',
            subtitle: 'Cho cún & miu',
            path: '/collections/tu-thuoc'
        }
    ];

    return (
        <section className="section">
            <div className={styles['section_banner_1']}>
                <div className="container">
                    <div className="row">
                        {banners.map((banner, index) => (
                            <div key={index} className="col-md-4">
                                <div className={styles['banner-item']}>
                                    <Link href={banner.path}>
                                        <div className={styles['banner-container']}>
                                            <img src={banner.imgSrc} className="img-fluid w-100" alt="Pet's Home" />
                                            <figcaption className={styles['banner-content']}>
                                                <h4>{banner.title}</h4>
                                                <h3>{banner.subtitle}</h3>
                                            </figcaption>
                                            <button className={styles.button}>Mua ngay</button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2;