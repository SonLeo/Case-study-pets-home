import axios from 'axios';
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import styles from "~/styles/ProductSection.module.css";
import ProductItem from "~/components/productItem/ProductItem";
import { API_URLS } from "~/utils/commonUtils";

const ProductSection = ({ title, mainLink, subLinks, apiUrl, categoryFilter }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(API_URLS.CATEGORIES)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const categoryId = getCategoryBySlug(categoryFilter).id;
                const filteredProducts = categoryFilter ? 
                    response.data.filter(product => product.categoryIds.includes(categoryId)) :
                    response.data;
                setProducts(filteredProducts.slice(0, 10));
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [apiUrl, categoryFilter, categories]);

    const getCategoryBySlug = (slug) => {
        return categories.find(category => category.slug === slug) || {};
    };

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles['product-group-top']}>
                            <h2 className={styles['product-group-heading']}>
                                <Link href={mainLink.href} title={title}>{title}</Link>
                            </h2>
                            <ul className={styles['product-group-detail-list']}>
                                {subLinks.map((link, idx) => (
                                    <li key={idx}>
                                        <Link href={link.href} title={link.title}>{link.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`row ${styles['group-products']}`}>
                    <div className={`col-md-12 ${styles['product-list']}`}>
                        {products.map((product, index) => (
                            <div key={index} className={styles['product-item']}>
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSection;
