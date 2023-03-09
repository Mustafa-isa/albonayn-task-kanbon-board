const Add = document.querySelectorAll("button");
const Cols = document.querySelectorAll(".items");
const Col1 = document.querySelector(".column-1");
const Col2 = document.querySelector(".column-2");
const Col3 = document.querySelector(".column-3");
let arr1 = localStorage.getItem("arr1")
    ? JSON.parse(localStorage.getItem("arr1"))
    : [],
  arr2 = localStorage.getItem("arr2")
    ? JSON.parse(localStorage.getItem("arr2"))
    : [],
  arr3 = localStorage.getItem("arr3")
    ? JSON.parse(localStorage.getItem("arr3"))
    : [];
Add.forEach((e, i) => {
  e.addEventListener("click", () => {
    const task = prompt("Write Task");
    if (task === null || task.length === 0) return;
    if (e.dataset.id == 1) arr1.push(task);
    else if (e.dataset.id == 2) arr2.push(task);
    else arr3.push(task);
    Render();
    Save();
  });
});
const DeleteFunc = (id, indx) => {
  if (id === 1) {
    arr1 = arr1.filter((e, idx) => idx !== indx);
  } else if (id === 2) {
    arr2 = arr2.filter((e, idx) => idx !== indx);
  } else {
    arr3 = arr3.filter((e, idx) => idx !== indx);
  }
  Render();
  Save();
};
const EditFunc = (id, indx) => {
  const editMessage = prompt("Edit Message");
  if (id === 1) {
    arr1[indx] = editMessage;
  } else if (id === 2) {
    arr2[indx] = editMessage;
  } else {
    arr3[indx] = editMessage;
  }
  Render();
  Save();
};
const getDragElement = (Col, y) => {
  const Drags = [...Col.querySelectorAll(".item:not(.dragging)")];
  return Drags.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
Cols.forEach((Col) => {
  Col.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragElement(Col, e.clientY);
    const drag = document.querySelector(".dragging");
    if (afterElement == null) {
      Col.appendChild(drag);
    } else {
      Col.insertBefore(drag, afterElement);
    }
  });
  Col.addEventListener("drop", () => {
    Cols.forEach((col) => {
      if (col.classList.contains("column-1")) {
        let newArr = [];
        [...col.children].forEach((child) => newArr.push(child.innerText));
        console.log(newArr);
        arr1 = newArr;
      } else if (col.classList.contains("column-2")) {
        let newArr = [];
        [...col.children].forEach((child) => newArr.push(child.innerText));
        console.log(newArr);
        arr2 = newArr;
      } else {
        let newArr = [];
        [...col.children].forEach((child) => newArr.push(child.innerText));
        console.log(newArr);
        arr3 = newArr;
      }
      Save();
    });
  });
});
const Render = () => {
  Col1.innerHTML = arr1
    .map(
      (e, i) => `<div class="item" data-indx=${i} draggable="true">
  <p class="content">${e}</p>
  <div class="icon">
    <i class="fa-solid fa-pen-to-square" onclick="EditFunc(${1},${i})"></i>
    <i class="fa-solid fa-trash delete" onclick="DeleteFunc(${1},${i})" ></i>
  </div>
</div>`
    )
    .join("");
  Col2.innerHTML = arr2
    .map(
      (e, i) => `<div class="item" data-indx=${i} draggable="true">
  <p class="content">${e}</p>
  <div class="icon">
    <i class="fa-solid fa-pen-to-square"  onclick="EditFunc(${2},${i})"></i>
    <i class="fa-solid fa-trash delete" onclick="DeleteFunc(${2},${i})"></i>
  </div>
</div>`
    )
    .join("");
  Col3.innerHTML = arr3
    .map(
      (e, i) => `<div class="item" data-indx=${i} draggable="true">
  <p class="content">${e}</p>
  <div class="icon">
    <i class="fa-solid fa-pen-to-square" onclick="EditFunc(${3},${i})"></i>
    <i class="fa-solid fa-trash delete" onclick="DeleteFunc(${3},${i})"></i>
  </div>
</div>`
    )
    .join("");

  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });
};
Render();

const Save = () => {
  localStorage.setItem("arr1", JSON.stringify(arr1));
  localStorage.setItem("arr2", JSON.stringify(arr2));
  localStorage.setItem("arr3", JSON.stringify(arr3));
};
