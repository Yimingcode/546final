const express = require("express");
const router = express.Router();
const data = require("../data");
const activityTypeData = data.activityTypes;
const userActivitiesData = data.userActivities;


router.get("/home", async (req, res) => {
    try{
        const activityStats = await userActivitiesData.getUserActivityStats(req.session.user._id);
        const activityList = await userActivitiesData.getAllUserActivitiesByUserId(req.session.user._id);
        res.render("main/home", {activities:activityList, actvityStats: activityStats});
    } catch (e) {
        res.status(500).send();
    }

});

router.get("/home/addactivity", async (req, res) => {
    try{
        const activityList = await activityTypeData.getAllActivtyTypes();
        res.render("main/addactivity", {activities:activityList});
    } catch (e) {
        res.status(500).send();
    }

});

router.post("/home/addactivity", async (req, res) => {
    let test = req.body;
    test.userId = req.session.user._id;
    try{
        const activityList = await userActivitiesData.addUserActivity(test);
        res.render("main/addactivity", {activities:activityList, msg: "Activity Successfully Added"});

    } catch (e) {
        res.status(500).send();
    }


});
module.exports = router;
