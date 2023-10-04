import Link from "next/link";
import styles from "./Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from 'react';

export default function Pagination({ totalPages, category, currentPage, selectedSubcategories }) {

    const prevPage = useMemo(() => Math.max(currentPage - 1, 1), [currentPage]);
    const nextPage = useMemo(() => Math.min(currentPage + 1, totalPages), [currentPage, totalPages]);
    
    const prevButtonStyles = useMemo(() => 
        `${styles["filter__page-btn"]} ${currentPage === 1 ? styles["filter__page-btn-disable"] : ""}`, 
        [currentPage]
    );
    const nextButtonStyles = useMemo(() => 
        `${styles["filter__page-btn"]} ${currentPage === totalPages ? styles["filter__page-btn-disable"] : ""}`, 
        [currentPage, totalPages]
    );

    const subcategoriesQueryString = selectedSubcategories && selectedSubcategories.length > 0
        ? `&subcategories=${selectedSubcategories.join(',')}`
        : '';

    return (
        <div className="row">
            <ul className={styles["pagination"]}>
                <li className={styles["pagination-item"]}>
                    <Link href={`/${category.slug}?page=${prevPage}${subcategoriesQueryString}`}>
                        <span className={prevButtonStyles}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </span>
                    </Link>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                        <li 
                            key={index}
                            className={`${styles["pagination-item"]} ${currentPage === page ? styles["pagination-item--active"] : ""}`}
                        >
                            <Link href={`/${category.slug}?page=${page}${subcategoriesQueryString}`}>
                                <span className={styles["pagination-item__link"]}>
                                    {page}
                                </span>
                            </Link>
                        </li>
                    );
                })}

                <li className={styles["pagination-item"]}>
                    <Link href={`/${category.slug}?page=${nextPage}${subcategoriesQueryString}`}>
                        <span className={nextButtonStyles}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
