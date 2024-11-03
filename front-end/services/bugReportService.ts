const getAllBugReports = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL+ "/bugreports", {
      method: "GET",
      headers: {"Content-Type":"application/json",}
    })
  };

const bugReportService = {
    getAllBugReports,

}

export default bugReportService