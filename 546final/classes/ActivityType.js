class ActivityType {

    constructor(id, name, desciption, active, fields) {
        this._id = id;
        this.name = name;
        this.desciption = desciption;
        this.active = active;
        this.fields = fields;
    }

    addField(fieldObj){
        this.fields.push(fieldObj);
    }

}

module.exports = ActivityType;