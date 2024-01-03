import Link from "next/link";
import styles from "./Header.module.css";
import { useUser } from "~/components/userContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "~/utils/commonUtils";
import CartDropdown from "../cart/CartDropdown";
import Search from "~/components/toast/search/Search";

export default function Header() {
    const router = useRouter();
    const { user, logout } = useUser();
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isCartHovered, setIsCartHovered] = useState(false);

    useEffect(() => {
        if (user) {
            axios.get(`${API_URLS.CARTS}?userId=${user.id}`)
                .then(response => {
                    if (response.data && response.data.length > 0) {
                        const userCart = response.data[0];
                        setCart(userCart.cartItems);

                        const itemsCount = calculateTotalItems(userCart.cartItems);
                        setTotalItems(itemsCount);
                    }
                })
                .catch(error => {
                    console.error("Error fetching cart:", error);
                })
        }
    }, [user])

    const calculateTotalItems = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        logout();
        router.push('/');
    };

    const handleCartClick = (e) => {
        e.preventDefault();

        if (!user) {
            router.push('/login');
        } else {
            router.push('/cart');
        }
    }

    const handleCartMouseEnter = () => {
        setIsCartHovered(true);
    };

    const handleCartMouseLeave = () => {
        setIsCartHovered(false);
    };

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.main}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="logo">
                                <Link href="/">
                                    <img src="/assets/images/brand/logo.png" alt="Company Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className={styles["main-right"]}>
                                <Search />
                                <div className={styles.sales}>
                                    <Link href="tel:0866211334">
                                        <div className={`${styles.hotline} ${styles.salesItem}`}>
                                            <div className={styles.salesIcon}><img src="/assets/icons/Phone-white.svg" alt="Phone Icon" /></div>
                                            <div className={styles.salesContent}>
                                                <p className={styles.salesContentheading}>0866211334</p>
                                                <p className={styles.salesContentdesc}>Tổng đài miễn phí</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div
                                        className={`${styles.cart} ${styles.salesItem}`}
                                        onClick={handleCartClick}
                                        onMouseEnter={handleCartMouseEnter}
                                        onMouseLeave={handleCartMouseLeave}
                                    >
                                        <div className={styles.salesIcon}>
                                            <img src="/assets/icons/ShoppingCart-white.svg" alt="Shopping Cart Icon" />
                                        </div>
                                        <div className={styles.salesContent}>
                                            <p className={styles.salesContentheading}>
                                                <span className="cart-quantity">({totalItems})</span> Sản phẩm
                                            </p>
                                            <p className={styles.salesContentdesc}>Giỏ hàng</p>
                                        </div>
                                        {isCartHovered &&
                                            <CartDropdown cart={cart} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className={styles.navbar}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className={styles.category}>
                                <img className={styles.categoryIcon} src="/assets/icons/List-white.svg" alt="Main Menu Icon" />
                                <span className={styles.categoryDesc}> Danh mục sản phẩm</span>
                                <ul className={`${styles.categoryList} ${styles.mainCategory}`}>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/cun-cung" title="Cún cưng">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_dog.png" alt="Cún cưng" />
                                            Cún cưng
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Cún cưng" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryCun}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/cun-cung/thuc-an-hat" title="Thức ăn hạt">
                                                    Thức ăn hạt
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/cun-cung/an-vat-banh-thuong" title="Ăn vặt, bánh thưởng">
                                                    Ăn vặt, bánh thưởng
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/cun-cung/do-choi" title="Đồ chơi">
                                                    Đồ chơi
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/cun-cung/dung-cu-ve-sinh" title="Dụng cụ vệ sinh">
                                                    Dụng cụ vệ sinh
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/cun-cung/pate-do-hop-sua" title="Pate, đồ hộp, sữa">
                                                    Pate, đồ hộp, sữa
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/miu-cung" title="Miu cưng">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_cat.png" alt="Miu cưng" />
                                            Miu cưng
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Miu cưng" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryMiu}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/miu-cung/thuc-an-hat" title="Thức ăn hạt">
                                                    Thức ăn hạt
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/miu-cung/an-vat-banh-thuong" title="Ăn vặt, bánh thưởng">
                                                    Ăn vặt, bánh thưởng
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/miu-cung/do-choi" title="Đồ chơi">
                                                    Đồ chơi
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/miu-cung/dung-cu-ve-sinh" title="Dụng cụ vệ sinh">
                                                    Dụng cụ vệ sinh
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/miu-cung/pate-do-hop-sua" title="Pate, đồ hộp, sữa">
                                                    Pate, đồ hộp, sữa
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/nha-xinh" title="Nhà xinh">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_home.png" alt="Nhà xinh" />
                                            Nhà xinh
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryHome}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/nha-xinh/giuong-nem-tham" title="Giường, nệm, thảm">
                                                    Giường, nệm, thảm
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/nha-xinh/long-chuong" title="Lồng chuồng">
                                                    Lồng chuồng
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/nha-xinh/bat-an" title="Bát ăn">
                                                    Bát ăn
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/nha-xinh/binh-nuoc" title="Bình nước">
                                                    Bình nước
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/nha-xinh/balo-tui-xach" title="Balo, túi xách">
                                                    Balo, túi xách
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/lam-dep" title="Làm đẹp">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_beauty.png" alt="Làm đẹp" />
                                            Làm đẹp
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryBeauty}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/lam-dep/sua-tam" title="Sữa tắm cho cún">
                                                    Sữa tắm cho cún
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/lam-dep/sua-tam" title="Sữa tắm cho miu">
                                                    Sữa tắm cho miu
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/lam-dep/chai-xit-khu-mui" title="Chai xịt khử mùi">
                                                    Chai xịt khử mùi
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/lam-dep/cham-soc-tai-mat-mieng" title="Chăm sóc tai, mắt, miệng">
                                                    Chăm sóc tai, mắt, miệng
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/lam-dep/luoc-keo-kim-cat-mong" title="Lược, kéo, kìm cắt móng">
                                                    Lược, kéo, kìm cắt móng
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/tu-thuoc" title="Tủ thuốc">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_medicine.png" alt="Tủ thuốc" />
                                            Tủ thuốc
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryMedicine}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/tu-thuoc/hat-dieu-tri" title="Hạt điều trị">
                                                    Hạt điều trị
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/tu-thuoc/vitamin" title="Vitamin">
                                                    Vitamin
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/tu-thuoc/thuoc-tri-ki-sinh" title="Thuốc trị kí sinh">
                                                    Thuốc trị kí sinh
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/tu-thuoc/thuoc-tri-viem-da" title="Thuốc trị viêm da">
                                                    Thuốc trị viêm da
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/tu-thuoc/ho-tro-khac" title="Hỗ trợ khác">
                                                    Hỗ trợ khác
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/thoi-trang" title="Thời trang">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_fashion.png" alt="Thời trang" />
                                            Thời trang
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${styles.categoryList} ${styles.subCategory} ${styles.subCategoryFashion}`}>
                                            <li className={styles.categoryItem}>
                                                <Link href="/thoi-trang/ao-quan" title="Áo quần">
                                                    Áo quần
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/thoi-trang/phu-kien" title="Phụ kiện">
                                                    Phụ kiện
                                                </Link>
                                            </li>
                                            <li className={styles.categoryItem}>
                                                <Link href="/thoi-trang/vong-co-day-dat" title="Vòng cổ, dây dắt">
                                                    Vòng cổ, dây dắt
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                        <Link href="/combo-san-pham" title="Combo sản phẩm">
                                            <img className={styles.icon} src="/assets/images/products/sub_menu_combo.png" alt="Combo sản phẩm" />
                                            Combo sản phẩm
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <ul className={styles.mainNavbar}>
                                <li className={styles.navbarItem}>
                                    <Link href="/">Trang chủ</Link>
                                </li>
                                <li className={`${styles.navbarItem} ${styles.category} ${styles.promotion} ${styles.hasSubnav}`}>
                                    Khuyến mãi
                                    <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${styles.categoryList} ${styles.mainCategory}`}>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/gia-tot" title="Mua nhiều giá tốt">
                                                Mua nhiều giá tốt
                                            </Link>
                                        </li>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/deal-soc" title="Deal giá sốc">
                                                Deal giá sốc
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`${styles.navbarItem} ${styles.category} ${styles.service} ${styles.hasSubnav}`}>
                                    Dịch vụ chăm sóc
                                    <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${styles.categoryList} ${styles.mainCategory}`}>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/spa-grooming" title="Spa - Grooming">
                                                Spa - Grooming
                                            </Link>
                                        </li>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/hotel" title="Hotel - Khách sạn thú cưng">
                                                Hotel - Khách sạn thú cưng
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`${styles.navbarItem} ${styles.category} ${styles.news} ${styles.hasSubnav}`}>
                                    Tin tức
                                    <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${styles.categoryList} ${styles.mainCategory}`}>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/tin-khuyen-mai" title="Tin khuyến mãi">
                                                Tin khuyến mãi
                                            </Link>
                                        </li>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/kinh-nghiem-nuoi-thu-cung" title="Kinh nghiệm nuôi thú cưng">
                                                Kinh nghiệm nuôi thú cưng
                                            </Link>
                                        </li>
                                        <li className={`${styles.categoryItem} ${styles.mainCategoryItem}`}>
                                            <Link href="/Tuyen-dung" title="Tuyển dụng">
                                                Tuyển dụng
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={styles.navbarItem}>
                                    Liên hệ
                                </li>
                                {
                                    user ? (
                                        <li className={`${styles.navbarItem}  ${styles.category} ${styles.hasSubnav} ${styles['user-info']}`}>
                                            <img className={styles['user-avatar']} src={user.avatar || "/assets/icons/User-white.svg"} alt="User Avatar" />
                                            <span className={styles['user-username']}>{user.username}</span>
                                            <img className={`${styles.icon} ${styles.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                            <ul className={`${styles.categoryList} ${styles.mainCategory}`}>
                                                <li className={`${styles.categoryItem} ${styles.mainCategoryItem} ${styles['user-setting']}`}>
                                                    <Link href={`/account-information`} title="Thông tin tài khoản">
                                                        <img className={styles['user-avatar']} src={user.avatar || "/assets/icons/User-solid.svg"} alt="User Avatar" />
                                                        <span className={styles['']}>Thông tin tài khoản</span>
                                                    </Link>
                                                </li>
                                                <li className={`${styles.categoryItem} ${styles.mainCategoryItem} ${styles['user-order']}`}>
                                                    <Link href={`/order`} title="Đơn mua">
                                                        <img className={styles['user-avatar']} src={user.avatar || "/assets/icons/Full-Cart.svg"} alt="User Order" />
                                                        <span className={styles['']}>Thông tin đơn hàng</span>
                                                    </Link>
                                                </li>
                                                <li className={`${styles.categoryItem} ${styles.mainCategoryItem} ${styles['user-logout']}`}>
                                                    <Link href="/" onClick={handleLogout}>
                                                        <img className={`${styles['logout-icon']}`} src="/assets/icons/Logout-line.svg" alt="Log out" />
                                                        <span>Đăng xuất</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className={`${styles.navbarItem} ${styles.navbarUser}`}>
                                            <img className={styles.userIcon} src="/assets/icons/User-white.svg" alt="User" />
                                            <div className={styles.userAuthentication}>
                                                <Link className={styles.userLogin} href='/login'>Đăng nhập</Link>
                                                <span className={styles.separate}></span>
                                                <Link className={styles.userRegistration} href='/sign-up'>Đăng ký</Link>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}