import axios from 'axios';
import ProductItem from '~/components/productItem/ProductItem';
import { API_URLS } from '~/utils/commonUtils';
import Footer from '~/views/layouts/footer/Footer';
import Header from '~/views/layouts/header/Header';
import styles from '../styles/category.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faAngleLeft, faAngleRight, faListUl, faTags, faArrowUpLong, faArrowDownLong } from '@fortawesome/free-solid-svg-icons';

function CategoryPage({ category, products, categories, subcategories, currentPage, totalPages }) {
    return (
        <>
            <Header />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <nav className={styles['sidebar']}>
                                <div className={styles["categories"]}>
                                    <h3 className={styles['categories-heading']}>
                                        <FontAwesomeIcon className={styles["category-heading-icon"]} icon={faListUl} /> Danh mục
                                    </h3>
                                    <ul className={styles['category-list']}>
                                        {categories.filter(cat => cat.id <= 7).map(cat => (
                                            <li
                                                key={cat.id}
                                                className={`
                                                    ${styles["category-item"]} 
                                                    ${category.slug === cat.slug ? styles["category-item--active"] : ""}
                                                `}
                                            >
                                                <a href={`/${cat.slug}`} className={styles["category-item__link"]}>
                                                    {cat.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles["subcategories"]}>
                                    <h3 className={styles['subcategories-heading']}>
                                        <FontAwesomeIcon className={styles["category-heading-icon"]} icon={faTags} /> Loại sản phẩm
                                    </h3>
                                    <ul className={styles['category-list']}>
                                        {subcategories && subcategories.map(subcategory => (
                                            <li className={styles["category-item"]} key={subcategory.id}>
                                                <a className={styles["category-item__link"]} href={`/subcategories/${subcategory.slug}`}>{subcategory.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className={styles["filter"]}>
                                    <span className={styles["filter__title"]}>Sắp xếp theo</span>
                                    <button className={`${styles["filter__btn"]} ${styles["btn"]}`}>Khuyến mãi</button>
                                    <button className={`${styles["filter__btn"]} ${styles["btn"]} ${styles["active"]}`}>Mới nhất</button>
                                    <button className={`${styles["filter__btn"]} ${styles["btn"]}`}>Bán chạy</button>
                                    <div className={styles["select-input"]}>
                                        <span className={styles["select-input__lable"]}>Giá</span>
                                        <FontAwesomeIcon className={styles["select-input__icon"]} icon={faChevronDown} />
                                        <ul className={styles["select-input__list"]}>
                                            <li className={styles["select-input__item"]}>
                                                <a href="" className={styles["select-input__link"]}>Giá: Thấp đến cao <FontAwesomeIcon className={styles['select-input__link-icon']} icon={faArrowUpLong} /></a>
                                            </li>
                                            <li className={styles["select-input__item"]}>
                                                <a href="" className={styles["select-input__link"]}>Giá: Cao đến thấp <FontAwesomeIcon className={styles['select-input__link-icon']} icon={faArrowDownLong} /></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={styles["filter__page"]}>
                                        <span className={styles["filter__page-num"]}>
                                            Trang: <span className={styles["filter__page-current"]}>{currentPage} </span>/ {totalPages}
                                        </span>

                                        <div className={styles["filter__page-control"]}>
                                            <a
                                                href={`/${category.slug}?page=${Math.max(currentPage - 1, 1)}`}
                                                className={`${styles["filter__page-btn"]} ${currentPage === 1 ? styles["filter__page-btn-disable"] : ""}`}
                                            >
                                                <FontAwesomeIcon icon={faAngleLeft} />
                                            </a>
                                            <a
                                                href={`/${category.slug}?page=${Math.min(currentPage + 1, totalPages)}`}
                                                className={`${styles["filter__page-btn"]} ${currentPage === totalPages ? styles["filter__page-btn-disable"] : ""}`}
                                            >
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
                            <div className="row">
                                <Pagination totalPages={totalPages} category={category} currentPage={currentPage} />
                            </ div >
                        </div >
                    </ div >
                </div >
            </ div >
            <Footer />
        </>
    );
}

export function Pagination({ totalPages, category, currentPage }) {
    return (
        <div className="row">
            <ul className={styles["pagination"]}>
                <li className={styles["pagination-item"]}>
                    <a
                        href={`/${category.slug}?page=${Math.max(currentPage - 1, 1)}`}
                        className={`${styles["filter__page-btn"]} ${currentPage === 1 ? styles["filter__page-btn-disable"] : ""}`}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </a>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => (
                    <li
                        key={index}
                        className={`${styles["pagination-item"]} ${currentPage === index + 1 ? styles["pagination-item--active"] : ""}`}
                    >
                        <a
                            href={`/${category.slug}?page=${index + 1}`}
                            className={styles["pagination-item__link"]}
                        >
                            {index + 1}
                        </a>
                    </li>
                ))}

                <li className={styles["pagination-item"]}>
                    <a
                        href={`/${category.slug}?page=${Math.min(currentPage + 1, totalPages)}`}
                        className={`${styles["filter__page-btn"]} ${currentPage === totalPages ? styles["filter__page-btn-disable"] : ""}`}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </a>
                </li>
            </ul>
        </div>
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
    let categories = [];

    try {
        const [productsRes, categoriesRes, subcategoriesRes, allCategoriesRes] = await Promise.all([
            axios.get(API_URLS.PRODUCTS),
            axios.get(API_URLS.CATEGORIES),
            axios.get(API_URLS.SUBCATEGORIES),
            axios.get(API_URLS.CATEGORIES)
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

        categories = allCategoriesRes.data;

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
            totalPages,
            categories
        }
    }
}


export default CategoryPage;
