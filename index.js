const express = require("express");
const db = require("./db");
const app = express();
const port = 3200;
const { Pool } = require("pg");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//-----------GET ALL -----------
app.get("/students", async (req, res) => {
  try {

    // const result = await db.query("SELECT * FROM students");
    const allStudents = await prisma.students.findMany();

    res.status(200).json({
      status: "success get the database",
      data: allStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


//-----------GET WITH ID -----------

app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await prisma.students.findUnique({
      where: {
        id: parseInt(studentId),
      },
    });

    if (!student) {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
      return; // Menghentikan eksekusi kode selanjutnya jika mahasiswa tidak ditemukan
    }

    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



//-----------POST DATA -----------
app.post("/students", async (req, res) => {
  const { name, address } = req.body;

//   try {
//     const result = await db.query(
//       `INSERT INTO students (name, address) VALUES ('${name}', '${address}')`
//     );

//     res.status(200).json({
//       status: "success",
//       message: "Data berhasil dimasukkan",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.post("/teachers", async (req, res) => {
//   const { name, address } = req.body;

  try {
  //   const result = await db.query(
  //  `INSERT INTO students (name, address) VALUES ('${name}', '${address}')`
  //   );

  await prisma.students.create({
    data: {
      name: name,
      address: address,
    },
  });

    res.status(200).json({
      status: "success",
      message: "Data berhasil dimasukkan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


//-----------PUT DATA = students/teachers-----------
app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, address } = req.body;

  try {
    const updatedStudent = await prisma.students.update({
      where: {
        id: parseInt(studentId),
      },
      data: {
        name: name,
        address: address,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil diperbarui",
      data: updatedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


//-----------DELETE DATA = students/teachers-----------
app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    await prisma.students.delete({
      where: {
        id: parseInt(studentId),
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);