/*eslint-env browser*/
/*eslint-env browser */
(() => {
    const employees = [
        ["Sally Smith", "Quality Assurance", 3423],
        ["Mark Martin", "VP Sales", 3346],
        ["John Johnson", "Marketing", 3232],
        ["Ishan Bhoir", "Manager", 3333]
    ];

    // DOM refs
    const $ = (id) => document.getElementById(id);
    let nameEl, titleEl, extEl, countEl, bodyEl, addBtn;

    function setCount() {
        countEl.textContent = `Showing ${employees.length} Employees`;
    }

    function clearErrors() {
        $("nameError").textContent = "";
        $("titleError").textContent = "";
        $("extensionError").textContent = "";
    }

    function clearForm() {
        nameEl.value = "";
        titleEl.value = "";
        extEl.value = "";
        nameEl.focus();
    }

    function validate() {
        clearErrors();
        const name = nameEl.value.trim();
        const title = titleEl.value.trim();
        const ext = extEl.value.trim();

        let ok = true;
        if (!name) {
            $("nameError").textContent = "Name cannot be empty.";
            ok = false;
        }
        if (!title) {
            $("titleError").textContent = "Title cannot be empty.";
            ok = false;
        }
        if (!ext) {
            $("extensionError").textContent = "Extension cannot be empty.";
            ok = false;
        }
        if (ok && !/^\d{3,5}$/.test(ext)) {
            $("extensionError").textContent = "Extension should be 3–5 digits.";
            ok = false;
        }
        return ok ? [name, title, ext] : null;
    }

    function renderTable() {
        bodyEl.textContent = "";
        employees.forEach((emp, idx) => {
            const tr = document.createElement("tr");
            emp.forEach((val) => {
                const td = document.createElement("td");
                td.textContent = val;
                tr.appendChild(td);
            });
            const tdBtn = document.createElement("td");
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn";
            btn.textContent = "Delete";
            btn.addEventListener("click", () => deleteEmployee(idx));
            tdBtn.appendChild(btn);
            tr.appendChild(tdBtn);

            bodyEl.appendChild(tr);
        });
        setCount();
    }

    function addEmployee() {
        const data = validate();
        if (!data) return;
        employees.push(data);
        renderTable();
        clearForm();
    }

    function deleteEmployee(index) {
        employees.splice(index, 1);
        renderTable();
        clearForm();
    }

    function init() {
        nameEl = $("employeeName");
        titleEl = $("title");
        extEl = $("extension");
        countEl = $("employeeCount");
        bodyEl = $("employeeBody");
        addBtn = $("addButton");

        addBtn.addEventListener("click", addEmployee);
        $("employeeForm").addEventListener("submit", (e) => {
            e.preventDefault();
            addEmployee();
        });

        renderTable();
        clearErrors();
        clearForm();
    }

    window.addEventListener("load", init);
})();