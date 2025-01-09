import React, { useState } from 'react';
import styles from '@styles/home.module.css';
import { BugReport } from '@types';
import { format } from 'date-fns'
type Props = {
  bugReports: Array<BugReport>;
};

const BugReportOverviewTable: React.FC<Props> = ({ bugReports }: Props) => {
  const [selectedBugReport, setSelectedBugReport] = useState<BugReport | null>(null);

  const handleSelectBugReport = (bugReport: BugReport) => {
    setSelectedBugReport(bugReport);
  };

  return (
    <>
      {bugReports && (
          <div>
            {bugReports.map((bugReport, index) => (
            <section className={styles.report}>
              <h2>{bugReport.user.username + " @ " + format(new Date(bugReport.createdAt!), 'yyyy-MM-dd')} </h2>
              <div key={index} onClick={() => handleSelectBugReport(bugReport)} role="button"> 
                <h4>{bugReport.title}</h4>
                <div>{bugReport.description}</div>
              </div>
            </section>
            ))}
          </div>
      )}
      {/* {selectedBugReport && <UserOverviewTable user={selectedUser}/>} */}
    </>
  );
};

export default BugReportOverviewTable;
