const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const standupRoutes = require('./routes/standup.routes');
const userRoutes = require('./routes/user.routes');
const issueRoutes = require('./routes/issues.routes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/standups', standupRoutes);
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);


module.exports = app;
