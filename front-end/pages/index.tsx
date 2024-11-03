import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import React, { useEffect, useState } from 'react';
import bugReportService from '@services/bugReportService';
import BugReportOverviewTable from '@components/BugReportOverviewTable';

import { BugReport, User } from '@types';
import Modal from '@components/Modal';
  
const Home: React.FC = () => {
  const [bugReports, setBugReports] = useState<Array<BugReport>>();
    const [isModalOpen, setModalOpen] = useState(false); 

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); //prevent default submit behaviour
      const testuser: User = {username: "temptestuser", password: "temptestpassword", usertype: "admin"} //haven't added login yet. this will be temporary test user for now.
      const bugreport: BugReport = {user: testuser, title: title, description: description, resolved: false}
      
      bugReportService.addBugReport(bugreport)

      setTitle(''); //clear title and description
      setDescription('');
      setModalOpen(false); //close modal
    };

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

        <button className={styles.addButton} onClick={() => setModalOpen(true)}>
        <p>+</p>
        </button>
        
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div>
                <input  className={styles.input}
                  placeholder='Title'
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
            </div>
            <div>
                <textarea className={styles.input}
                  placeholder='Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
            </div>
            <button className={styles.submitbutton} type="submit">Submit</button>
          </form>
        </Modal>


      </main>
    </>
  );
};

export default Home;
