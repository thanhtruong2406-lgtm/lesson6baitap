const api = "https://jsonplaceholder.typicode.com/todos";

console.log("Đây là ví dụ về Fetch Async");

async function fetchData() {
  try {
    const response = await fetch(api);
    console.log(response);

    if (!response.ok) {
      // Trả ra lỗi cho catch
      throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Em Lỗi:", error.message);
  }
}

fetchData();
