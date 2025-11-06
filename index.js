import {
  addTask,
  listTasks,
  deleteTask,
  markTaskDone,
  editTask,
} from "./tasks.js";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    const desc = args.slice(1).join(" ");
    if (!desc) {
      console.log("❗ Gunakan: node index.js add \"Deskripsi tugas\"");
      break;
    }
    addTask(desc);
    break;

  case "list":
    listTasks();
    break;

  case "delete":
    const deleteId = parseInt(args[1]);
    if (isNaN(deleteId)) {
      console.log("❗ Gunakan: node index.js delete <id>");
      break;
    }
    deleteTask(deleteId);
    break;

  case "done":
    const doneId = parseInt(args[1]);
    if (isNaN(doneId)) {
      console.log("❗ Gunakan: node index.js done <id>");
      break;
    }
    markTaskDone(doneId);
    break;

  case "edit":
    const editId = parseInt(args[1]);
    const newDesc = args.slice(2).join(" ");
    if (isNaN(editId) || !newDesc) {
      console.log("❗ Gunakan: node index.js edit <id> \"Deskripsi baru\"");
      break;
    }
    editTask(editId, newDesc);
    break;

  default:
    console.log(`
📚 Perintah tersedia:
  node index.js add "Nama tugas"       ➜ Tambah tugas baru
  node index.js list                   ➜ Lihat semua tugas
  node index.js delete <id>            ➜ Hapus tugas
  node index.js done <id>              ➜ Tandai tugas selesai
  node index.js edit <id> "Nama baru"  ➜ Edit nama tugas
`);
}