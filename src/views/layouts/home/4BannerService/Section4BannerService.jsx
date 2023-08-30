import Link from "next/link";
import styles from "~/styles/ImageSection.module.css"

const Section4 = () => {
    return (
        <div className='section'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <Link href='/blogs/spa-grooming'>
                            <img className={styles['banner-img']} src='/assets/images/banner/banner3_web_img1.png' />
                        </Link>
                    </div>
                    <div className='col-md-6'>
                        <Link href='/blogs/hotel-khach-san-thu-cung'>
                            <img className={styles['banner-img']} src='/assets/images/banner/banner3_web_img2.png' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section4;