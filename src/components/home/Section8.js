import ProductSection from "./ProductSection";

const Section8 = () => {
    return (
        <ProductSection
            title="Pate, đồ hộp, sữa cho chó"
            mainLink={{ href: "/collections/thuc-an-hat-cho-cho", title: "Pate, đồ hộp, sữa cho chó" }}
            subLinks={[
                { href: "/collections/pate-do-hop-cho-cho", title: "Pate, đồ hộp, sữa" },
                { href: "/collections/thuc-an-hat-cho-cho", title: "Thức ăn hạt" },
                { href: "/collections/an-vat-banh-thuong-cho-cho", title: "Ăn vặt, bánh thưởng" },
                { href: "/collections/do-choi-cho-cho", title: "Đồ chơi" }
            ]}
            apiUrl="http://localhost:3001/api/products"
            categoryFilter="Pate, đồ hộp, sữa cho chó"
        />
    )
}

export default Section8;