const api = "https://jsonplaceholder.typicode.com/todos";

async function createTodo() {
  try {
    const newTodo = {
      title: "Mind School",
      completed: false,
      userId: 1,
    };

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(
        `Hiện Đang Lỗi: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    console.log("Tạo todo thành công", data);
  } catch (error) {
    console.error("Lỗi khi tạo todo:", error);
  }
}

createTodo();
