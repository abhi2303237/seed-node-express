import app from "./app";

/**
 * Start Express server.
 */
let server: any;
server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        process.argv[2] || "dev"
    );
    console.log("  Press CTRL-C to stop\n");
});
export default server;
