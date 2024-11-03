import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import React, { useEffect, useState } from 'react';
import bugReportService from '@services/bugReportService';
import BugReportOverviewTable from '@components/BugReportOverviewTable';

import { BugReport } from '@types';
  
const Home: React.FC = () => {
  const [bugReports, setBugReports] = useState<Array<BugReport>>();

  const getBugReports = async () => {
      const response = await bugReportService.getAllBugReports();
      const bugReports = await response.json();
      setBugReports(bugReports)
  }

  useEffect(() => {
      getBugReports()
  }, [])

  return (
    <>
      <Head>
        <title>BugSquashr</title>
        <meta name="description" content="BugSquashr forms" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span className={styles.sectiontitle}>
          <h2 className={styles.h2}>
            Bugsquashr home
          </h2>
          <Image
            src="/images/bugsquasrlogo.png"
            alt="Courses Logo"
            width={40}
            height={40}
          />
        </span>

        <div>
          <section>
          {bugReports && (
            <BugReportOverviewTable bugReports={bugReports} />
          )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
