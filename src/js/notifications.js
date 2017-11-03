export default class Notifications {
    constructor(options) {
        const defaults = {
            duration: 5000,
            types: {}
        };

        this.o = $.extend({}, defaults, options || {});
        this.element = $('<div class="uic-notifications"></div>');
        this.messageClass = 'uic-message';
        this.defaultMessageClass = 'uic-default';
        this.closeButtonClass = 'uic-remove';
        this.fadeClass = 'uic-fade',
        this.element.appendTo($(document.body));
        this.messages = [];
    }

    removeMessage(message) {
        message.addClass(this.fadeClass);
        message.toggle(500, () => message.remove());
    }

    send(text, type) {
        let typeClass = type ? ' uic-' + type : ' ' + this.defaultMessageClass;

        let messageStyles = {};
        let closerStyles = {};

        if(typeof this.o.types[type] === 'object') {
            messageStyles['color'] = this.o.types[type].color;
            messageStyles['background-color'] = this.o.types[type].bgColor;

            if(this.o.types[type].borderColor) {
                messageStyles['box-shadow'] = 'inset 0 0 0 1px ' + this.o.types[type].borderColor;
            }

            closerStyles['color'] = this.o.types[type].closerColor;
        }

        var message = $('<p class="' + this.messageClass + typeClass + '">' + text + '</p>')
            .css(messageStyles);

        $('<span class="' + this.closeButtonClass + '">&times;</span>')
            .css(closerStyles)
            .appendTo(message)
            .on('click', () => this.removeMessage(message));

        this.element.prepend(message);
        message.animate({'opacity':1}, 200);
        setTimeout(() => { this.removeMessage(message) }, this.o.duration);
    }
}