import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "~/components/userContext";
import Member from "~/views/layouts/user/Member";
import EditInfo from "~/views/layouts/user/EditInfo";
import OrderHistory from "~/views/layouts/user/OrderHistory";

const AccountInfo = () => {
    const router = useRouter();
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        if (isClient && !user) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [user, isClient]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    }

    if (loading) {
        return (
            <section className="section">
                <div className="container">
                    <div style={{ width: "200px", height: "200px", margin: "0 auto" }}>
                        <img src="//theme.hstatic.net/1000104513/1000839384/14/loader.svg?v=94" data-lazyload="//product.hstatic.net/1000104513/product/42_368d40acc13249748d72b54845c9d676_large.png" alt="Loading..." />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-xl-6">
                            <Member user={user} formatDate={formatDate} />
                        </div>
                        <div className="col-lg-6 col-xl-6">
                            <EditInfo user={user} onUpdated={setUser} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-xl-12">
                            <OrderHistory userId={user.id} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountInfo;