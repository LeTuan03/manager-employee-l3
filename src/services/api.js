import axiosCustom from "../utils/axios-customize";
export const searchEmployee = async () => {
    return await axiosCustom(
        "/employee/search?pageIndex=1&pageSize=10&listStatus=3,6,8,9"
    );
};
export const deleteEmployee = async (id) => {
    return await axiosCustom.delete(`/employee/${id}`);
};
export const getEmployeeById = async (id) => {
    return await axiosCustom.get(`/employee/${id}`);
};
export const getToken = async (user) => {
    const response = await axiosCustom.post(
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

export const getCurrentRole = async () => {
    return await axiosCustom.get("/employee/current-role");
};
export const getAllLeader = async () => {
    return await axiosCustom.get("/leader");
};
export const getCertificateByEmployee = async (id) => {
    return await axiosCustom.get(`/certificate?employeeId=${id}`);
};

export const acceptEmployee = async (data) => {
    return await axiosCustom.put(`/employee/${data.id}`, data);
};

export const getListApproved = async () => {
    return await axiosCustom.get(
        "/employee/search?pageIndex=1&pageSize=10&listStatus=3,7"
    );
};
export const getListWaitApprove = async () => {
    return await axiosCustom.get(
        "/employee/search?pageIndex=1&pageSize=10&listStatus=2,6"
    );
};

export const employeeRole = async () => {
    return await axios(
        "/employee/search?pageIndex=1&pageSize=10&listStatus=1,2,4,5"
    );
};
export const createEmployee = (data) => {
    return axios.post("/employee", data);
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

//leader

export const getSalaryIncreaseByCurrentLeader = async () => {
    return await axiosCustom.get("/salary-increase/current-leader");
};

export const getByEmpIdSalary = async (id) => {
    return await axiosCustom.get(`/salary-increase?employeeId=${id}`);
};

export const getProcess = async () => {
    return await axiosCustom.get("/process/current-leader");
};

export const getByEmpIdProcess = async (id) => {
    return await axiosCustom.get(`/process?employeeId=${id}`);
};

export const salaryApprove = async (data) => {
    return await axiosCustom.put(`/salary-increase/${data.id}`, data);
};
export const getProposal = async () => {
    return await axiosCustom.get("/proposal/current-leader");
};
export const getByEmpIdProposal = async (id) => {
    return await axiosCustom.get(`/proposal?employeeId=${id}`);
};

export const acceptPromote = async (data) => {
    return await axiosCustom.put(`/process/${data.id}`, data);
};

export const rejectPromote = async (data) => {
    return await axiosCustom.put(`/process/${data.id}`, data);
};

export const proposalEdit = async (data) => {
    return await axiosCustom.put(`/proposal/${data.id}`, data);
};
