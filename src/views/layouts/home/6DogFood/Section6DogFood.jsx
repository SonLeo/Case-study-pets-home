import ProductSection from "~/components/home/ProductSection";

const Section6 = () => {
    return (
        <ProductSection
            title="Thức ăn hạt cho chó"
            mainLink={{ href: "/collections/thuc-an-hat-cho-cho", title: "Thức ăn hạt cho chó" }}
            subLinks={[
                { href: "/collections/thuc-an-hat-cho-cho", title: "Thức ăn hạt cho chó" },
                { href: "/collections/pate-do-hop-cho-cho", title: "Pate, đồ hộp và sữa" },
                { href: "/collections/an-vat-banh-thuong-cho-cho", title: "Ăn vặt, bánh thưởng" },
                { href: "/collections/do-choi-cho-cho", title: "Đồ chơi" }
            ]}
            apiUrl="http://localhost:3001/api/products"
            categoryFilter="Thức ăn hạt cho chó"
        />
    )
}

export default Section6;