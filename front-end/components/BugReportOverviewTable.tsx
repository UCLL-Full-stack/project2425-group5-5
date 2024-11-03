import React, { useState } from 'react';
import { BugReport } from '@types';

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
            <section className="">
              <h2>{bugReport.user.username}</h2>
              <div key={index} onClick={() => handleSelectBugReport(bugReport)} role="button"> 
                <div>{bugReport.title}</div>
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
