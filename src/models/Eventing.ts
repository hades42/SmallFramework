// Type Alias define that "callBack" is an function return nothing
type CallBack = () => void;

export class Eventing {
    // This type show us that events is an object that store
    // many keys (we dont know the name of the key) that are string
    // each key has an array of Callback as a value
    events: { [key: string]: CallBack[] } = {};

    // Assign callback function
    on(eventName: string, callback: CallBack): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    // Trigger event inside events
    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        // For each callback, just run it
        handlers.forEach((callback) => {
            callback();
        });
    }
}
