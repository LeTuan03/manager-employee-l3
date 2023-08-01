import axios from "../utils/axios-customize";
export const searchEmployee = async (status) => {
    return await axios(
        `/employee/search?pageIndex=1&pageSize=50&listStatus=${status}`
    );
};
export const deleteEmployee = async (id) => {
    return await axios.delete(`/employee/${id}`);
};
export const createEmployee = (data) => {
    return axios.post("/employee", data);
};
export const updateEmployee = (id, data) => {
    return axios.put(`/employee/${id}`, data);
};
export const getEmployeeById = (id) => {
    return axios(`/employee/${id}`);
};
export const getFamilyByEmployeeId = (id) => {
    return axios(`/employee-family?employeeId=${id}`);
};
export const getCertificateByEmployeeId = (id) => {
    return axios(`/certificate?employeeId=${id}`);
};
export const getAccount = async () => {
    return await axios("/employee/current-role");
};
export const updateCertificate = (id, data) => {
    return axios.put(`/certificate/${id}`, data);
};
export const deleteCertificate = (id) => {
    return axios.delete(`/certificate/${id}`);
};
export const createCertificate = (id, data) => {
    return axios.post(`/certificate?employeeId=${id}`, data);
};
export const createFamily = (id, data) => {
    return axios.post(`/employee-family?employeeId=${id}`, data);
};
export const updateFamily = (id, data) => {
    return axios.put(`/employee-family/${id}`, data);
};
export const deleteFamily = (id) => {
    return axios.delete(`/employee-family/${id}`);
};
export const getAvatar = (img) => {
    return axios(`/employee/upload-image/${img}`);
};
export const postAvatar = (img) => {
    let data = new FormData();
    data.append("file", img);
    return axios.post(`/employee/upload-image`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
export const postExp = (id, data) => {
    return axios.post(`/experience?employeeId=${id}`, data);
};
export const deleteExp = (id) => {
    return axios.delete(`/experience/${id}`);
};
export const updateExp = (id, data) => {
    return axios.put(`/experience/${id}`, data);
};
export const getExp = (id) => {
    return axios(`/experience?employeeId=${id}`);
};
export const getAllLeader = async () => {
    return await axios("/leader");
};
//
export const getToken = async (user) => {
    const response = await axios.post(
        "/oauth/token",
        {
            clinet_id: "core_client",
            grant_type: "password",
            client_secret: "secret",
            username: user.username,
            password: user.password,
        },
        {
            headers: {
                Authorization: "Basic Y29yZV9jbGllbnQ6c2VjcmV0",
            },
        }
    );
    return response.data;
};

export const getSalaryByEmp = async (id) => {
    return await axios.get(`/salary-increase?employeeId=${id}`);
};
//thêm tăng lương
export const addSalaryByEmp = async (id, data) => {
    return await axios.post(`/salary-increase?employeeId=${id}`, data);
};
export const updateSalary = async (data) => {
    return await axios.put(`/salary-increase/${data.id}`, data);
};
export const deleteSalary = async (id) => {
    return await axios.delete(`/salary-increase/${id}`);
};

//process
export const getProcessByEmp = async (id) => {
    return await axios.get(`/process?employeeId=${id}`);
};
export const addProcessByEmp = async (id, data) => {
    return await axios.post(`/process?employeeId=${id}`, data);
};
export const updateProcess = async (data) => {
    return await axios.put(`/process/${data.id}`, data);
};
export const deleteProcess = async (id) => {
    return await axios.delete(`/process/${id}`);
};

//proposal

export const getProposalByEmp = async (id) => {
    return await axios.get(`/proposal?employeeId=${id}`);
};

export const addProposalByEmp = async (id, data) => {
    return await axios.post(`/proposal?employeeId=${id}&page=1&size=20`, data);
};
export const updateProposal = async (data) => {
    return await axios.put(`/proposal/${data.id}`, data);
};
export const deleteProposal = async (id) => {
    return await axios.delete(`/proposal/${id}`);
};

//leader

export const getLeader = async () => {
    return await axios.get(`/leader`);
};
//SUBMISSION OF DOCUMENTS

export const submitAndSaveResume = async (data) => {
    return await axios.put(`/employee/${data.id}`, data);
};

//leader

export const getSalaryIncreaseByCurrentLeader = async () => {
    return await axios.get("/salary-increase/current-leader");
};

export const getByEmpIdSalary = async (id) => {
    return await axios.get(`/salary-increase?employeeId=${id}`);
};

export const getProcess = async () => {
    return await axios.get("/process/current-leader");
};

export const getByEmpIdProcess = async (id) => {
    return await axios.get(`/process?employeeId=${id}`);
};

export const salaryApprove = async (data) => {
    return await axios.put(`/salary-increase/${data.id}`, data);
};
export const getProposal = async () => {
    return await axios.get("/proposal/current-leader");
};
export const getByEmpIdProposal = async (id) => {
    return await axios.get(`/proposal?employeeId=${id}`);
};

export const acceptPromote = async (data) => {
    return await axios.put(`/process/${data.id}`, data);
};

export const rejectPromote = async (data) => {
    return await axios.put(`/process/${data.id}`, data);
};

export const proposalEdit = async (data) => {
    return await axios.put(`/proposal/${data.id}`, data);
};
export const acceptEmployee = async (data) => {
    return await axios.put(`/employee/${data.id}`, data);
};
