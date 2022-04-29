const router = require("express").Router();
const { json } = require("express");
let Student = require("../models/student");

//http://localhost:8070/student/add

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;

    const newStudent = new Student({
        name,
        age,
        gender,
        address
    })

    newStudent.save().then(() => {
        res.json("Student was added!");


    }).catch((error) => {
        console.log(error);
    })
})

router.route("/").get((req, res) => {
    Student.find().then((students) => {
        res.json(students)

    }).catch((err) => {
        console.log(err)
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, age, gender, address } = req.body;

    const updateStudent = {
        name,
        age,
        gender,
        address

    }

    const update = await Student.findByIdAndUpdate(userId, updateStudent).
        then(() => {
            res.status(200).send({ status: "Student updated" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with updating", error: err.message })

        })


})

router.route("/delete/:id").put(async (req, res) => {
    let userId = req.params.id;

    await Student.findByIdAndUpdate(userId).
        then(() => {
            res.status(200).send({ status: "Student deleted" })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with deleting", error: err.message })

        })
})

//Fetching one student
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Student.findById(userId).
        then((student) => {
            res.status(200).send({ status: "Student fetched", student })
        }).catch((err) => {
            console.log(err)
            res.status(500).send({ status: "Error with fetching", error: err.message })

        })
})



module.exports = router;