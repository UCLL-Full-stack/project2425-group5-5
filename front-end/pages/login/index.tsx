import Header from "@components/header";
import Head from "next/head";
import UserLoginForm from "@components/userLoginForm";

const login: React.FC = () => {
    return(
    <>
        <Head>
            <title>BugSquashr</title>
            <meta name="description" content="BugSquashr forms" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Header/>
        <main>
            <section className="p-6 min-h-screen flex flex-col items-center">
                <UserLoginForm />
            </section>
        </main>
    </>
    )
}

export default login;