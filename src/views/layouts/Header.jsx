import Link from "next/link";
import style from "~/styles/Header.module.css";
import { useUser } from "~/components/userContext";

export default function Header() {
    const { user, logout } = useUser();

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.main}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="logo">
                                <Link href="/">
                                    <img src="/assets/images/brand/logo.png" alt="Company Logo" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className={style.search}>
                                <form className={style.form}>
                                    <input type="text" name="search" placeholder="Tìm kiếm sản phẩm..." className={style.formControl} autoComplete="off" />
                                    <button className={style.btn}>
                                        <img className={style.searchIcon} src="/assets/icons/Search-white.svg" alt="Search Icon" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={style.sales}>
                                <Link href="tel:0866211334">
                                    <div className={`${style.hotline} ${style.salesItem}`}>
                                        <div className={style.salesIcon}><img src="/assets/icons/Phone-white.svg" alt="Phone Icon" /></div>
                                        <div className={style.salesContent}>
                                            <p className={style.salesContentheading}>0866211334</p>
                                            <p className={style.salesContentdesc}>Tổng đài miễn phí</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href='/cart'>
                                    <div className={`${style.cart} ${style.salesItem}`}>
                                        <div className={style.salesIcon}><img src="/assets/icons/ShoppingCart-white.svg" alt="Shopping Cart Icon" /></div>
                                        <div className={style.salesContent}>
                                            <p className={style.salesContentheading}><span className="cart-quantity">(0)</span> Sản phẩm</p>
                                            <p className={style.salesContentdesc}>Giỏ hàng</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className={style.navbar}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className={style.category}>
                                <img className={style.categoryIcon} src="/assets/icons/List-white.svg" alt="Main Menu Icon" />
                                <span className={style.categoryDesc}> Danh mục sản phẩm</span>
                                <ul className={`${style.categoryList} ${style.mainCategory}`}>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/cun" title="Cún cưng">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_dog.png" alt="Cún cưng" />
                                            Cún cưng
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Cún cưng" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryCun}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="thuc-an-hat-cho-cun" title="Thức ăn hạt">
                                                    Thức ăn hạt
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="an-vat-banh-thuong-cho-cun" title="Ăn vặt, bánh thưởng">
                                                    Ăn vặt, bánh thưởng
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="do-choi-cho-cun" title="Đồ chơi">
                                                    Đồ chơi
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="dung-cu-ve-sinh-cho-cun" title="Dụng cụ vệ sinh">
                                                    Dụng cụ vệ sinh
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="pate-do-hop-sua-cho-cun" title="Pate, đồ hộp, sữa">
                                                    Pate, đồ hộp, sữa
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/miu" title="Miu cưng">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_cat.png" alt="Miu cưng" />
                                            Miu cưng
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Miu cưng" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryMiu}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="thuc-an-hat-cho-miu" title="Thức ăn hạt">
                                                    Thức ăn hạt
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="an-vat-banh-thuong-cho-miu" title="Ăn vặt, bánh thưởng">
                                                    Ăn vặt, bánh thưởng
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="do-choi-cho-miu" title="Đồ chơi">
                                                    Đồ chơi
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="dung-cu-ve-sinh-cho-miu" title="Dụng cụ vệ sinh">
                                                    Dụng cụ vệ sinh
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="pate-do-hop-sua-cho-miu" title="Pate, đồ hộp, sữa">
                                                    Pate, đồ hộp, sữa
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/nha-xinh" title="Nhà xinh">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_home.png" alt="Nhà xinh" />
                                            Nhà xinh
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryHome}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="giuong-nem-tham" title="Giường, nệm, thảm">
                                                    Giường, nệm, thảm
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="long-chuong" title="Lồng chuồng">
                                                    Lồng chuồng
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="bat-an" title="Bát ăn">
                                                    Bát ăn
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="binh-nuoc" title="Bình nước">
                                                    Bình nước
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="balo-tui-xach" title="Balo, túi xách">
                                                    Balo, túi xách
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/lam-dep" title="Làm đẹp">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_beauty.png" alt="Làm đẹp" />
                                            Làm đẹp
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryBeauty}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="sua-tam-cho-cun" title="Sữa tắm cho cún">
                                                    Sữa tắm cho cún
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="sua-tam-cho-miu" title="Sữa tắm cho miu">
                                                    Sữa tắm cho miu
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="chai-xit-khu-mui" title="Chai xịt khử mùi">
                                                    Chai xịt khử mùi
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="cham-soc-tai-mat-mieng" title="Chăm sóc tai, mắt, miệng">
                                                    Chăm sóc tai, mắt, miệng
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="luoc-keo-kim-cat-mong" title="Lược, kéo, kìm cắt móng">
                                                    Lược, kéo, kìm cắt móng
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/tu-thuoc" title="Tủ thuốc">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_medicine.png" alt="Tủ thuốc" />
                                            Tủ thuốc
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryMedicine}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="hat-dieu-tri" title="Hạt điều trị">
                                                    Hạt điều trị
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="vitamin" title="Vitamin">
                                                    Vitamin
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="thuoc-tri-ki-sinh" title="Thuốc trị kí sinh">
                                                    Thuốc trị kí sinh
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="thuoc-tri-viem-da" title="Thuốc trị viêm da">
                                                    Thuốc trị viêm da
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="ho-tro-khac" title="Hỗ trợ khác">
                                                    Hỗ trợ khác
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/thoi-trang" title="Thời trang">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_fashion.png" alt="Thời trang" />
                                            Thời trang
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-right.png" alt="Nhà xinh" />
                                        </Link>
                                        <ul className={`${style.categoryList} ${style.subCategory} ${style.subCategoryFashion}`}>
                                            <li className={style.categoryItem}>
                                                <Link href="ao-quan" title="Áo quần">
                                                    Áo quần
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="phu-kien" title="Phụ kiện">
                                                    Phụ kiện
                                                </Link>
                                            </li>
                                            <li className={style.categoryItem}>
                                                <Link href="vong-co-day-dat" title="Vòng cổ, dây dắt">
                                                    Vòng cổ, dây dắt
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                        <Link href="collections/combo-san-pham" title="Combo sản phẩm">
                                            <img className={style.icon} src="/assets/images/products/sub_menu_combo.png" alt="Combo sản phẩm" />
                                            Combo sản phẩm
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <ul className={style.mainNavbar}>
                                <li className={style.navbarItem}>
                                    <Link href="/">Trang chủ</Link>
                                </li>
                                <li className={`${style.navbarItem} ${style.category} ${style.promotion} ${style.hasSubnav}`}>
                                    Khuyến mãi
                                    <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${style.categoryList} ${style.mainCategory}`}>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="gia-tot" title="Mua nhiều giá tốt">
                                                Mua nhiều giá tốt
                                            </Link>
                                        </li>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="deal-soc" title="Deal giá sốc">
                                                Deal giá sốc
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`${style.navbarItem} ${style.category} ${style.service} ${style.hasSubnav}`}>
                                    Dịch vụ chăm sóc
                                    <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${style.categoryList} ${style.mainCategory}`}>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="spa-grooming" title="Spa - Grooming">
                                                Spa - Grooming
                                            </Link>
                                        </li>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="hotel" title="Hotel - Khách sạn thú cưng">
                                                Hotel - Khách sạn thú cưng
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={`${style.navbarItem} ${style.category} ${style.news} ${style.hasSubnav}`}>
                                    Tin tức
                                    <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                    <ul className={`${style.categoryList} ${style.mainCategory}`}>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="tin-khuyen-mai" title="Tin khuyến mãi">
                                                Tin khuyến mãi
                                            </Link>
                                        </li>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="kinh-nghiem-nuoi-thu-cung" title="Kinh nghiệm nuôi thú cưng">
                                                Kinh nghiệm nuôi thú cưng
                                            </Link>
                                        </li>
                                        <li className={`${style.categoryItem} ${style.mainCategoryItem}`}>
                                            <Link href="Tuyen-dung" title="Tuyển dụng">
                                                Tuyển dụng
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={style.navbarItem}>
                                    Liên hệ
                                </li>
                                {
                                    user ? (
                                        <li className={`${style.navbarItem}  ${style.category} ${style.hasSubnav} ${style['user-info']}`}>
                                            <img className={style['user-avatar']} src={user.avatar || "/assets/icons/User-white.svg"} alt="User Avatar" />
                                            <span className={style['user-username']}>{user.username}</span>
                                            <img className={`${style.icon} ${style.arrow}`} src="/assets/icons/Arrow-down.png" alt="Arrow down" />
                                            <ul className={`${style.categoryList} ${style.mainCategory}`}>
                                                <li className={`${style.categoryItem} ${style.mainCategoryItem} ${style['user-setting']}`}>
                                                    <Link href={`/user/${user.id}/Thong-tin-tai-khoan`} title="Thông tin tài khoản">
                                                        <img className={style['user-avatar']} src={user.avatar || "/assets/icons/User-solid.svg"} alt="User Avatar" />
                                                        <span className={style['']}>Thông tin tài khoản</span>
                                                    </Link>
                                                </li>
                                                <li className={`${style.categoryItem} ${style.mainCategoryItem} ${style['user-logout']}`}>
                                                    <button onClick={logout}>
                                                        <img className={`${style['logout-icon']}`} src="/assets/icons/Logout-line.svg" alt="Log out" />
                                                        <span>Đăng xuất</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className={`${style.navbarItem} ${style.navbarUser}`}>
                                            <img className={style.userIcon} src="/assets/icons/User-white.svg" alt="User" />
                                            <div className={style.userAuthentication}>
                                                <Link className={style.userLogin} href='/login'>Đăng nhập</Link>
                                                <span className={style.separate}></span>
                                                <Link className={style.userRegistration} href='/sign-up'>Đăng ký</Link>
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