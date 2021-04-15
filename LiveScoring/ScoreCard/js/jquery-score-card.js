class ScoreCard {
    constructor(element, options) {
        this.element = element;
        this.options = options;
    }

    create() {}
}

$.fn.scoreCard = function (options) {
    this.scoreCard = new ScoreCard(this, $.extend({}, options));
    return this.scoreCard;
};
