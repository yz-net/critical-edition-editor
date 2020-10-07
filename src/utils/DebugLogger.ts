/**
 * A cheap and cheerful logger that wraps console.log, .warn, .error, with
 * labeling and silencing to make debugging with devtools easier.
 */
export default class DebugLogger {
    private _label: string;
    private _silent: boolean;

    constructor(label: string) {
        this._label = label;
        this._silent = false;

        // bind our workhorse functions
        this.hush = this.hush.bind(this);
        this.console = this.console.bind(this);

        // bind our helper functions
        this.log = this.log.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);


    }

    hush() {
        this._silent = true;
        return this;
    }

    console(fname: "log" | "error" | "warn", ...args: any[]) {
        if (this._silent) { return }
        let f = console[fname];
        f(`${this._label}:`, ...args);
    }

    log = (...args: any[]) => this.console("log", ...args);
    warn = (...args: any[]) => this.console("warn", ...args);
    error = (...args: any[]) => this.console("error", ...args)

}