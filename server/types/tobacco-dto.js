class TobaccoDto {

    constructor(dbTobacco) {
        this.id = dbTobacco._id;
        this.producer = dbTobacco.producer.name || "";
        this.name = dbTobacco.name || "";
        this.tastes = dbTobacco.tastes || [];
        this.source = dbTobacco.source || "";
        this.ean = dbTobacco.ean || "";
        this.description = dbTobacco.description || "";
    }

    toString() {
        return `${this.producer} - ${this.name}`;
    }

}

module.exports = { TobaccoDto };