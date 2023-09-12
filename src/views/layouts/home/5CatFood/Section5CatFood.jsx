import ProductSection from "~/components/home/ProductSection";
import { API_URLS } from "~/utils/commonUtils";

const Section5 = () => {
    return (
        <ProductSection
            title="Thức ăn hạt cho mèo"
            mainLink={{ href: "/collections/thuc-an-hat-cho-meo", title: "Thức ăn hạt cho mèo" }}
            subLinks={[
                { href: "/collections/thuc-an-hat-cho-meo", title: "Thức ăn hạt cho mèo" },
                { href: "/collections/pate-do-hop-cho-meo", title: "Pate, đồ hộp và sữa" },
                { href: "/collections/an-vat-banh-thuong-cho-meo", title: "Ăn vặt, bánh thưởng" },
                { href: "/collections/do-choi-cho-meo", title: "Đồ chơi" }
            ]}
            apiUrl={API_URLS.PRODUCTS}
            categoryFilter="Thức ăn hạt cho mèo"
        />
    )
}

export default Section5;