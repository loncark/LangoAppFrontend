import { useStore } from "../../state/Store"
import "./AppTitle.css"


export function AppTitle() {
    const { i18n } = useStore();

    return (
        <div id="appTitle" >
            <h1>LanGo</h1>
            <h2>{i18n.t("connect-and-learn")}</h2>
        </div>
    )
}