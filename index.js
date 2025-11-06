import { addTask, listTasks, deleteTask } from "./tasks.js";

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
    const id = parseInt(args[1]);
    if (isNaN(id)) {
      console.log("❗ Gunakan: node index.js delete <id>");
      break;
    }
    deleteTask(id);
    break;

  default:
    console.log(`
📚 Perintah tersedia:
  node index.js add "Nama tugas"   ➜ Tambah tugas baru
  node index.js list               ➜ Lihat semua tugas
  node index.js delete <id>        ➜ Hapus tugas
`);
}
