import { useUser } from "~/components/userContext";

const AccountInformation = () => {
    const { user } = useUser();

    return(
        <>
            <h1>Thông tin tài khoản</h1>
            <div>
                <label>Họ tên:</label>
                <span>{user.username}</span>
            </div>
            <div>
                <label>Họ tên:</label>
                <span>{user.username}</span>
            </div>
            <div>
                <label>Họ tên:</label>
                <span>{user.username}</span>
            </div>
        </>
    )
}

export default AccountInformation;