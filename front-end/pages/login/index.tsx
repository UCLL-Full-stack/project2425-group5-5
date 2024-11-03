import Header from "@components/header";
import Head from "next/head";

const login: React.FC = () => {
    return(
    <>
        <Head>
            <title>BugSquashr</title>
            <meta name="description" content="BugSquashr forms" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
    </>
    )
}

export default login;