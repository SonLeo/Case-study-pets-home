import Link from "next/link";
import styles from "~/styles/SectionImg.module.css"

const Section7 = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link href='/blogs/spa-grooming'>
                        <img className={styles['banner-img']} src='/assets/images/banner/banner4_web_img.png' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section7;