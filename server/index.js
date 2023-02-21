const pool = require('./db')
const bodyParser = require('body-parser')
const express = require('express')
const bcrypt = require("bcryptjs")
const generateJWT = require('./jwt/jwtGenerator')
const auth = require('./midleware/auth')
const cors = require('cors')
const app = express()
const multer = require('multer')

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', async (req, res) => {
    try {

        //take the email and password from the req.body
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body

        //Check if the user is already existing
        const user = await pool.query(`SELECT * FROM users WHERE
        email = $1`, [email])

        if (user.rows.length > 0) {
            return res.status(401).json("User already exists")
        }

        //Setup Bcrypt for password hashing

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //Add the new user into the database
        //generate the uuid using the uuidv4() function
        const newUser = await pool.query(`
        INSERT INTO users ( first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [first_name, last_name, email, bcryptPassword])

        //generate and return the JWT token
        const token = generateJWT(newUser.rows[0])
        
        res.json({
            token
        })

    } catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})

//log-in route
app.post('/login', async (req, res) => {
    try {

        //take the email and password from the req.body
        const {
            email,
            password
        } = req.body;

        //Check if the user is not existing
        const user = await pool.query(`SELECT * FROM users WHERE
        email = $1`, [email]) // output is a set rows

        if (user.rows.length < 1) {
            return res.json("User does not exists")
        }
        else {
            const validPassword = await bcrypt.compare(password, user.rows[0].password)
            if (!validPassword) {
                return res.json("Password or Email is incorrect")
            }
        }//Check if the password matches using bcrypt

        const loginUser = user.rows[0];

        //generate and return the JWT
        const token = generateJWT(loginUser)
        res.json({
            token, loginUser
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})

// provide the auth middleware
app.get('/verify', auth, async (req, res) => {
    try {

        //return the user object
        res.json(req.user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})
//get all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users ORDER BY usersid ASC');
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//delete users
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE usersid = $1', [id]);
        res.json('deleted');
    } catch (err) {
        console.error(err.message);
    }
})

//update users for admin
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { usertype } = req.body;
        const updatesighted = await pool.query('UPDATE users SET usertype = $1 WHERE usersid = $2',
            [usertype, id]);

        res.json('updated')
    } catch (err) {
        console.error(err.message);
    }
})

//Routes 
//route for missing people
//post a missing report
app.post('/reports', async (req, res) => {
    try {
        const { image, surname, given_name, nickname, age, gender, height, weight, hair, clothes, identifying_char, seenwhen,
            seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality, reporterid } = req.body;
        const report = await pool.query(
            `INSERT INTO reports (image, surname, given_name, nickname, age,gender, height, weight, hair, clothes, identifying_char, seenwhen,
                seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality, reporterid) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`,
            [image, surname, given_name, nickname, age, gender, height, weight, hair, clothes, identifying_char, seenwhen,
                seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality, reporterid]
        );//ask about 0
        res.json(report.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get missing reports
app.get('/reports', async (req, res) => {
    try {
        const reports = await pool.query('SELECT * FROM reports INNER JOIN status ON reports.typeid = status.statusid INNER JOIN users ON reports.reporterid = users.usersid WHERE typeid = 1 ORDER BY reportsid ASC');
        res.json(reports.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//select 1 only report
app.get('/reports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reports = await pool.query('SELECT * FROM reports INNER JOIN status ON reports.typeid = status.statusid INNER JOIN users ON reports.reporterid = users.usersid WHERE reportsid = $1', [id]);
        res.json(reports.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a missing report// 
app.put('/reports/:report_id', async (req, res) => {
    try {
        const { report_id } = req.params;
        const {  surname, given_name, nickname, age, height, weight, hair, clothes, identifying_char, seenwhen,
            seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality }
            = req.body;
        const updateReport = await pool.query('UPDATE reports SET surname = $1, given_name = $2, nickname = $3, age = $4, height = $5, weight = $6, hair = $7, clothes = $8, identifying_char = $9, seenwhen = $10, seenwhere = $11, person = $12, relationship = $13, contact_no = $14, house_no = $15, street = $16, barangay = $17, municipality = $18 WHERE reportsid = $19',
            [surname, given_name, nickname, age, height, weight, hair, clothes, identifying_char, seenwhen,
                seenwhere, person, relationship, contact_no, house_no, street, barangay, municipality, report_id]);

        res.json('updated')
    } catch (err) {
        console.error(err.message);
    }
})

// get all sighted reports for sighted page
app.get('/sighted', async (req, res) => {
    try {
        const reports = await pool.query('SELECT DISTINCT ON (reportid) * FROM updatesighted INNER JOIN reports ON updatesighted.reportid = reports.reportsid INNER JOIN users ON updatesighted.reporterid = users.usersid WHERE typeid = 1');
        res.json(reports.rows);
    } catch (err) {
        console.error(err.message);
    }
})



//post an update sighted report click on modal update seen
app.post('/report-sighted', async (req, res) => {
    try {
        const { reportid, timeday, lastwhen, lastwhere, description, reporterid } = req.body;
        const reportsighted = await pool.query(`
        INSERT INTO updatesighted (reportid, timeday, lastwhen, lastwhere, description, reporterid)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [reportid, timeday, lastwhen, lastwhere, description, reporterid]
        );
        res.json(reportsighted.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get for report sighted page updated of a single report
app.get('/report-sighted/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reportssighted = await pool.query(`SELECT * FROM updatesighted INNER JOIN users ON updatesighted.reporterid = users.usersid
        INNER JOIN reports ON updatesighted.reportid = reports.reportsid WHERE reportid = $1 ORDER BY lastwhen ASC`, [id])
        res.json(reportssighted.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get all found reports
app.get('/found', async (req, res) => {
    try {
        const reports = await pool.query('SELECT * FROM reports WHERE typeid = 3 ORDER BY reportsid ASC');
        res.json(reports.rows);
    } catch (err) {
        console.error(err.message);
    }
})



//update seenwhen, seenwhere, typeid if the report is found
app.put('/found/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { seenwhen, seenwhere, typeid, reporterid } = req.body;
        const updateFound = await pool.query('UPDATE reports SET seenwhen = $1, seenwhere = $2,  typeid = 3, reporterid = $3 WHERE reportsid = $4',
            [seenwhen, seenwhere, reporterid, id]);
        res.json('updated')
    } catch (err) {
        console.error(err.message);
    }
})

// get for report sighted page updated of a single report
app.get('/report-found/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reportsfound = await pool.query(`SELECT * FROM reports INNER JOIN reports ON reports.reporterid = users.usersid
        INNER JOIN reports ON updatefound.reportid = reports.reportsid WHERE reportsid = $1`, [id])
        res.json(reportsfound.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//delete a report by admin only 
app.delete('/reports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteReport = await pool.query('DELETE FROM reports WHERE reportsid = $1', [id]);
        res.json('deleted');
    } catch (err) {
        console.error(err.message);
    }
})

//admin edit version
app.put('/adminsighted/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { typeid } = req.body;
        const updateadminSighted = await pool.query('UPDATE reports SET  typeid = $1 WHERE id = $2',
            [typeid, id]);

        res.json('updated')
    } catch (err) {
        console.error(err.message);
    }
})

//IMAGE UPLOADER    
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/Images')
    },

    filename: (req, file, cb) => {
        console.log(file);
        const uniquePrefix = Date.now()
        cb(null, uniquePrefix + file.fieldname + '.png')
    }

})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('my-image'), async (req, res) => {

    const { filename } = req.file

    const newPicture = await pool.query(`
    INSERT INTO images VALUES
    ($1)
    `, [filename])

    console.log(filename)
    res.json(filename)
})

app.get('/photos', async (req, res) => {
    try {

        const response = await pool.query(`
        SELECT * FROM images
        `)

        res.json(response.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//counts
app.get('/count-reports', async (req, res) => {
    try {
        const count = await pool.query('SELECT COUNT(reportsid) FROM reports');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/count-missingreports', async (req, res) => {
    try {
        const count = await pool.query('SELECT COUNT(reportsid) FROM reports WHERE typeid = 1');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/count-foundreports', async (req, res) => {
    try {
        const count = await pool.query('SELECT COUNT(reportsid) FROM reports WHERE typeid = 3');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/count-sightedreports', async (req, res) => {
    try {
        const count = await pool.query('SELECT COUNT(Distinct reportid) FROM updatesighted');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.get('/count-users', async (req, res) => {
    try {
        const count = await pool.query('SELECT COUNT(usersid) FROM users');
        res.json(count.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//filter 
// app.get('/reports?sort=gender&orderby=asc', async (req, res) => {
    
//     try {
//         const report = await pool.query(`SELECT * FROM reports`);
//         res.json(report.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// })


app.listen(8000, () => {
    console.log('server has started on port 8000')
})