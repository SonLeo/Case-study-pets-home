import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ProductItem from '~/components/productItem/ProductItem';
import styles from './Section3.module.css';

const Section3 = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTabSlides, setCurrentTabSlides] = useState(0);

    const PRODUCTS_PER_SLIDE = 5;

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        changeTab(0);
    }, [products]);

    const filterProductsByCategory = (category) => {
        return products.filter(product => product.categories.includes(category));
    };

    const changeTab = (tabIndex) => {
        setActiveTab(tabIndex);
        setCurrentSlide(0);
        const currentTabProducts = filterProductsByCategory(tabs[tabIndex]);
        setFilteredProducts(currentTabProducts);
        setCurrentTabSlides(Math.ceil(currentTabProducts.length - PRODUCTS_PER_SLIDE + 1));
    };

    const nextSlide = () => {
        if (currentSlide < currentTabSlides - 1) {
            setCurrentSlide(prevSlide => prevSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prevSlide => prevSlide - 1);
        }
    };

    const tabs = ['Combo sản phẩm cho HOT', 'Thuốc trị kí sinh', 'Khuyến mãi Pate cho cún', 'Khuyến mãi Pate cho miu'];

    return (
        <section className='section'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles['section-heading']}>
                            <Link href='/collections/hot-products'>
                                <h2>Deal nổi bật</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <ul className={styles.tabs}>
                            {tabs.map((tabTitle, index) => (
                                <li
                                    key={index}
                                    className={`${styles['tab-item']} ${activeTab === index ? styles.active : ''}`}
                                    onClick={() => changeTab(index)}
                                >
                                    {tabTitle}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`col-md-12 ${styles['tab-content']}`}>
                        {tabs.map((tabTitle, tabIndex) => (
                            <div key={tabIndex} className={`${styles['tab-pane']} ${activeTab === tabIndex ? styles.active : ''}`}>
                                <div className={styles['products-view-grid']}>
                                    <div
                                        className={styles.stage}
                                        style={{
                                            transform: `translateX(-${currentSlide * 261}px)`,
                                            width: `${filteredProducts.length * 261}px`
                                        }}
                                    >
                                        {filteredProducts.map((product, index) => (
                                            <div key={index} className={styles.product}>
                                                <ProductItem
                                                    product={product}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.nav}>
                                    <div
                                        className={currentSlide === 0 ? `${styles.prev} ${styles.disabled}` : styles.prev}
                                        onClick={prevSlide}
                                    >
                                        <img src="/assets/icons/Arrow-line-left.png" alt="Previous slide" />
                                    </div>
                                    <div
                                        className={currentSlide >= currentTabSlides - 1 ? `${styles.next} ${styles.disabled}` : styles.next}
                                        onClick={nextSlide}
                                    >
                                        <img src="/assets/icons/Arrow-line-right.png" alt="Next slide" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section3;