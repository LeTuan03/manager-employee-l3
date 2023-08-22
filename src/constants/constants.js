export const STATUS = {
    SUCCESS: 200,
    UNAUTHORIZED_ERROR: 401,
    FORBIDDEN_ERROR: 403,
};
export const GENDER = {
    MALE: 0,
    FEMALE: 1,
    OTHER: 2,
};
export const TEAM = {
    FE: 1,
    BE: 2,
    TESTER: 3,
};
export const STATUS_EMPLOYEE = {
    SUBMIT_FILE_SAVE: "0",
    NEW_SAVE: "1",
    PENDING: "2",
    BEEN_APPEOVED: "3",
    ADDITIONAL_REQUIREMENTS: "4",
    REJECT: "5",
    PROFILE_END_REQUEST: "6",
    ACCEPT_REQUEST_END_PROFILE: "7",
    ADDITIONAL_REQUIREMENTS_END_PROFILE: "8",
    REJECT_REQUEST_END_PROFILE: "9",
};
export const STATUS_EMPLOYEE_NUMBER = {
    SUBMIT_FILE_SAVE: 0,
    NEW_SAVE: 1,
    PENDING: 2,
    BEEN_APPEOVED: 3,
    ADDITIONAL_REQUIREMENTS: 4,
    REJECT: 5,
    PROFILE_END_REQUEST: 6,
    ACCEPT_REQUEST_END_PROFILE: 7,
    ADDITIONAL_REQUIREMENTS_END_PROFILE: 8,
    REJECT_REQUEST_END_PROFILE: 9,
};
export const RELATIONSHIP = {
    CHILD: 1,
    PARENTS: 2,
    SIBLINGS: 3,
};
export const ROLE = {
    USER: 4,
    ADMIN: 3,
    MANAGE: 5,
};

export const TYPE_WAITING = {
    PROPOSE: "PROPOSE",
    PROMOTE: "PROMOTE",
    INCREASESALARY: "INCREASESALARY",
    RESUME: "RESUME",
};
export const POSITION = {
    MANAGER: 1,
    LEADER: 2,
};
export const TYPE_PROCESS = 2;
export const ACTIVE_KEY = "1";
export const REGEX = {
    NAME: /^(?!.* {2})[^\d!@#$%^&*()+.=_-]{2,}$/g,
    CITIZEN_IDENTIFICATION_NUMBER: /^(?:\d{9}|\d{12})$/,
    PHONE: /^0\d{9}$/,
    DELETE_SPACE: /^(?!.* {2})\S+(?: \S+)*$/,
    FIELD: /^(?!.* {2})[^\d!@#$%^&*()+.=_]{2,}$/g,
    NAME_CERTIFICATE: /^(?!.* {2})[^!@#$%^&*()+.=,_-]{2,}$/g,
};
export const MESSAGE_ERROR = {
    CITIZEN_IDENTIFICATION_NUMBER: "CMT phải là 9 số, CCCD phải là 12 số!",
    DELETE_SPACE:
        "Không để khoảng trắng ở đầu, cuối và quá nhiều khoảng trắng liên tiếp",
};
export const OPTION_TEAM = [
    {
        value: TEAM.FE,
        label: "Front-end",
    },
    {
        value: TEAM.BE,
        label: "Back-end",
    },
    {
        value: TEAM.TESTER,
        label: "Tester",
    },
];
export const OPTION_GENDER = [
    {
        value: GENDER.MALE,
        label: "Nam",
    },
    {
        value: GENDER.FEMALE,
        label: "Nữ",
    },
    {
        value: GENDER.OTHER,
        label: "Khác",
    },
];
export const OPTION_POSITION = [
    {
        value: 0,
        label: "Giám đốc",
    },
    {
        value: 1,
        label: "Trưởng phòng",
    },
    {
        value: 2,
        label: "Quản lí",
    },
];
export const OPTION_PROPOSE = [
    {
        value: 1,
        label: "Đề xuất",
    },
    {
        value: 2,
        label: "Tham mưu",
    },
];
export const TABLE_PAGINATION = {
    showSizeChanger: true,
    pageSizeOptions: ["1", "10", "20", "30"],
    locale: {
        items_per_page: "bản ghi / trang",
    },
};
