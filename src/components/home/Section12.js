import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "~/styles/Section12.module.css"

const Section12 = () => {
    const [posts, setPosts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3001/api/posts')
            .then(response => {
                setPosts(response.data.slice(-10));
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const POSTS_PER_SLIDE = 5;
    const totalSlides = Math.ceil(posts.length - POSTS_PER_SLIDE + 1);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prevSlide => prevSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prevSlide => prevSlide - 1);
        }
    }

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={styles['section-heading']}>
                            <Link href='/blogs/news'>
                                <h2>Tin mới nhất</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className={styles['section-posts']}>
                            <div className={styles['posts-view-grid']}>
                                <div
                                    className={styles.stage}
                                    style={{
                                        transform: `translateX(-${currentSlide * 261}px)`,
                                        width: `${posts.length * 261}px`
                                    }}
                                >
                                    {posts.map(post => (
                                        <div key={post.id} className={styles.post} title={post.title}>
                                            <Link href={`/post/${post.id}`}>
                                                <img className={styles['post-thumbnail']} src={post.thumbnailImage} alt={post.title} />
                                                <h3 className={styles['post-title']}>{post.title}</h3>
                                                <p className={styles['post-date']}>
                                                    <span className={styles['post-date-icon']}>
                                                        <img src="/assets/icons/Calendar-line.png" />
                                                    </span>
                                                    {post.createDate}
                                                </p>
                                                <p className={styles['post-content']}>{post.content}</p>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.nav}>
                                <div
                                    className={currentSlide === 0 ? `${styles.prev} ${styles.disabled}` : styles.prev}
                                    onClick={prevSlide}
                                >
                                    <img src="/assets/icons/Arrow-line-left.png" alt="Previous slide" />
                                </div>
                                <div
                                    className={currentSlide >= totalSlides - 1 ? `${styles.next} ${styles.disabled}` : styles.next}
                                    onClick={nextSlide}
                                >
                                    <img src="/assets/icons/Arrow-line-right.png" alt="Next slide" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section12;