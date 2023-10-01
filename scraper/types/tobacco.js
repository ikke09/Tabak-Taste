class Tobacco {

    constructor(producer, source) {
        this.producer = producer;
        this.name = undefined;
        this.tastes = [];
        this.type = 'Shisha-Tabak';
        this.amount = 200;
        this.unit = "g";
        this.price = 17.9;
        this.currency = "€";
        this.source = source;
        this.ean = undefined;
        this.description = undefined;
        this.error = undefined;
    }

    toString() {
        return `${this.producer.name} - ${this.name}`;
    }

}

module.exports = Tobacco;