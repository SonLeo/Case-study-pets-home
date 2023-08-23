import ProductSection from "./ProductSection";

const Section10 = () => {
    return (
        <ProductSection
            title="Làm đẹp cho cún - miu"
            mainLink={{ href: "/collections/lam-dep", title: "Làm đẹp cho cún - miu" }}
            subLinks={[
                { href: "/collections/sua-tam-cho-cun", title: "Sữa tắm cho cún" },
                { href: "/collections/sua-tam-cho-miu", title: "Sữa tắm cho miu" },
                { href: "/collections/chai-xit-khu-mui", title: "Chai xịt khử mùi" },
                { href: "/collections/cham-soc-tai-mat-mieng", title: "Chăm sóc tai - mắt - miệng" }
            ]}
            apiUrl="http://localhost:3001/api/products"
            categoryFilter="Làm đẹp cho cún - miu"
        />
    )
}

export default Section10;