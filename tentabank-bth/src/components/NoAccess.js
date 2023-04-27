import styles from "./NoAccess.module.css"
import LoginForm from "./loginForm"

const NoAccess = (props) => {
    return (
    <div className={styles.no_access_page}>
        <h1>{props.msg}</h1>
        {props.module && <LoginForm/>}
    </div>
    )
}

export default NoAccess