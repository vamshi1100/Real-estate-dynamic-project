const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const User = require('./models/user');
const Admin = require('./models/admin'); 565;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/realestate', {
    useNewUrlParser: true,
    // other connection options...
})
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.log("MongoDB connection error:", err);
    });

app.use(session({ secret: 'thisisnotsgoodsecret', resave: false, saveUninitialized: false }));
app.use(flash());
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes...

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/main_index', (req, res) => {
    res.render('main_index');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/location', (req, res) => {
    res.render('location');
});

app.get('/home2', (req, res) => {
    res.render('home2');
});

app.get('/services2', (req, res) => {
    res.render('services2');
});

app.get('/contact2', (req, res) => {
    res.render('contact2');
});

app.get('/location2', (req, res) => {
    res.render('location2');
});

app.get('/home3', (req, res) => {
    res.render('home3');
});

app.get('/services3', (req, res) => {
    res.render('services3');
});

app.get('/contact3', (req, res) => {
    res.render('contact3');
});

app.get('/location3', (req, res) => {
    res.render('location3');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('allusers', { users }); 
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await User.findById(id)
    res.render('showuser', { users })
})

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await User.findById(id)
    res.render('showuser', { users })
})

app.get('/users/:id/edit', async (req, res) => {
    const { id } = req.params;
    const users = await User.findById(id);
    res.render('edituser', { users })
})

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/users/${users._id}`);
})


app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id)
    res.redirect('/users');
})



app.post('/index', async (req, res) => {
    try {
        if (req.body.formType === 'signup') {
            // Handle signup
            const { username, password, phoneno, email } = req.body;
            const hash = await bcrypt.hash(password, 12);
            const user = new User({ username, password: hash, phoneno, email });
            await user.save();
            req.session.user_id = user._id;
            req.flash('success', 'Signup successful!'); // Flash message example
            return res.redirect('/index');
        }


        else if (req.body.formType === 'signin') {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                req.flash('error', 'User not found. Please sign up.'); // Flash message example
                return res.redirect('/index');
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                req.session.user_id = user._id;
                req.flash('success', 'Login successful!'); // Flash message example
                return res.redirect('/main_index');
            } else {
                req.flash('error', 'Invalid username or password.'); // Flash message example
                return res.redirect('/index');
            }
        }

        else if (req.body.formType === 'admin') {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) {
                req.flash('error', 'Admin not found. Please sign up.');
                return res.redirect('/index');
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if (validPassword) {
                req.session.admin_id = admin._id;
                req.flash('success', 'Admin login successful!');
                return res.redirect('/users');
            } else {
                req.flash('error', 'Invalid username or password.');
                return res.redirect('/index');
            }
        } else {
            req.flash('error', 'Form type not found.');
            return res.redirect('/index');
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        req.flash('error', 'Internal Server Error');
        return res.status(500).send("Internal Server Error");
    }
});

app.post("/logout", (req, res) => {
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/index');
})

app.post("/logout", (req, res) => {
    req.session.admin_id = null;
    // req.session.destroy();
    res.redirect('/index');
})


// Your remaining routes...
app.listen(3001, () => {
    console.log("app is listening on port 3001!");
});


