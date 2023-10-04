import axios from 'axios';
import Footer from '~/views/layouts/footer/Footer';
import Header from '~/views/layouts/header/Header';
import Sidebar from '~/views/layouts/sidebar/sidebar';
import { API_URLS } from '~/utils/commonUtils';
import ProductFilter from '~/components/productFilter/ProductFilter';
import Pagination from '~/components/pagination/Pagination';
import ProductList from '~/components/productList/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubcategories } from '~/rudux/actions/categoryActions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 40;

function CategoryPage({ initialSelectedSubcategories, category, products, categories, subcategories, currentPage }) {
    const dispatch = useDispatch();
    const selectedSubcategories = useSelector(state => state.category.selectedSubcategories)
    const router = useRouter();

    useEffect(() => {
        dispatch(selectSubcategories(initialSelectedSubcategories))
    }, [initialSelectedSubcategories])

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const updatedSelectedSubcategories = checked ? 
            [...selectedSubcategories, value] :
            selectedSubcategories.filter(slug => slug !== value);
        
        dispatch(selectSubcategories(updatedSelectedSubcategories));

        router.push({
            pathname: router.pathname,
            query: { ...router.query, subcategories: updatedSelectedSubcategories.join(',')}
        });
    }

    const filteredProducts = products.filter(product => 
        !selectedSubcategories.length || selectedSubcategories.some(subcatId => product.subcategoryIds.includes(Number(subcatId)))
    );

    const productsToShow = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    return (
        <>
            <Header />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Sidebar categories={categories} subcategories={subcategories} category={category} onCheckboxChange={handleCheckboxChange} selectedSubcategories={selectedSubcategories} />
                        </div>
                        <div className="col-md-9">
                            <ProductFilter totalPages={totalPages} category={category} currentPage={currentPage} selectedSubcategories={selectedSubcategories} />
                            <ProductList products={productsToShow} />
                            <Pagination totalPages={totalPages} category={category} currentPage={currentPage} selectedSubcategories={selectedSubcategories} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const currentPage = context.query.page ? parseInt(context.query.page) : 1;
    const selectedSubcategoriesFromQuery = context.query.subcategories ? context.query.subcategories.split(',').map(slug => slug.trim()) : [];

    try {
        const { data: allProducts } = await axios.get(API_URLS.PRODUCTS);
        const { data: allCategories } = await axios.get(API_URLS.CATEGORIES);
        const { data: allSubcategories } = await axios.get(API_URLS.SUBCATEGORIES);

        const category = allCategories.find(cat => cat.slug === context.params.categoryName);
        const subcategoriesForCategory = allSubcategories.filter(subcat => subcat.categoryIds.includes(category.id));
        const productsInCategory = allProducts.filter(product => product.categoryIds.includes(category.id));

        return {
            props: {
                category,
                products: productsInCategory,
                subcategories: subcategoriesForCategory,
                currentPage,
                categories: allCategories,
                initialSelectedSubcategories: selectedSubcategoriesFromQuery
            }
        }

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return { notFound: true };
    }
}

export default CategoryPage;
