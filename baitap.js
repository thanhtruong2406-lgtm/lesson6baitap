

const api = "https://mindx-mockup-server.vercel.app/api/resources/Lesson6?apiKey=6ae0b9fc1f31d6fb61127c2d";
const apiKey = "6ae0b9fc1f31d6fb61127c2dY";

// GET 

async function getData(resource) {
    try {
        const response = await fetch(
            `${api}/${resource}?apiKey=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(
                `Lỗi: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        console.log(`Danh sách ${resource}:`, data);

        return data;

    } catch (error) {
        console.error("Lỗi GET:", error.message);
        throw error;
    }
}

// Lấy danh sách users
async function getUsers() {
    return await getData("users");
}

// Lấy danh sách taskStatus
async function getTaskStatus() {
    return await getData("taskStatus");
}

// Lấy danh sách flags
async function getFlags() {
    return await getData("flags");
}

// Lấy danh sách tasks
async function getTasks() {
    return await getData("tasks");
}

// BÀI 2: LỌC DANH SÁCH TASKS

function filterTasks(
    tasks,
    flagId = null,
    statusId = null,
    assignedTo = null
) {
    return tasks.filter((task) => {
        return (
            (flagId === null || task.flagId === flagId) &&
            (statusId === null || task.statusId === statusId) &&
            (assignedTo === null || task.assignedTo === assignedTo)
        );
    });
}

//POST 

async function addData(resource, newData) {
    try {
        const response = await fetch(
            `${api}/${resource}?apiKey=${apiKey}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newData)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Lỗi: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        console.log(`Thêm ${resource} thành công:`, data);

        return data;

    } catch (error) {
        console.error("Lỗi POST:", error.message);
        throw error;
    }
}

//thêm 1 user
async function addUser(user) {
    return await addData("users", user);
}

// Thêm một task
async function addTask(task) {
    return await addData("tasks", task);
}



// PUT 


async function updateData(resource, id, newData) {
    try {
        const response = await fetch(
            `${api}/${resource}/${id}?apiKey=${apiKey}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newData)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Lỗi: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        console.log(`Cập nhật ${resource} thành công:`, data);

        return data;

    } catch (error) {
        console.error("Lỗi PUT:", error.message);
        throw error;
    }
}

// Cập nhật một user
async function updateUser(id, user) {
    return await updateData("users", id, user);
}

// Cập nhật một task
async function updateTask(id, task) {
    return await updateData("tasks", id, task);
}



//  DELETE 

async function deleteTask(id) {
    try {
        const response = await fetch(
            `${api}/tasks/${id}?apiKey=${apiKey}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(
                `Lỗi: ${response.status} ${response.statusText}`
            );
        }

        console.log("Xóa task thành công!");

        return true;

    } catch (error) {
        console.error("Lỗi DELETE:", error.message);
        return false;
    }
}



// BÀI 6: THỰC HÀNH VÀ KIỂM TRA

async function main() {
    try {
        // 1. Lấy danh sách 4 resources
        const usersResponse = await getUsers();

        const statusResponse = await getTaskStatus();

        const flagsResponse = await getFlags();

        const tasksResponse = await getTasks();

        // 2. Lấy mảng tasks từ kết quả API
        const tasks = Array.isArray(tasksResponse)
            ? tasksResponse
            : Array.isArray(tasksResponse?.data)
                ? tasksResponse.data
                : Array.isArray(tasksResponse?.tasks)
                    ? tasksResponse.tasks
                    : Array.isArray(tasksResponse?.data?.tasks)
                        ? tasksResponse.data.tasks
                        : null;

        if (!tasks) {
            console.log(
                "Cần kiểm tra cấu trúc dữ liệu tasks từ API"
            );
            return;
        }

        // 3. Lọc theo flagId
        const filterByFlag = filterTasks(
            tasks, 3, null, null
        );

        console.log("Lọc theo flagId = 3:", filterByFlag);

        // 4. Lọc theo statusId
        const filterByStatus = filterTasks(
            tasks, null, 1, null
        );

        console.log(
            "Lọc theo statusId = 1:",
            filterByStatus
        );

        // 5. Lọc theo assignedTo
        const filterByUser = filterTasks(
            tasks, null, null, 1
        );

        console.log(
            "Lọc theo assignedTo = 1:",
            filterByUser
        );

        // 6. Lọc kết hợp 3 điều kiện
        const filterAll = filterTasks(
            tasks, 3, 1, 1
        );

        console.log(
            "Lọc theo cả 3 điều kiện:",
            filterAll
        );

    } catch (error) {
        console.error("Lỗi chương trình:", error.message);
    }
}


// DỮ LIỆU THỰC HÀNH POST


// User mới để kiểm tra POST
const newUser = {
    userId: 4,
    name: "Test User"
};

// Task mới để kiểm tra POST
const newTask = {
    taskId: 11,
    title: "Test API",
    description: "Thực hành Fetch API Lesson 6",
    statusId: 1,
    flagId: 2,
    assignedTo: 4,
    deadline: "2026-11-01"
};



// CHẠY CHƯƠNG TRÌNH

main();
