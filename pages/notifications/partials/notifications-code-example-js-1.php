import Notifications from './notifications';

$(() => {
    let notify = new Notifications({
        duration: 3000,                 // optional duration in ms, default is 5000
        types: {                        // optional message types
            'alert': {
                color: '#fff',          // optional font-color, default is #000
                bgColor: '#e74c3c',     // optonal background color, default is rgba(255, 255, 255, 0.85)
                borderColor: '#e74c3c', // optonal border color, default is #000
                closerColor: '#fff'     // optonal X color, default is #000
            },
            'warning': {
                color: '#fff',
                bgColor: '#f39c12',
                borderColor: '#f39c12',
                closerColor: '#fff'
            },
            'success': {
                color: '#fff',
                bgColor: '#27ae60',
                borderColor: '#27ae60',
                closerColor: '#fff'
            }
        }
    });

    $('#send-default-notification').on('click', () => {
        notify.send('<b>Default message</b><br>Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
    });

    $('#send-alert-notification').on('click', () => {
        notify.send('<i class=\'fa fa-exclamation-circle\' aria-hidden=\'true\'></i>&nbsp;&nbsp;Alert message with icon', 'alert');
    });

    $('#send-warning-notification').on('click', () => {
        notify.send('Warning message', 'warning');
    });

    $('#send-success-notification').on('click', () => {
        notify.send('Success message', 'success');
    });
});

