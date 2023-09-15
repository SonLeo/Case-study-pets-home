import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ProductItem from '~/components/productItem/ProductItem';
import styles from './Section3.module.css';
import { API_URLS } from '~/utils/commonUtils';

const Section3Deal = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTabSlides, setCurrentTabSlides] = useState(0);
    const PRODUCTS_PER_SLIDE = 5;

    useEffect(() => {
        // Fetch categories
        axios.get(API_URLS.CATEGORIES)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });

        // Fetch products
        axios.get(API_URLS.PRODUCTS)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            filterProductsByCategory(activeTab);
        }
    }, [products, categories, activeTab]);

    const getCategoryIdBySlug = (slug) => {
        const foundCategory = categories.find(category => category.slug === slug);
        return foundCategory ? foundCategory.id : -1;
    };

    const filterProductsByCategory = (tabIndex) => {
        const categorySlug = tabs[tabIndex].slug;
        const filtered = products.filter(product => product.categoryIds.includes(getCategoryIdBySlug(categorySlug)));
        
        setFilteredProducts(filtered);
        setCurrentTabSlides(Math.ceil(filtered.length / PRODUCTS_PER_SLIDE));
        setCurrentSlide(0);
    };

    const tabs = [
        { name: 'Combo sản phẩm HOT', slug: 'combo-san-pham-hot' },
        { name: 'Thuốc trị ký sinh', slug: 'thuoc-tri-ky-sinh' },
        { name: 'Khuyến mãi Pate cho cún', slug: 'khuyen-mai-pate-cho-cun' },
        { name: 'Khuyến mãi Pate cho miu', slug: 'khuyen-mai-pate-cho-miu' }
    ];

    return (
        <section className='section'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles['section-heading']}>
                            <Link href='/collections/combo-san-pham-hot'>
                                <h2>Deal nổi bật</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <ul className={styles.tabs}>
                            {tabs.map((tab, index) => (
                                <li
                                    key={index}
                                    className={`${styles['tab-item']} ${activeTab === index ? styles.active : ''}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`col-md-12 ${styles['tab-content']}`}>
                        {tabs.map((tab, tabIndex) => (
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
                                                <ProductItem product={product} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.nav}>
                                    <div
                                        className={currentSlide === 0 ? `${styles.prev} ${styles.disabled}` : styles.prev}
                                        onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
                                    >
                                        <img src="/assets/icons/Arrow-line-left.png" alt="Previous slide" />
                                    </div>
                                    <div
                                        className={currentSlide >= currentTabSlides - 1 ? `${styles.next} ${styles.disabled}` : styles.next}
                                        onClick={() => currentSlide < currentTabSlides - 1 && setCurrentSlide(prev => prev + 1)}
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

export default Section3Deal;
