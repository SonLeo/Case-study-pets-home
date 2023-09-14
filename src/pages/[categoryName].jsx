import axios from 'axios';
import ProductItem from '~/components/productItem/ProductItem';
import { API_URLS } from '~/utils/commonUtils';
import Footer from '~/views/layouts/footer/Footer';
import Header from '~/views/layouts/header/Header';

function CategoryPage({ category, products, currentPage, totalPages }) {
    return (
        <>
            <Header />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2>Sản phẩm cho {category.name}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <h3>Danh mục con:</h3>
                        </div>
                    </div>
                    <div>
                        {products.map(product => (
                            <ProductItem product={product} />
                        ))}
                    </div>
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <a href={`?page=${index + 1}`}>{index + 1}</a>
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
    let totalPages = 0;

    try {
        const response = await axios.get(API_URLS.PRODUCTS);
        const allProducts = response.data;

        const productsInCategory = allProducts.filter(product =>
            product.categories.some(cat => cat.slug === categoryName)
        );

        totalPages = Math.ceil(productsInCategory.length / ITEMS_PER_PAGE);
        filteredProducts = productsInCategory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

        if (productsInCategory.length > 0) {
            category = productsInCategory[0].categories.find(cat => cat.slug === categoryName);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return { notFound: true };
    }

    return {
        props: {
            category,
            products: filteredProducts,
            currentPage,
            totalPages
        }
    }
}

export default CategoryPage;
