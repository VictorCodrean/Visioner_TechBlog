const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentsData = require('./commentsData.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n-----DATABASE SYNCED-----\n');

    await User.bulkCreate(userData);
    console.log('\n----- user DATABASE SYNCED-----\n');

    await Post.bulkCreate(postData);
    console.log('\n----- post DATABASE SYNCED-----\n');

    await Comment.bulkCreate(commentsData);
    console.log('\n-----comments DATABASE SYNCED-----\n');

    process.exit(0);
};

seedAll();