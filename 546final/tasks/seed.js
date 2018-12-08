const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const Field = require("../classes/Field");
const activityType = data.activityTypes;
const userActivity = data.userActivities;
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt-nodejs');
const dbOperation = require("../data/users");

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    /**
     * Creating Activity Types
     */
    let fields = [new Field(uuidv1(), "Company", "Which company is this resume for", "String", true, true),
    new Field(uuidv1(), "Date", "Deadline of application", "Date", true, true),
    new Field(uuidv1(), "Postion", "What kind of job is this resume for", "String", true, true),
    new Field(uuidv1(), "Salary", "What is the estimated salary?", "Number", true, true),
    new Field(uuidv1(), "Thought", "How do you think this resume?", "String", true, true),
    new Field(uuidv1(), "Recieve interview", "Did you get a discount on the lift ticket?", "Boolean", true, true)];
    console.log(fields);
    let activity = await activityType.addActivtyType("Create a new Resume", "Details", true, fields);
    const Createid = activity._id;


    /**
     * creating demo user yiming snow
     */
    const hash = await bcrypt.hashSync("Password1234");

    //add the registered email and password to database  email and password are the key  (html id)
    await dbOperation.createUser("Yi", "Ming", "yxu@stevens.edu", hash, "01/1/1996", "Male");
    const user = await dbOperation.getUser("yxu@stevens.edu");

    /**
     * Logging activities for Yi Ming
     */
    let act = {
        activityType: Createid,
        company: 'apple',
        date: '2018-01-01',
        postion: 'java sde',
        salary: '1500',
        thought: 'good',

        userId: user._id
    }

    await userActivity.addUserActivity(act);

    act = {
        activityType: Createid,
        company: 'google',
        date: '2018-01-01',
        postion: 'front end',
        salary: '1500',
        thought: 'not bad',

        userId: user._id
    }
    await userActivity.addUserActivity(act);

    act = {
        activityType: Createid,
        company: 'Amazon',
        date: '2018-01-01',
        postion: 'back end',
        salary: '1500',
        thought: 'very good',

        userId: user._id
    }
    await userActivity.addUserActivity(act);

    act = {
        activityType: Createid,
        company: 'tencent',
        date: '2018-01-01',
        postion: 'python sde',
        salary: '1500',
        thought: 'bad',

        userId: user._id
    }
    await userActivity.addUserActivity(act);

   

    await userActivity.addUserActivity(act);

    console.log("Done seeding database");
    await db.serverConfig.close();
};

main().catch(console.log);