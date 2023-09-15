import axios from 'axios';
import ProductItem from '~/components/productItem/ProductItem';
import { API_URLS } from '~/utils/commonUtils';
import Footer from '~/views/layouts/footer/Footer';
import Header from '~/views/layouts/header/Header';
import styles from '../styles/category.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function CategoryPage({ category, products, subcategories, currentPage, totalPages }) {
    return (
        <>
            <Header />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className={styles['heading']}>Sản phẩm cho {category ? category.name : ''}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className={styles['sidebar']}>
                                <h3 className={styles['sub-heading']}>Phân loại</h3>
                                <ul>
                                    {subcategories && subcategories.map(subcategory => (
                                        <li key={subcategory.id}>
                                            <a href={`/subcategories/${subcategory.slug}`}>{subcategory.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className={styles.filter}>
                                    <span className={styles["filter__title"]}>Sắp xếp theo</span>
                                    <button className={`${styles["filter__btn"]} ${styles.btn}`}>Phổ biến</button>
                                    <button className={`${styles["filter__btn"]} ${styles.btn} ${styles.active}`}>Mới nhất</button>
                                    <button className={`${styles["filter__btn"]} ${styles.btn}`}>Bán chạy</button>
                                    <div className={styles["select-input"]}>
                                        <span className={styles["select-input__lable"]}>giá</span>
                                        <FontAwesomeIcon className={styles["select-input__icon"]} icon={faChevronDown} />
                                        <ul className={styles["select-input__list"]}>
                                            <li className={styles["select-input__item"]}>
                                                <a href="" className={styles["select-input__link"]}>Giá: Thấp đến cao</a>
                                            </li>
                                            <li className={styles["select-input__item"]}>
                                                <a href="" className={styles["select-input__link"]}>Giá: Cao đến thấp</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles["filter__page"]}>
                                        <span className={styles["filter__page-num"]}>
                                            <span className={styles["filter__page-current"]}>1</span>/4
                                        </span>

                                        <div className={styles["filter__page-control"]}>
                                            <a href="" className={`${styles["filter__page-btn"]} ${styles["filter__page-btn-disable"]}`}>
                                                <FontAwesomeIcon icon={faAngleLeft} />
                                            </a>
                                            <a href="" className={styles["filter__page-btn"]}>
                                                <FontAwesomeIcon icon={faAngleRight} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={styles['products']}>
                                    {products.map(product => (
                                        <div key={product.id} className={`col-md-3 ${styles['product-wrapper']}`}>
                                            <ProductItem product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <a key={index} href={`/${category.slug}?page=${index + 1}`}>
                                {index + 1}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const ITEMS_PER_PAGE = 40;
    const categoryName = context.params.categoryName;
    const currentPage = context.query.page ? parseInt(context.query.page) : 1;

    let filteredProducts = [];
    let category = null;
    let subcategoriesForCategory = [];
    let totalPages = 0;

    try {
        const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
            axios.get(API_URLS.PRODUCTS),
            axios.get(API_URLS.CATEGORIES),
            axios.get(API_URLS.SUBCATEGORIES)
        ]);

        const allProducts = productsRes.data;
        category = categoriesRes.data.find(cat => cat.slug === categoryName);

        subcategoriesForCategory = subcategoriesRes.data.filter(subcategory =>
            subcategory.categoryIds.includes(category.id)
        );

        const productsInCategory = allProducts.filter(product =>
            product.categoryIds.includes(category.id)
        );

        totalPages = Math.ceil(productsInCategory.length / ITEMS_PER_PAGE);
        filteredProducts = productsInCategory.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );

    } catch (error) {
        console.error("Error fetching data:", error);
        return { notFound: true };
    }

    return {
        props: {
            category,
            products: filteredProducts,
            subcategories: subcategoriesForCategory,
            currentPage,
            totalPages
        }
    }
}

export default CategoryPage;
