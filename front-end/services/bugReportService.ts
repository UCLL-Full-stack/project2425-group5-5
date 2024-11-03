import { BugReport } from "@types";

const getAllBugReports = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+ "/bugreports", {
      method: "GET",
      headers: {"Content-Type":"application/json",}
    })
  };

const addBugReport = async (bugreport: BugReport) => {
  try{
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL+"/bugreports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type":"application/json"
      },
      body: JSON.stringify(bugreport),
    })
    if (!response.ok) {
      
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

const bugReportService = {
  getAllBugReports,
  addBugReport,

}

export default bugReportService