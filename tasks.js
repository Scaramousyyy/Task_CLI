import fs from "fs";
import path from "path";

const filePath = path.resolve("./tasks.json");

// Fungsi untuk membaca file JSON
function readTasks(callback) {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") return callback(null, []);
      return callback(err);
    }
    try {
      const tasks = JSON.parse(data);
      callback(null, tasks);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}

// Fungsi untuk menulis ke file JSON
function writeTasks(tasks, callback) {
  fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8", (err) => {
    callback(err);
  });
}

// Menambah tugas baru
export function addTask(description) {
  readTasks((err, tasks) => {
    if (err) {
      console.error("Gagal membaca data:", err.message);
      return;
    }

    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      description,
      completed: false,
    };

    tasks.push(newTask);

    writeTasks(tasks, (err) => {
      if (err) console.error("Gagal menulis data:", err.message);
      else console.log(`✅ Tugas "${description}" berhasil ditambahkan!`);
    });
  });
}

// Menampilkan semua tugas
export function listTasks() {
  readTasks((err, tasks) => {
    if (err) {
      console.error("Gagal membaca data:", err.message);
      return;
    }

    if (tasks.length === 0) {
      console.log("📭 Belum ada tugas.");
      return;
    }

    console.log("\n📋 Daftar Tugas:");
    tasks.forEach((task) => {
      console.log(`${task.id}. ${task.description} [${task.completed ? "✅" : "❌"}]`);
    });
  });
}

// Menghapus tugas berdasarkan ID
export function deleteTask(id) {
  readTasks((err, tasks) => {
    if (err) {
      console.error("Gagal membaca data:", err.message);
      return;
    }

    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    const deleted = tasks.splice(index, 1)[0];

    writeTasks(tasks, (err) => {
      if (err) console.error("Gagal menyimpan perubahan:", err.message);
      else console.log(`🗑️ Tugas "${deleted.description}" telah dihapus.`);
    });
  });
}

// Menandai tugas selesai
export function markTaskDone(id) {
  readTasks((err, tasks) => {
    if (err) {
      console.error("Gagal membaca data:", err.message);
      return;
    }

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    if (task.completed) {
      console.log(`ℹ️ Tugas "${task.description}" sudah ditandai selesai sebelumnya.`);
      return;
    }

    task.completed = true;

    writeTasks(tasks, (err) => {
      if (err) console.error("Gagal memperbarui data:", err.message);
      else console.log(`🎯 Tugas "${task.description}" telah ditandai selesai!`);
    });
  });
}

// Mengedit nama tugas
export function editTask(id, newDescription) {
  readTasks((err, tasks) => {
    if (err) {
      console.error("Gagal membaca data:", err.message);
      return;
    }

    const task = tasks.find((t) => t.id === id);
    if (!task) {
      console.log("⚠️ Tugas tidak ditemukan.");
      return;
    }

    const oldDescription = task.description;
    task.description = newDescription;

    writeTasks(tasks, (err) => {
      if (err) console.error("Gagal memperbarui data:", err.message);
      else console.log(`✏️ Tugas "${oldDescription}" telah diubah menjadi "${newDescription}".`);
    });
  });
}
