import React from 'react';

const eventBus = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    }
};

export default eventBus;
