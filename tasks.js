import { promises as fs } from "fs";
import path from "path";

const filePath = path.resolve("./tasks.json");

// Membaca file JSON
async function readTasks() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // Jika file belum ada, kembalikan array kosong
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// Menulis data ke file JSON
async function writeTasks(tasks) {
  try {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (err) {
    throw err;
  }
}

// Menambah tugas baru
export async function addTask(description) {
  try {
    const tasks = await readTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      completed: false,
    };
    tasks.push(newTask);
    await writeTasks(tasks);
    console.log(`✅ Tugas "${description}" berhasil ditambahkan!`);
  } catch (err) {
    console.error("❌ Gagal menambah tugas:", err.message);
  }
}

// Menampilkan semua tugas
export async function listTasks() {
  try {
    const tasks = await readTasks();
    if (tasks.length === 0) {
      console.log("📭 Belum ada tugas.");
      return;
    }

    console.log("\n📋 Daftar Tugas:");
    tasks.forEach((task) => {
      console.log(
        `${task.id}. ${task.description} [${task.completed ? "✅ Selesai" : "❌ Belum"}]`
      );
    });
  } catch (err) {
    console.error("❌ Gagal menampilkan tugas:", err.message);
  }
}

// Menghapus tugas
export async function deleteTask(id) {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    const deleted = tasks.splice(index, 1)[0];
    await writeTasks(tasks);
    console.log(`🗑️ Tugas "${deleted.description}" telah dihapus.`);
  } catch (err) {
    console.error("❌ Gagal menghapus tugas:", err.message);
  }
}

// Menandai tugas selesai
export async function markTaskDone(id) {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    if (task.completed) {
      console.log(`ℹ️ Tugas "${task.description}" sudah selesai sebelumnya.`);
      return;
    }

    task.completed = true;
    await writeTasks(tasks);
    console.log(`🎯 Tugas "${task.description}" telah ditandai selesai.`);
  } catch (err) {
    console.error("❌ Gagal memperbarui tugas:", err.message);
  }
}

// Mengedit deskripsi tugas
export async function editTask(id, newDescription) {
  try {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    const oldDesc = task.description;
    task.description = newDescription;
    await writeTasks(tasks);
    console.log(`✏️ Tugas "${oldDesc}" telah diubah menjadi "${newDescription}".`);
  } catch (err) {
    console.error("❌ Gagal mengedit tugas:", err.message);
  }
}
