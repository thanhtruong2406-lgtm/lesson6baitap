const api = "https://jsonplaceholder.typicode.com/todos";
fetch(api)// laf 1 ham do js cung cap de goi API
// cu phap:
//* fetch(api,requestINit)
//* api:(tham so bat buoc la chuoi string chua duong dan APi muon goi den)
//* requestInit (Tham so ko bat buoc laf 1 object dinh nghia thong tin goi nhu la phuong thuc du lieu gui di dinh dang)
//* get voi then  
.then((response) => {
    console.log(response);
    return response.json();// day la 1 phuong thuc tra ve 1 promise no se chuyen du lieu phan hoi thanh dang json (tuc la object mang)
  })
  .then((data) => {
    console.log(data);
  });
