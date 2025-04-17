import Users from "@/app/models/user";
import styles from "./page.module.css";
import DashboardHeader from "@/app/ui/dashboard/header/dashboard-header";
import DashboardTabHeaders from "@/app/ui/dashboard/tabs/tab-headers/dashboard-tab-headers";
import DashboardTabContent from "@/app/ui/dashboard/tabs/tab-content/dashboard-tab-content";

// 'params' comes from the URL
export default async function Page({ params }: { params: { username: string } }) {
    const { username } = await params;
    const user = await Users.findOne({ username: username }, "username email favorites history").exec();

    return(
        <div className={`${styles.accountPageGrid}`}>
            <DashboardHeader username={username} />
            <DashboardTabHeaders />
            <DashboardTabContent username={username}/>
        </div>
    )
}