const express = require("express");
const db = require("./db");
const app = express();
const port = 3200;
const { Pool } = require("pg");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//-----------GET ALL = students/teachers-----------
app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({
      status: "success get the database",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//TAMPILKAN ISI DATABASE DARI STUDENTS
app.get("/teachers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM teachers");
    res.status(200).json({
      status: "success get the database",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//-----------GET ALL = students/teachers-----------

//-----------GET WITH ID = students/teachers-----------

app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;
  db.query(`SELECT * FROM students WHERE id = ${studentId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({
          status: "error",
          message: "Data mahasiswa tidak ditemukan",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result.rows[0],
        });
      }
    }
  });
});
//AMBIL DATA STUDENTS BERDASARKAN ID
app.get("/teachers/:id", (req, res) => {
  const teachersId = req.params.id;
  db.query(`SELECT * FROM teachers WHERE id = ${teachersId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({
          status: "error",
          message: "Data dosen tidak ditemukan",
        });
      } else {
        res.status(200).json({
          status: "success",
          data: result.rows[0],
        });
      }
    }
  });
});
//-----------GET WITH ID = students/teachers-----------



//-----------POST DATA = students/teachers-----------
app.post("/students", async (req, res) => {
  const { name, address } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO students (name, address) VALUES ('${name}', '${address}')`
    );

    res.status(200).json({
      status: "success",
      message: "Data berhasil dimasukkan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/teachers", async (req, res) => {
  const { name, address } = req.body;

  try {
    const result = await db.query(
   `INSERT INTO students (name, address) VALUES ('${name}', '${address}')`
    );

    res.status(200).json({
      status: "success",
      message: "Data berhasil dimasukkan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//-----------POST DATA = students/teachers-----------



//-----------PUT DATA = students/teachers-----------
app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { name, address } = req.body;

  db.query(
    `UPDATE students SET name = 'Andreas', address = 'Bitung' WHERE id = ${studentId}`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json({
          status: "success",
          message: "Data berhasil diperbarui",
        });
      }
    }
  );
});
//-----------PUT DATA = students/teachers-----------

//-----------DELETE DATA = students/teachers-----------
app.delete("/students/:id", (req, res) => {
  const studentId = req.params.id;
  db.query(`DELETE FROM students WHERE id = ${studentId}`, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json({
        status: "success",
        message: "Data berhasil dihapus",
      });
    }
  });
});
//-----------DELETE DATA = students/teachers-----------


app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

// Update Student by ID
app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, address } = req.body;

  try {
    const result = await db.query(
      `UPDATE students SET name = $1, address = $2 WHERE id = $3`,
      [name, address, studentId]
    );

    res.status(200).json({
      status: "success",
      message: "Data mahasiswa berhasil diperbarui",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete Student by ID
app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await db.query(`DELETE FROM students WHERE id = $1`, [studentId]);

    res.status(200).json({
      status: "success",
      message: "Data mahasiswa berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get student by ID
app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const result = await db.query(`SELECT * FROM students WHERE id = $1`, [studentId]);

    if (result.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result.rows[0],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
