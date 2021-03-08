const addBtn = document.querySelector(".add");

const text = textarea.value;
//addNote
function addNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
      <div class="tools">
        <button class="edit" id="edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete" id="delete">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="main ${text ? "" : "hiddden"}"></div>
      <textarea name="" id="content" cols="30" rows="10">ad</textarea>
  `;

  // edit and delete
  const editEl = document.querySelector(".edit");
  const deleteEl = document.querySelector(".delete");
  const textarea = document.querySelector("textarea");

  editEl.addEventListener("click", () => {
    textarea.toggleAttribute("readonly");
  });

  deleteEl.addEventListener("click", () => {
    note.remove();
  });

  document.body.appendChild(note);
}

// eventListeners

addBtn.addEventListener("click", addNote);
