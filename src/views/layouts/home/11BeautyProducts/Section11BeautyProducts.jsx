import ProductSection from "~/components/home/ProductSection";
import { API_URLS } from "~/utils/commonUtils";

const Section11 = () => {
    return (
        <ProductSection
            title="Thuốc, Vitamin và điều trị"
            mainLink={{ href: "/collections/tu-thuoc", title: "Thuốc, Vitamin và điều trị" }}
            subLinks={[
                { href: "/collections/hat-dieu-tri", title: "Hạt điều trị" },
                { href: "/collections/vitamin", title: "Vitamin" },
                { href: "/collections/thuoc-tri-ki-sinh", title: "Thuốc trị kí sinh" },
                { href: "/collections/thuoc-tri-viem-da", title: "Thuốc trị viêm da" }
            ]}
            apiUrl={API_URLS.PRODUCTS}
            categoryFilter="Thuốc, Vitamin và điều trị"
        />
    )
}

export default Section11;